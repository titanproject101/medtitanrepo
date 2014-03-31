package com.med.service.symptom.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

import javax.script.Bindings;
import javax.script.ScriptEngine;

import org.apache.commons.collections15.Transformer;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.med.dao.MedDao;
import com.med.service.symptom.SymptomService;
import com.thinkaurelius.titan.core.TitanGraph;
import com.tinkerpop.blueprints.Edge;
import com.tinkerpop.blueprints.Graph;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.blueprints.impls.tg.TinkerGraph;
import com.tinkerpop.blueprints.oupls.jung.GraphJung;

import edu.uci.ics.jung.algorithms.importance.Ranking;
import edu.uci.ics.jung.algorithms.scoring.PageRankWithPriors;

@Service
public class SymptomServiceImpl implements SymptomService {
	
	@Autowired
	private MedDao medDao;
	
	protected static final Log logger = LogFactory.getLog(SymptomServiceImpl.class);

	@SuppressWarnings("restriction")
	public Map<String, Object> getRelatedDiagnosisListForSymptoms(Map<String, String> symptomDuration, String age) {
		try {
			long startTime = System.currentTimeMillis();
			Map<String, Object> results = new HashMap<String, Object>();
			TitanGraph titanGraph = medDao.getTitanGraph();
			ScriptEngine scriptEngine = medDao.getScriptEngine(); 
			
			TinkerGraph subGraph = getSubGraphFromGremlinScriptEngine(symptomDuration, age, titanGraph, scriptEngine);
			performPageRankingForTopDiagnosis(subGraph, results);
			
			long endTime = System.currentTimeMillis();
			results.put("queryTime", endTime - startTime);
			return results;
		} catch (Exception e) {
			logger.error(e);
		}
		return null;
	}
	
	private void performPageRankingForTopDiagnosis(TinkerGraph subGraph, Map<String, Object> results) {
		GraphJung<Graph> graphJung = new GraphJung<Graph>(subGraph);
		
		Transformer<Edge, Double> edgeWeightTransformer = new Transformer<Edge, Double>(){
			public Double transform(Edge edge) {
				return (Double)edge.getProperty("weightKey");
			}
		};
			
		Transformer<Vertex, Double> vertexWeightTransformer = new Transformer<Vertex, Double>() {
			public Double transform(Vertex vertex) {
				return (Double)vertex.getProperty("weightKey");			
			}
		};
		
		PageRankWithPriors<Vertex, Edge> pageRank = new PageRankWithPriors<Vertex, Edge>(graphJung, edgeWeightTransformer, vertexWeightTransformer, 0.15d);
		pageRank.setMaxIterations(1);
		pageRank.evaluate();
		
		// Used priority queue to sort vertices by PageRank values.
	    PriorityQueue<Ranking<Vertex>> queue = new PriorityQueue<Ranking<Vertex>>(5);
	    int originalPos = 0;
	    Collection<Vertex> vertices = graphJung.getVertices();
	    for (Vertex vertex : vertices) {
	    	queue.add(new Ranking<Vertex>(originalPos++, (Double)pageRank.getVertexScore(vertex), vertex));
	    }

	    // PageRank of nodes, in descending order
	    List<String> topDiagnosis = new ArrayList<String>(20);
	    Ranking<Vertex> vertexRanking = null;
	    int diagnosisCount = 0;
	    while (true) {
	    	vertexRanking = queue.poll();
	    	if (vertexRanking != null) {
	    		diagnosisCount++;
	    		if (diagnosisCount < 20) {
	    			topDiagnosis.add(vertexRanking.getRanked().getProperty("GRAPHUNIQUEKEY").toString());
	    		}
	    	} else {
	    		break;
	    	}
	    }
	    results.put("diagosisCount", diagnosisCount);
	    results.put("diagnosisList", topDiagnosis);
	}

	@SuppressWarnings("restriction")
	public TinkerGraph getSubGraphFromGremlinScriptEngine(Map<String, String> symptomDuration, String age, TitanGraph titanGraph, ScriptEngine scriptEngine) throws Exception{
		//long startTime1 = System.currentTimeMillis(); // start time
		Bindings bindings = null;
		
		List<String> symptoms = new ArrayList<String>(symptomDuration.size());
		symptoms.addAll(symptomDuration.keySet());
		
		List<List<Object>> symptomdiagresults = new ArrayList<List<Object>>();
		bindings = scriptEngine.createBindings();
        bindings.put("g", titanGraph);
        bindings.put("symptomdiagresults", symptomdiagresults);
        bindings.put("collection", "SMARTSYMPTOM");
        bindings.put("symptoms", symptoms);
        bindings.put("SYMPTOMDIAGNOSISMAP", "SYMPTOMDIAGNOSISMAP");
		String symdiagscript = "g.V.has('collection', collection).has('GRAPHUNIQUEKEY', T.in, symptoms).outE.has('label', SYMPTOMDIAGNOSISMAP).inV.path.fill(symptomdiagresults)";
		scriptEngine.eval(symdiagscript, bindings);
		//long endTime1 = System.currentTimeMillis(); // end time
		//long totalTime1 = endTime1-startTime1;
	//	logger.debug("Total Time to fetch symptom edges : " + totalTime1);
		
		
		//long startTime2 = System.currentTimeMillis(); // start time
		TinkerGraph subGraph = new TinkerGraph();
		Object[] sympVertexIds = new Object[symptoms.size()];
		Set<Object> vertexIds = new HashSet<Object>();
		String curSymptomName = "";
		int durationIndex = -1;
		Vertex vLeft = null;
		String symptomName = null;
		Edge edge = null;
		Vertex vRight = null;
		Vertex newVertexLeft = null;
		Vertex newVertexRight = null;
		
		if(symptomdiagresults.size() > 0) {
			for(List<Object> listObj: symptomdiagresults) {
				for(int i=0; i < listObj.size(); i++) {
					vLeft = (Vertex)listObj.get(0);
					symptomName = vLeft.getProperty("GRAPHUNIQUEKEY");
					edge = (Edge)listObj.get(1);
					if(!symptomName.equals(curSymptomName)){
						vertexIds.add(vLeft.getId());
						String duration = symptomDuration.get(symptomName);
						List<String> durations = edge.getProperty("durations");
						durationIndex = durations.indexOf(duration)*6;
						List<String> ages = edge.getProperty("ages");
						int ageIndex = ages.indexOf(age);
						durationIndex = durationIndex + ageIndex;
					}
					vRight = (Vertex)listObj.get(2);
					newVertexLeft = checkVertex(subGraph, vLeft);
					newVertexRight = checkVertex(subGraph, vRight);
					addSymDiagEdge(edge, newVertexLeft, newVertexRight, subGraph, durationIndex);
				}
			}
		}
		sympVertexIds = vertexIds.toArray();
		//long endTime2 = System.currentTimeMillis(); // end time
		//long totalTime2 = endTime2-startTime2;
		//logger.debug("Total Time to create subgraph : " + totalTime2);
		
		//long startTime3 = System.currentTimeMillis(); // end time
		List<List<Object>> diagdiagresults = new ArrayList<List<Object>>();
		bindings.put("diagdiagresults", diagdiagresults);
        bindings.put("DIAGNOSISDIAGNOSISEDGE", "DIAGNOSISDIAGNOSISEDGE");
    	bindings.put("symptomIds", sympVertexIds);
    	String diagdiagscript = "g.v(symptomIds).outE(SYMPTOMDIAGNOSISMAP).inV.outE(DIAGNOSISDIAGNOSISEDGE).inV.path.fill(diagdiagresults)";
		scriptEngine.eval(diagdiagscript, bindings);
		//long endTime3 = System.currentTimeMillis(); // end time
		//long totalTime3 = endTime3-startTime3;
	//	logger.debug("Total Time to fetch diagnosis edges : " + totalTime3);
	//	logger.debug("Size of Diag Edges : " + diagdiagresults.size());
		
		if(diagdiagresults.size() > 0) {
			for(List<Object> listObj: diagdiagresults) {
				for(int i=0; i < listObj.size(); i++) {
					vLeft = (Vertex)listObj.get(2);			
					edge = (Edge)listObj.get(3);			
					vRight = (Vertex)listObj.get(4);	
					addDiagnosisEdge(edge, vLeft, vRight, subGraph, 0.5d);
				}
			}
		}		

		// Make Ref Null 
		symptomdiagresults = null;
		diagdiagresults = null;
		vLeft = null;
		symptomName = null;
		edge = null;
		vRight = null;
		newVertexLeft = null;
		newVertexRight = null;
		
		return subGraph;
	}
	
	private Edge addSymDiagEdge(Edge edge, Vertex newLeftVertex, Vertex newRightVertex, TinkerGraph subGraph, int index) {
		//long startTime = System.currentTimeMillis(); // start time
		Edge newEdge = subGraph.getEdge(edge.getId());
		if(newEdge == null){
			newEdge = subGraph.addEdge(edge.getId(), newLeftVertex, newRightVertex, edge.getLabel());
			Object obj = edge.getProperty("agedurationmatrix");
			if(obj instanceof List){
				List<Object> list = (List<Object>)obj;
				String agedurationval = (String)list.get(index);
				if(agedurationval.equals("0")) {
					newEdge.setProperty("weightKey", 0.001d);
				} else if(agedurationval.equals("1")) {
					newEdge.setProperty("weightKey", 0.002d);
				} else if(agedurationval.equals("2")) {
					newEdge.setProperty("weightKey", 0.003d);
				} else if(agedurationval.equals("3")) {
					newEdge.setProperty("weightKey", 0.004d);
				} else if(agedurationval.equals("4")) {
					newEdge.setProperty("weightKey", 0.005d);
				}
			}
		};
		//long endTime = System.currentTimeMillis(); // end time
		//long totalTime = endTime-startTime;
		//logger.debug("Time to Add a edge : " + totalTime);
		return newEdge;
	}
	
	private Edge addDiagnosisEdge(Edge diagEdge, Vertex inVertex, Vertex outVertex, TinkerGraph subGraph, double val) {
		Edge newDiagEdge = subGraph.getEdge(diagEdge.getId());
		if (newDiagEdge == null) {
			outVertex = subGraph.getVertex(outVertex.getId());
			inVertex = subGraph.getVertex(inVertex.getId());
			if(outVertex != null && inVertex != null){
				newDiagEdge = subGraph.addEdge(diagEdge.getId(), outVertex, inVertex, diagEdge.getLabel());
				newDiagEdge.setProperty("weightKey", val);
			}
		} else {
			Double oldVal = (Double) newDiagEdge.getProperty("weightKey");
			newDiagEdge.setProperty("weightKey", (val + oldVal)/2);
		}
		return newDiagEdge;
	}
	
	private Vertex checkVertex(TinkerGraph subGraph, Vertex vertex) {
		//long startTime = System.currentTimeMillis(); // start time
	    Vertex newVertex = subGraph.getVertex(vertex.getId());
	    String generalprevalence = vertex.getProperty("generalprevalence");
		double vertexWeight = 0.0d;
		if(generalprevalence != null) {			
			if(generalprevalence.equals("Rare")) {
				vertexWeight = 0.005d;
			} else if(generalprevalence.equals("Uncommon")) {
				vertexWeight = 0.1d;
			} else if(generalprevalence.equals("Common")) {
				vertexWeight = 0.7d;
			} else if(generalprevalence.equals("Very Common")) {
				vertexWeight = 0.98d;
			}		
		}
	    if (newVertex == null) {
	    	newVertex = subGraph.addVertex(vertex.getId());
	    	newVertex.setProperty("GRAPHUNIQUEKEY", vertex.getProperty("GRAPHUNIQUEKEY"));
	    	newVertex.setProperty("weightKey", vertexWeight);
	    } else {
			double oldVertexWeight = (Double)newVertex.getProperty("weightKey");
			newVertex.setProperty("weightKey", (vertexWeight + oldVertexWeight) / 2);
		}
	    /*long endTime = System.currentTimeMillis(); // end time
		long totalTime = endTime-startTime;
		logger.debug("Time to Add a vertex : " + totalTime);*/
	    return newVertex;
	 }

}

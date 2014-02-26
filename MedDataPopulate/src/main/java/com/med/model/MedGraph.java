package com.med.model;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import com.med.util.TitanDbUtil;
import com.thinkaurelius.titan.core.KeyMaker;
import com.thinkaurelius.titan.core.TitanEdge;
import com.thinkaurelius.titan.core.TitanGraph;
import com.thinkaurelius.titan.core.TitanLabel;
import com.thinkaurelius.titan.core.TitanVertex;
import com.tinkerpop.blueprints.Edge;
import com.tinkerpop.blueprints.Vertex;

public class MedGraph {
	
	/*************************************** ONSITE FILE PATHS ************************************************/
	
	// Vertexes
	private static String DIAGNOSIS = "/root/titan/populateData/graphoutput/diagnosis";
	private static String DIAGNOSISCATEGORY = "/root/titan/populateData/graphoutput/diagnosiscategory";
	private static String DIAGNOSTIC = "/root/titan/populateData/graphoutput/diagnostic";
	private static String DIAGNOSTICCATEGORY = "/root/titan/populateData/graphoutput/diagnosticcategory";
	private static String MED = "/root/titan/populateData/graphoutput/med";
	private static String MEDCATEGORY = "/root/titan/populateData/graphoutput/medcategory";
	private static String SYMPTOM = "/root/titan/populateData/graphoutput/symptom";
	private static String SYMPTOMCATEGORY = "/root/titan/populateData/graphoutput/symptomcategory";
	private static String THERAPEUTIC = "/root/titan/populateData/graphoutput/therapeutic";
	private static String THERAPEUTICCATEGORY = "/root/titan/populateData/graphoutput/therapeuticcategory";
	private static String PHYSICIANCATEGORY = "/root/titan/populateData/graphoutput/physiciancategory";

	// Edges:
	private static String DIAGNOSIS_DIAGNOSIS = "/root/titan/populateData/graphoutput/diagnosis_diagnosis";
	private static String DIAGNOSIS_DIAGNOSISCATEGORY = "/root/titan/populateData/graphoutput/diagnosis_diagnosiscategory";
	private static String DIAGNOSIS_DIAGNOSTIC = "/root/titan/populateData/graphoutput/diagnosis_diagnostic";
	private static String DIAGNOSIS_MED = "/root/titan/populateData/graphoutput/diagnosis_med";
	private static String DIAGNOSIS_THERAPEUTIC = "/root/titan/populateData/graphoutput/diagnosis_therapeutic";
	private static String DIAGNOSTIC_DIAGNOSTICCATEGORY = "/root/titan/populateData/graphoutput/diagnostic_diagnosticcategory";
	private static String MED_MEDCATEGORY = "/root/titan/populateData/graphoutput/med_medcategory";
	private static String SYMPTOM_DIAGNOSIS = "/root/titan/populateData/graphoutput/symptom_diagnosis";
	private static String SYMPTOM_SYMPTOMCATEGORY = "/root/titan/populateData/graphoutput/symptom_symptomcategory";
	private static String SYMPTOM_MED = "/root/titan/populateData/graphoutput/symptom_med";
	private static String THERAPEUTIC_THERAPCATEGORY = "/root/titan/populateData/graphoutput/therapeutic_therapeuticcategory";
	
	private static Set<String> makeKeys = new HashSet<String>(20);
	private static Set<String> removeKeys = new HashSet<String>(20);
	private static Set<String> reserveKeys = new HashSet<String>(5);
	private static Set<String> makeLabel = new HashSet<String>(20);
	private static Set<String> vertexKeys = new HashSet<String>(20);
	private static Map<String, TitanLabel> makeTitanLabel = new HashMap<String, TitanLabel>();
	private static Map<String, String> changeKeys = new HashMap<String, String>();
	
	public static Map<String, Vertex> DIAGNOSIS_MAP = new HashMap<String,Vertex>();
	public static Map<String, Vertex> DIAGNOSISCATEGORY_MAP = new HashMap<String,Vertex>();
	public static Map<String, Vertex> DIAGNOSTIC_MAP = new HashMap<String,Vertex>();
	public static Map<String, Vertex> DIAGNOSTICCATEGORY_MAP = new HashMap<String,Vertex>();
	public static Map<String, Vertex> MED_MAP = new HashMap<String,Vertex>();
	public static Map<String, Vertex> MEDCATEGORY_MAP = new HashMap<String,Vertex>();
	public static Map<String, Vertex> SYMPTOM_MAP = new HashMap<String,Vertex>();
	public static Map<String, Vertex> SYMPTOMCATEGORY_MAP = new HashMap<String,Vertex>();
	public static Map<String, Vertex> THERAPEUTIC_MAP = new HashMap<String,Vertex>();
	public static Map<String, Vertex> THERAPEUTICCATEGORY_MAP = new HashMap<String,Vertex>();
	
	public static Set<String> noCollection = new HashSet<String>(5);
	
	public static void main(String[] args) {
		
		long startTime = new Date().getTime(); // start time
		int count = 0;
		MedGraph medGraph = new MedGraph();
		Relationship relationship = new Relationship();
		TitanGraph graph  = TitanDbUtil.getInstance().getTitanGraph();
		//TitanDbUtil.getInstance().clearGraph(graph);
		
		// added common attributes for vertex and edge 
		makeKeys.add("collection");
		makeKeys.add("DATATYPE");
		makeKeys.add("GRAPHUNIQUEKEY");
		
		// JSON Elements to be removed
		removeKeys.add("**DOCUMENTTYPE**");
		removeKeys.add("**OBJECTTYPE**");
		removeKeys.add("information");
		removeKeys.add("**NESTEDVALUE**");
	
		// Titan RESERVED Keys
		reserveKeys.add("ID");
		reserveKeys.add("id");
		reserveKeys.add("label");
		
		// Titan change keys 
		changeKeys.put("**NESTED**", "NESTED");
		changeKeys.put("**VALUE**", "VALUE");
		
		
		// Generate Common keys At the start of graph generation i.e. before creating vertices and edges
		//medGraph.generateCommonKeys(graph);
		
		// Create Vertices
		System.out.println("****************************************** Generating Vertices *******************************************************");
		medGraph.createVertexFromJSON(graph, DIAGNOSIS, "DIAGNOSISDEF", "DIAG_");
		medGraph.createVertexFromJSON(graph, DIAGNOSISCATEGORY, "DIAGNOSISCATEGORY", "DIAG_CAT_");
		medGraph.createVertexFromJSON(graph, DIAGNOSTIC, "PROCEDURES", "DIAGNOSTIC_");
		medGraph.createVertexFromJSON(graph, DIAGNOSTICCATEGORY, "DIAGNOSTICCATEGORY", "DIAGNOSTIC_CAT");
		medGraph.createVertexFromJSON(graph, MED, "MEDICATIONS", "MED_");
		medGraph.createVertexFromJSON(graph, MEDCATEGORY, "MEDICATIONCATEGORY", "MED_CAT_");
		medGraph.createVertexFromJSON(graph, SYMPTOM, "SMARTSYMPTOM", "SYMP_");
		medGraph.createVertexFromJSON(graph, SYMPTOMCATEGORY, "SYMPTOMCATEGORY", "SYMP_CAT_");
		medGraph.createVertexFromJSON(graph, THERAPEUTIC, "PROCEDURES", "THERAP_");
		medGraph.createVertexFromJSON(graph, THERAPEUTICCATEGORY, "THERAPEUTICCATEGORY", "THERAPCAT_");
		medGraph.createVertexFromJSON(graph, PHYSICIANCATEGORY, "PHYSICIANCATEGORY", "PHYSCAT_");
		
		// Create Edges
		/*************************TEMP FOR POPULATING EDGES *********************************/
		makeKeys.addAll(graph.getIndexedKeys(Edge.class));
		vertexKeys.addAll(graph.getIndexedKeys(Vertex.class));
		//makeKeys.addAll(graph.getIndexedKeys(Vertex.class));
		Iterator<TitanLabel> labels = graph.getTypes(TitanLabel.class).iterator();
		while (labels.hasNext()) {
			TitanLabel titanLabel = (TitanLabel) labels.next();
			makeTitanLabel.put(titanLabel.getName(), titanLabel);
			makeLabel.add(titanLabel.getName());			
		}
		
		/******************************** Remove Old Edges ***********************************************/
		//int count = 0;
		/*Iterator<Edge> edges =  graph.getEdges().iterator();
		while (edges.hasNext()) {
			Edge edge = (Edge) edges.next();
			if(edge.getProperty("subvertexedge") == null) {
				graph.removeEdge(edge);
				count++;
			}
		}
		graph.commit();
		System.out.println("Removed Edges Count " + count);*/
		/****************************************** Get Vertices Count **********************************/
		Iterator<Vertex> vertices = graph.getVertices().iterator();
		count = 0;
		while (vertices.hasNext()) {
			Vertex vertex = (Vertex) vertices.next();
			String collection = vertex.getProperty("collection");
			String GRAPHUNIQUEKEY = vertex.getProperty("GRAPHUNIQUEKEY");
			if (collection != null && !collection.isEmpty() && GRAPHUNIQUEKEY != null && !GRAPHUNIQUEKEY.isEmpty()) {
				if ("DIAGNOSISDEF".equalsIgnoreCase(collection)) {
					DIAGNOSIS_MAP.put(GRAPHUNIQUEKEY, vertex);
				} else if ("SMARTSYMPTOM".equalsIgnoreCase(collection)) {
					SYMPTOM_MAP.put(GRAPHUNIQUEKEY, vertex);
				} else if ("DIAGNOSISCATEGORY".equalsIgnoreCase(collection)) {
					DIAGNOSISCATEGORY_MAP.put(GRAPHUNIQUEKEY, vertex);
				} else if ("MEDICATIONS".equalsIgnoreCase(collection)) {
					MED_MAP.put(GRAPHUNIQUEKEY, vertex);
				} else if ("MEDICATIONCATEGORY".equalsIgnoreCase(collection)) {
					MEDCATEGORY_MAP.put(GRAPHUNIQUEKEY, vertex);
				} else if ("DIAGNOSTICCATEGORY".equalsIgnoreCase(collection)) {
					DIAGNOSTICCATEGORY_MAP.put(GRAPHUNIQUEKEY, vertex);
				} else if ("SYMPTOMCATEGORY".equalsIgnoreCase(collection)) {
					SYMPTOMCATEGORY_MAP.put(GRAPHUNIQUEKEY, vertex);
				} else if ("PROCEDURES".equalsIgnoreCase(collection)) {
					List<String> proctype = vertex.getProperty("proctype");
					if (proctype != null && !proctype.isEmpty()) {
						if (proctype.contains("THERAPEUTIC")) {
							THERAPEUTIC_MAP.put(GRAPHUNIQUEKEY, vertex);
						} else {
							DIAGNOSTIC_MAP.put(GRAPHUNIQUEKEY, vertex);
						}
					}
				} else if ("THERAPEUTICCATEGORY".equalsIgnoreCase(collection)) {
					THERAPEUTICCATEGORY_MAP.put(GRAPHUNIQUEKEY, vertex);
				} else {
					noCollection.add(collection);
				}
			}
			count++;
		}
		System.out.println("Graph Vertices Count " + count);
		
		count =  0;
		System.out.println("*********************Catgeory vise counts*****************");
		System.out.println("DIAGNOSIS " + DIAGNOSIS_MAP.keySet().size()); count = count + DIAGNOSIS_MAP.keySet().size();
		System.out.println("DIAGNOSISCATEGORY " + DIAGNOSISCATEGORY_MAP.keySet().size()); count = count + DIAGNOSISCATEGORY_MAP.keySet().size();
		System.out.println("DIAGNOSTIC " + DIAGNOSTIC_MAP.keySet().size()); count = count + DIAGNOSTIC_MAP.keySet().size();
		System.out.println("DIAGNOSTICCATEGORY " + DIAGNOSTICCATEGORY_MAP.keySet().size()); count = count + DIAGNOSTICCATEGORY_MAP.keySet().size();
		System.out.println("MED " + MED_MAP.keySet().size()); count = count + MED_MAP.keySet().size();
		System.out.println("MEDCATEGORY " + MEDCATEGORY_MAP.keySet().size()); count = count + MEDCATEGORY_MAP.keySet().size();
		System.out.println("SYMPTOM " + SYMPTOM_MAP.keySet().size()); count = count + SYMPTOM_MAP.keySet().size();
		System.out.println("SYMPTOMCATEGORY " + SYMPTOMCATEGORY_MAP.keySet().size()); count = count + SYMPTOMCATEGORY_MAP.keySet().size();
		System.out.println("THERAPEUTIC " + THERAPEUTIC_MAP.keySet().size()); count = count + THERAPEUTIC_MAP.keySet().size();
		System.out.println("THERAPEUTICCATEGORY " + THERAPEUTICCATEGORY_MAP.keySet().size()); count = count + THERAPEUTICCATEGORY_MAP.keySet().size();
		System.out.println("noCollection " + noCollection.size());
		System.out.println("Vertices AGGR. " + count);
		
		System.out.println("****************************************** Generating Graph Edges *******************************************************");
		relationship.createEdgeFromJSON(graph, DIAGNOSIS_DIAGNOSIS, "DIAGNOSISDIAGNOSISEDGE", "DIAG_DIAG_EDGE_", makeKeys, vertexKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel, DIAGNOSIS_MAP, DIAGNOSIS_MAP);
		relationship.createEdgeFromJSON(graph, DIAGNOSIS_DIAGNOSISCATEGORY, "DIAGNOSISCATEGORYEDGE", "DIAG_CAT_EDGE_", makeKeys, vertexKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel, DIAGNOSIS_MAP, DIAGNOSISCATEGORY_MAP);
		relationship.createEdgeFromJSON(graph, DIAGNOSTIC_DIAGNOSTICCATEGORY, "DIAGNOSTICCATEGORYEDGE", "DIAGNOSTIC_CAT_EDGE_", makeKeys, vertexKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel, DIAGNOSTIC_MAP, DIAGNOSTICCATEGORY_MAP);
		relationship.createEdgeFromJSON(graph, MED_MEDCATEGORY, "MEDCATEGORYEDGE", "MED_CAT_EDGE_", makeKeys, vertexKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel, MED_MAP, MEDCATEGORY_MAP);
		relationship.createEdgeFromJSON(graph, DIAGNOSIS_MED , "DIAGNOSISMEDEDGE", "DIAG_MED_EDGE_", makeKeys, vertexKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel, DIAGNOSIS_MAP, MED_MAP);
		relationship.createEdgeFromJSON(graph, DIAGNOSIS_THERAPEUTIC, "DIAGNOSISTHERAPEUTICEDGE", "DIAG_THERAPEUTIC_EDGE_", makeKeys, vertexKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel, DIAGNOSIS_MAP, THERAPEUTIC_MAP);
		relationship.createEdgeFromJSON(graph, SYMPTOM_SYMPTOMCATEGORY, "SYMPTOMCATEGORYEDGE", "SYMP_CAT_EDGE_", makeKeys, vertexKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel, SYMPTOM_MAP, SYMPTOMCATEGORY_MAP);
		relationship.createEdgeFromJSON(graph, DIAGNOSIS_DIAGNOSTIC, "DIAGNOSISDIAGNOSTICEDGE", "DIAG_DIAGNOSTIC_EDGE_", makeKeys, vertexKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel, DIAGNOSIS_MAP, DIAGNOSTIC_MAP);
		relationship.createEdgeFromJSON(graph, THERAPEUTIC_THERAPCATEGORY, "THERAPEUTICCATEGORYEDGE","THERAP_CAT_EDGE_", makeKeys, vertexKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel, THERAPEUTIC_MAP, THERAPEUTICCATEGORY_MAP);
		relationship.createEdgeFromJSON(graph, SYMPTOM_MED, "SYMPTOMMEDMAP","SYS_MED_EDGE_", makeKeys, removeKeys, vertexKeys, reserveKeys, makeLabel, makeTitanLabel, SYMPTOM_MAP, MED_MAP);
		relationship.createEdgeFromJSON(graph, SYMPTOM_DIAGNOSIS, "SYMPTOMDIAGNOSISMAP","SYS_DIAG_EDGE_", makeKeys, vertexKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel, SYMPTOM_MAP, DIAGNOSIS_MAP);

		long endTime = new Date().getTime(); // end time
		System.out.println("Data Loaded !!!!!!!!!!");
		calculateTimeForExecution(endTime - startTime);
		//System.out.println("makeLabel : " + makeLabel);
	}
	
	private static void calculateTimeForExecution(long miliseconds) {
		System.out.println("**********************calculateTimeForExecution*******************");
		String time = String.format("%d hrs, %d min, %d sec", TimeUnit.MILLISECONDS.toHours(miliseconds) ,TimeUnit.MILLISECONDS.toMinutes(miliseconds), TimeUnit.MILLISECONDS.toSeconds(miliseconds) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(miliseconds)));
		System.out.println("Total Time of execution : " + time);
	}
	
	/**
	 * Generate index for keys common to both Edges and Vertices
	 * @param graph
	 */
	private void generateCommonKeys(TitanGraph graph) {
		for (String key : makeKeys) {
			graph.makeKey(key).dataType(String.class).indexed(Vertex.class).indexed(Edge.class).indexed(TitanDbUtil.ES_INDEX_NAME, Vertex.class).indexed(TitanDbUtil.ES_INDEX_NAME, Edge.class).make();
		}
		// Sub vertex and Sub vertex edge
		graph.makeKey("subvertexedge").dataType(String.class).indexed(Vertex.class).indexed(Edge.class).indexed(TitanDbUtil.ES_INDEX_NAME, Edge.class).make();
		graph.makeKey("subedge").dataType(String.class).indexed(Vertex.class).indexed(Edge.class).indexed(TitanDbUtil.ES_INDEX_NAME, Vertex.class).make();
		graph.commit();
	}

	/**
	 * Create vertices by reading JSON file
	 * @param graph
	 * @param JSON_PATH
	 * @param parentNodeName
	 * @param reserveKeyExt
	 */
	private void createVertexFromJSON(TitanGraph graph, String JSON_PATH, String parentNodeName, String reserveKeyExt) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode parentNode = null;
			String fieldName = null;
			boolean isFieldRemoved = false;
			Iterator<String> fieldNameIterator = null;
			// Read all files
			File dir = new File(JSON_PATH);
			File [] files = dir.listFiles(new FilenameFilter() {
			    public boolean accept(File dir, String name) {
			        return name.endsWith(".json");
			    }
			});
			// Create Graph
			for (File jsonFile : files) {
				System.out.println("Reading File >> " + jsonFile);
				// add vertex
				Vertex vertex = graph.addVertex(jsonFile.getName().replace(".json", ""));
				// JSON Nodes
				parentNode = mapper.readValue(jsonFile, JsonNode.class).get(parentNodeName);
				fieldNameIterator = parentNode.getFieldNames();
				while (fieldNameIterator.hasNext()) {
					isFieldRemoved = false;
					fieldName = fieldNameIterator.next();
					if (removeKeys.contains(fieldName)) {
						for (String removeKey : removeKeys) {
							if (fieldName.equals(removeKey)) {
								fieldNameIterator.remove();
								isFieldRemoved = true;
								break;
							}
						}
					}
					if (!isFieldRemoved) {
						JsonNode jsonNode = parentNode.get(fieldName);
						if (fieldName.contains("*")) {
							fieldName = fieldName.replace("*", "");
						}
						if (jsonNode.isArray()) {
							processJsonArrayAndMakeKey(graph, vertex, fieldName, jsonNode, reserveKeyExt);
						} else {
							processJsonFieldAndMakeKey(graph, vertex, fieldName, jsonNode, reserveKeyExt);
						}
					}
				}
				graph.commit();
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * This method is used to process json node add json field value to vertex also create unindexed keys if any
	 * @param graph
	 * @param vertex
	 * @param fieldName
	 * @param jsonNode
	 * @param reserveKeyExt
	 */
	private void processJsonFieldAndMakeKey(TitanGraph graph, Vertex vertex, String fieldName, JsonNode jsonNode, String reserveKeyExt) {
		try {
			if (fieldName != null && !fieldName.isEmpty()) {
				ObjectMapper mapper = new ObjectMapper();
				TypeReference<Map<String,Object>> mapTypeRef = new TypeReference<Map<String,Object>>(){};
				Map<String, Object> map = null;
				String jsonText = jsonNode.getTextValue(); // gives value without ""
				
				if (jsonText != null) {
					
					if (reserveKeys.contains(fieldName)) {
						fieldName = reserveKeyExt + fieldName;
					}
					
					// date
					Date date = TitanDbUtil.getInstance().generateDate(jsonText);
					if (date != null && fieldName.toLowerCase().contains("date")) {
						if (!makeKeys.contains(fieldName)) {
							graph.makeKey(fieldName).dataType(Date.class).indexed(Vertex.class).make();
							makeKeys.add(fieldName);
						}
						vertex.setProperty(fieldName, date);
						return;
					}
					
					// double 
					try {
						if (!fieldName.contains("icd") && !fieldName.toLowerCase().contains("_id") && jsonNode.isNumber()) {
							if (!makeKeys.contains(fieldName)) {
								graph.makeKey(fieldName).dataType(Double.class).indexed(Vertex.class).indexed(TitanDbUtil.ES_INDEX_NAME, Vertex.class).make();
								makeKeys.add(fieldName);
							}
							vertex.setProperty(fieldName, jsonNode.getDoubleValue());
							return;
						}
					} catch (NumberFormatException e) {
						
					}
					
					// String
					if (!makeKeys.contains(fieldName)) {
						graph.makeKey(fieldName).dataType(String.class).indexed(Vertex.class).indexed(TitanDbUtil.ES_INDEX_NAME, Vertex.class).make();
						makeKeys.add(fieldName);
					}
					vertex.setProperty(fieldName, jsonText);
				} else {
					try {
						// map
						map = mapper.readValue(jsonNode.toString(), mapTypeRef);
						if (map != null && !map.isEmpty()) {
							//vertex.setProperty(fieldName, map);
							List<Map<String,Object>> valueListMap = new ArrayList<Map<String,Object>>(1);
							valueListMap.add(map);
							createVertexesWithUnidirectedEdge(graph, (TitanVertex)vertex, fieldName, valueListMap);
						}
						return;
					} catch (Exception e) {
					} 
				}
			}
		} catch(Exception e) {
			System.out.println("ERROR : Key >>>> " + fieldName);
			e.printStackTrace();
			System.exit(0);
		}
	}

	/**
	 * Process JSON Array to create sub vertexes or set JSON array as value to vertex
	 * @param graph
	 * @param vertex
	 * @param fieldName
	 * @param jsonNode
	 * @param reserveKeyExt
	 */
	private void processJsonArrayAndMakeKey(TitanGraph graph, Vertex vertex, String fieldName, JsonNode jsonNode, String reserveKeyExt) {
		try {
			if (fieldName != null && !fieldName.isEmpty()) {
				ObjectMapper mapper = new ObjectMapper();
				boolean isValueList = false;
				TitanVertex titanVertex = (TitanVertex) vertex;
				TypeReference<List<Object>> listTypeRef = new TypeReference<List<Object>>(){};
				TypeReference<List<Map<String,Object>>> listMapTypeRef = new TypeReference<List<Map<String,Object>>>(){};
				List<Map<String,Object>> valueListMap = null;
				List<Object> valueList = null;
				
				if (reserveKeys.contains(fieldName)) {
					fieldName = reserveKeyExt + fieldName;
				}		
				
				try {
					for (int index = 0; index < jsonNode.size(); index++) {
						removeKeysFromNestedNodes(jsonNode.get(index));
					}
					valueListMap = mapper.readValue(jsonNode.traverse(), listMapTypeRef);
					if (valueListMap != null && !valueListMap.isEmpty()) {
						// titanVertex.addProperty(fieldName, valueListMap);
						createVertexesWithUnidirectedEdge(graph, titanVertex, fieldName, valueListMap);
					}
				} catch (JsonParseException e) {
					e.printStackTrace();
				} catch (JsonMappingException e) {
					isValueList = true;
					//e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
				if (isValueList) {
					if (!makeKeys.contains(fieldName)) {
						//graph.createKeyIndex(fieldName, Vertex.class);
						graph.makeKey(fieldName).dataType(Object.class).indexed(Vertex.class).make();
						makeKeys.add(fieldName);
					}
					try {
						valueList = mapper.readValue(jsonNode.traverse(), listTypeRef);
						if (valueList != null && !valueList.isEmpty()) {
							titanVertex.addProperty(fieldName, valueList);
						}
					} catch (JsonParseException e) {
						e.printStackTrace();
					} catch (JsonMappingException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		} catch (Exception e) {
			System.out.println("ERROR : Key >>>> " + fieldName);
			e.printStackTrace();
			System.exit(0);
		}
	}

	/**
	 * Create unidirected edge to sub-vertices
	 * @param graph
	 * @param titanVertex
	 * @param label
	 * @param valueListMap
	 */
	private void createVertexesWithUnidirectedEdge(TitanGraph graph, TitanVertex titanVertex, String label, List<Map<String, Object>> valueListMap) {
		TitanLabel titanLabel = null;
		label = label.replaceAll("_", "").replaceAll("\\s", "");
		if (!makeLabel.contains(label)) {
			titanLabel = graph.makeLabel(label).unidirected().make();
			makeLabel.add(label);
			makeTitanLabel.put(label, titanLabel);
		}
		
		Set<String> keys = null;
		Vertex vertex = null;
		for (Map<String, Object> element : valueListMap) {
			keys = element.keySet();
			vertex = graph.addVertex(null);
			for (String key : keys) {
				Object value = element.get(key);
				if (reserveKeys.contains(key)) {
					key = "SUBVTX_" + key;
				}
				Object object = setDataTypeAndFormatObject(graph, (TitanVertex)vertex, key, value);
				if (object != null) {
					vertex.setProperty(key, object);
				}
			}
			TitanEdge titanEdge = titanVertex.addEdge(label, (TitanVertex)vertex);
			titanEdge.setProperty("subvertexedge", "true");
		}		
		graph.commit();
	}

	/**
	 * Set type for sub-vertex objects properties
	 * @param graph
	 * @param titanVertex
	 * @param key
	 * @param object
	 * @return
	 */
	private Object setDataTypeAndFormatObject(TitanGraph graph, TitanVertex titanVertex, String key, Object object) {
		KeyMaker keyMaker = null;
		Class clazz = Object.class;
		boolean isString = true;
		boolean isPrimiOrString = false;
		
		String value = (object == null) ? "" : object.toString();
		
		if (value.isEmpty()) {
			return null;
		}
		
		if (!makeKeys.contains(key)) {
			keyMaker = graph.makeKey(key);
			makeKeys.add(key);
		}
		
		// date
		Date date = TitanDbUtil.getInstance().generateDate(value);
		if (date != null && key.toLowerCase().contains("date")) {
			object = date;
			clazz = Date.class;
			isString = false;
		} 
		
		/*// double 
		try {
			double doubleValue = Double.parseDouble(value);
			if (!key.contains("icd")) {
				object = doubleValue;
				clazz = Double.class;
				isString = false;
				isPrimiOrString = true;
			}
		} catch (NumberFormatException e) {
			
		}*/
		
		if (object instanceof List) {
			try {
				List<Map<String, Object>> listMap = (List<Map<String, Object>>) object;
				createVertexesWithUnidirectedEdge(graph, titanVertex, key, listMap);
				object = null;
			} catch (Exception e) {
				titanVertex.addProperty(key, object);
			}
			isString = false;
		}
		
		if (object instanceof Map) {
			List<Map<String,Object>> listMap = new ArrayList<Map<String,Object>>(1);
			listMap.add((Map<String,Object>)object);
			createVertexesWithUnidirectedEdge(graph, titanVertex, key, listMap);
			object = null;
			isString = false;
		}
		
		// String
		if (isString) {
			isPrimiOrString = true;
			clazz = String.class;
		}
		
		if (keyMaker != null) {
			if (isPrimiOrString) {
				keyMaker.dataType(clazz).indexed(Vertex.class).indexed(TitanDbUtil.ES_INDEX_NAME ,Vertex.class).make();
			} else {
				keyMaker.dataType(clazz).indexed(Vertex.class).make();
			}			
		}
		
		return object;
	}

	/**
	 * Remove unwanted fields 
	 * @param jsonNode
	 */
	private void removeKeysFromNestedNodes(JsonNode jsonNode) {
		String fieldName = null;
		ObjectMapper mapper = new ObjectMapper();
		Iterator<String> fieldNameIterator = jsonNode.getFieldNames();
		boolean isJsonChanged = false;
		while (fieldNameIterator.hasNext()) {
			fieldName = fieldNameIterator.next();
			if (removeKeys.contains(fieldName)) {
				for (String removeKey : removeKeys) {
					if (fieldName.equals(removeKey)) {
						fieldNameIterator.remove();
						break;
					}
				}
			}
			/*if (fieldName.contains("*")) {
				fieldName = fieldName.replace("*", "");
			}*/
		}
		Set<String> changeKeySet = changeKeys.keySet();
		String value = null;
		String jsonStr = jsonNode.toString();
		for (String key : changeKeySet) {
			value = changeKeys.get(key);
			if (jsonStr.contains(key)) {
				jsonStr = jsonStr.replace(key, value);
				isJsonChanged = true;
			}
		}
		if (isJsonChanged) {
			try {
				jsonNode = mapper.readValue(jsonStr, JsonNode.class);
			} catch (JsonParseException e) {
				System.out.println("JSON parsing exception for subvertex");
			} catch (JsonMappingException e) {
				System.out.println("JSON mapping exception for subvertex");
			} catch (IOException e) {
				System.out.println("JSON IOException exception for subvertex");
			}
		}
	}
}

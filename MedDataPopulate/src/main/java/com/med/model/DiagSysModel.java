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

public class DiagSysModel {
	
	/*************************************** OFFSHORE FILE PATHS ************************************************/
	
	// Vertexes
	/*private static String DIAGNOSIS = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\diagnosis";
	private static String DIAGNOSISCATEGORY = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\diagnosiscategory";
	private static String DIAGNOSTIC = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\diagnostic";
	private static String DIAGNOSTICCATEGORY = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\diagnosticcategory";
	private static String MED = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\med";
	private static String MEDCATEGORY = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\medcategory";
	private static String SYMPTOM = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\symptom";
	private static String SYMPTOMCATEGORY = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\symptomcategory";
	private static String THERAPEUTIC = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\therapeutic";

	// Edges:
	private static String DIAGNOSIS_DIAGNOSIS = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\diagnosis_diagnosis";
	private static String DIAGNOSIS_DIAGNOSISCATEGORY = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\diagnosis_diagnosiscategory";
	private static String DIAGNOSIS_DIAGNOSTIC = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\diagnosis_diagnostic";
	private static String DIAGNOSIS_MED = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\diagnosis_med";
	private static String DIAGNOSIS_THERAPEUTIC = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\diagnosis_therapeutic";
	private static String DIAGNOSTIC_DIAGNOSTICCATEGORY = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\diagnostic_diagnosticcategory";
	private static String MED_MEDCATEGORY = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\med_medcategory";
	private static String SYMPTOM_DIAGNOSIS = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\symptom_diagnosis";
	private static String SYMPTOM_SYMPTOMCATEGORY = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\symptom_symptomcategory";*/
	
	/*************************************** ONSITE FILE PATHS ************************************************/
	
	// Vertexes
	private static String DIAGNOSIS = "/root/titan/populateData/6371836/diagnosis";
	private static String DIAGNOSISCATEGORY = "/root/titan/populateData/6371836/diagnosiscategory";
	private static String DIAGNOSTIC = "/root/titan/populateData/6371836/diagnostic";
	private static String DIAGNOSTICCATEGORY = "/root/titan/populateData/6371836/diagnosticcategory";
	private static String MED = "/root/titan/populateData/6371836/med";
	private static String MEDCATEGORY = "/root/titan/populateData/6371836/medcategory";
	private static String SYMPTOM = "/root/titan/populateData/6371836/symptom";
	private static String SYMPTOMCATEGORY = "/root/titan/populateData/6371836/symptomcategory";
	private static String THERAPEUTIC = "/root/titan/populateData/6371836/therapeutic";

	// Edges:
	private static String DIAGNOSIS_DIAGNOSIS = "/root/titan/populateData/6371836/diagnosis_diagnosis";
	private static String DIAGNOSIS_DIAGNOSISCATEGORY = "/root/titan/populateData/6371836/diagnosis_diagnosiscategory";
	private static String DIAGNOSIS_DIAGNOSTIC = "/root/titan/populateData/6371836/diagnosis_diagnostic";
	private static String DIAGNOSIS_MED = "/root/titan/populateData/6371836/diagnosis_med";
	private static String DIAGNOSIS_THERAPEUTIC = "/root/titan/populateData/6371836/diagnosis_therapeutic";
	private static String DIAGNOSTIC_DIAGNOSTICCATEGORY = "/root/titan/populateData/6371836/diagnostic_diagnosticcategory";
	private static String MED_MEDCATEGORY = "/root/titan/populateData/6371836/med_medcategory";
	private static String SYMPTOM_DIAGNOSIS = "/root/titan/populateData/6371836/symptom_diagnosis";
	private static String SYMPTOM_SYMPTOMCATEGORY = "/root/titan/populateData/6371836/symptom_symptomcategory";
	
	private static Set<String> makeKeys = new HashSet<String>(20);
	private static Set<String> removeKeys = new HashSet<String>(20);
	private static Set<String> reserveKeys = new HashSet<String>(5);
	private static Set<String> makeLabel = new HashSet<String>(20);
	private static Map<String, TitanLabel> makeTitanLabel = new HashMap<String, TitanLabel>();
	
	public static void main(String[] args) {
		
		long start = System.currentTimeMillis();
		
		DiagSysModel diagSysModel = new DiagSysModel();
		DiagSymRelationship diagSymRelationship = new DiagSymRelationship();
		TitanGraph graph  = TitanDbUtil.getInstance().getTitanGraph();
		//TitanDbUtil.getInstance().clearGraph(graph);
		
		// added common attributes for vertex and edge 
		makeKeys.add("collection");
		makeKeys.add("DATATYPE");
		makeKeys.add("GRAPHUNIQUEKEY");
		diagSysModel.generateCommonKeys(graph);
		
		// JSON Elements to be removed
		removeKeys.add("**DOCUMENTTYPE**");
		removeKeys.add("**OBJECTTYPE**");
		removeKeys.add("information");
		removeKeys.add("**NESTEDVALUE**");
	
		// Titan RESERVED Keys
		reserveKeys.add("ID");
		reserveKeys.add("id");
		reserveKeys.add("label");
		
		diagSysModel.createVertexFromJSON(graph, DIAGNOSIS, "DIAGNOSISDEF", "DIAG_");
		diagSysModel.createVertexFromJSON(graph, DIAGNOSISCATEGORY, "DIAGNOSISCATEGORY", "DIAG_CAT_");
		diagSysModel.createVertexFromJSON(graph, DIAGNOSTIC, "PROCEDURES", "DIAGNOSTIC_");
		diagSysModel.createVertexFromJSON(graph, DIAGNOSTICCATEGORY, "DIAGNOSTICCATEGORY", "DIAGNOSTIC_CAT");
		diagSysModel.createVertexFromJSON(graph, MED, "MEDICATIONS", "MED_");
		diagSysModel.createVertexFromJSON(graph, MEDCATEGORY, "MEDICATIONCATEGORY", "MED_CAT_");
		diagSysModel.createVertexFromJSON(graph, SYMPTOM, "SMARTSYMPTOM", "SYMP_");
		diagSysModel.createVertexFromJSON(graph, SYMPTOMCATEGORY, "SYMPTOMCATEGORY", "SYMP_CAT_");
		diagSysModel.createVertexFromJSON(graph, THERAPEUTIC, "PROCEDURES", "THERAP_");
		
		// Create Edge 
		
		System.out.println("****************************************** Generating Edges *******************************************************");
		
		diagSymRelationship.createEdgeFromJSON(graph, DIAGNOSIS_DIAGNOSIS, "DIAGNOSISDIAGNOSISEDGE", "DIAG_DIAG_EDGE_", "DIAGNOSISDEF", "DIAGNOSISDEF", makeKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel);
		diagSymRelationship.createEdgeFromJSON(graph, SYMPTOM_DIAGNOSIS, "SYMPTOMDIAGNOSISMAP","SYS_DIAG_EDGE_", "SMARTSYMPTOM", "DIAGNOSISDEF", makeKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel);
		diagSymRelationship.createEdgeFromJSON(graph, SYMPTOM_SYMPTOMCATEGORY, "SYMPTOMCATEGORYEDGE", "SYMP_CAT_EDGE_", "SMARTSYMPTOM", "SYMPTOMCATEGORY", makeKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel);
		diagSymRelationship.createEdgeFromJSON(graph, DIAGNOSIS_DIAGNOSISCATEGORY, "DIAGNOSISCATEGORYEDGE", "DIAG_CAT_EDGE_","DIAGNOSISDEF", "DIAGNOSISCATEGORY",  makeKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel);
		diagSymRelationship.createEdgeFromJSON(graph, DIAGNOSIS_DIAGNOSTIC, "DIAGNOSISDIAGNOSTICEDGE", "DIAG_DIAGNOSTIC_EDGE_", "DIAGNOSISDEF", "PROCEDURES", makeKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel);
		diagSymRelationship.createEdgeFromJSON(graph, DIAGNOSIS_MED , "DIAGNOSISMEDEDGE", "DIAG_MED_EDGE_", "DIAGNOSISDEF", "MEDICATIONS", makeKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel);
		diagSymRelationship.createEdgeFromJSON(graph, DIAGNOSIS_THERAPEUTIC, "DIAGNOSISTHERAPEUTICEDGE", "DIAG_THERAPEUTIC_EDGE_", "DIAGNOSISDEF", "PROCEDURES", makeKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel);
		diagSymRelationship.createEdgeFromJSON(graph, DIAGNOSTIC_DIAGNOSTICCATEGORY, "DIAGNOSTICCATEGORYEDGE", "DIAGNOSTIC_CAT_EDGE_", "PROCEDURES", "DIAGNOSTICCATEGORY", makeKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel);
		diagSymRelationship.createEdgeFromJSON(graph, MED_MEDCATEGORY, "MEDCATEGORYEDGE", "MED_CAT_EDGE_", "MEDICATIONS", "MEDICATIONCATEGORY", makeKeys, removeKeys, reserveKeys, makeLabel, makeTitanLabel);
		
		
		long end = System.currentTimeMillis();
		System.out.println("Data Loaded !!!!!!!!!!");
		System.out.println("Total Executaion Time : " + ((end-start) / 1000)/60 + " minutes");
		
		System.out.println("makeLabel : " + makeLabel);
	}
	
	private void generateCommonKeys(TitanGraph graph) {
		for (String key : makeKeys) {
			graph.makeKey(key).dataType(String.class).indexed(TitanDbUtil.ES_INDEX_NAME, Vertex.class).indexed(TitanDbUtil.ES_INDEX_NAME, Edge.class).make();
		}
		// Sub vertex and Sub vertex edge
		graph.makeKey("subvertexedge").dataType(String.class).indexed(TitanDbUtil.ES_INDEX_NAME, Edge.class).make();
		graph.makeKey("subedge").dataType(String.class).indexed(TitanDbUtil.ES_INDEX_NAME, Vertex.class).make();
		graph.commit();
	}

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
				/*if (!jsonFile.getName().equalsIgnoreCase("953329.json")) {
					continue;
				}*/
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
	
	private void processJsonFieldAndMakeKey(TitanGraph graph, Vertex vertex, String fieldName, JsonNode jsonNode, String reserveKeyExt) {
		try {
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
							graph.makeKey(fieldName).dataType(Double.class).indexed(TitanDbUtil.ES_INDEX_NAME, Vertex.class).make();
							makeKeys.add(fieldName);
						}
						vertex.setProperty(fieldName, jsonNode.getDoubleValue());
						return;
					}
				} catch (NumberFormatException e) {
					
				}
				
				// String
				if (!makeKeys.contains(fieldName)) {
					graph.makeKey(fieldName).dataType(String.class).indexed(TitanDbUtil.ES_INDEX_NAME, Vertex.class).make();
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
		} catch(Exception e) {
			System.out.println("ERROR : Key >>>> " + fieldName);
			e.printStackTrace();
			System.exit(0);
		}
	}

	private void processJsonArrayAndMakeKey(TitanGraph graph, Vertex vertex, String fieldName, JsonNode jsonNode, String reserveKeyExt) {
		try {
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
			
			if (!makeKeys.contains(fieldName)) {
				graph.createKeyIndex(fieldName, Vertex.class);
				makeKeys.add(fieldName);
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
		} catch (Exception e) {
			System.out.println("ERROR : Key >>>> " + fieldName);
			e.printStackTrace();
			System.exit(0);
		}
	}

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
				Object object = setDataTypeAndFormatObject(graph, (TitanVertex)vertex, key, element.get(key));
				if (object != null) {
					vertex.setProperty(key, object);
				}
			}
			TitanEdge titanEdge = titanVertex.addEdge(label, (TitanVertex)vertex);
			titanEdge.setProperty("subvertexedge", "true");
		}		
		graph.commit();
	}

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
				keyMaker.dataType(clazz).indexed(TitanDbUtil.ES_INDEX_NAME ,Vertex.class).make();
			} else {
				keyMaker.dataType(clazz).indexed(Vertex.class).make();
			}			
		}
		
		return object;
	}

	private void removeKeysFromNestedNodes(JsonNode jsonNode) {
		String fieldName = null;
		Iterator<String> fieldNameIterator = jsonNode.getFieldNames();
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
			if (fieldName.contains("*")) {
				fieldName = fieldName.replace("*", "");
			}
		}
	}
}

package com.med.model;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.Date;
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
import com.thinkaurelius.titan.core.TitanGraph;
import com.thinkaurelius.titan.core.TitanVertex;
import com.tinkerpop.blueprints.Vertex;

public class DiagSysModelINDEXED {
	
	private static String DIAGNOSIS_JSON_PATH = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836";
	private static String SYMPTOM_JSON_PATH = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\6371836\\symp";
	
	private static Set<String> makeKeys = new HashSet<String>(20);
	private static Set<String> removeKeys = new HashSet<String>(20);
	private static Set<String> reserveKeys = new HashSet<String>(5);

	public static void main(String[] args) {
		DiagSysModelINDEXED diagSysModel = new DiagSysModelINDEXED();
		TitanGraph graph  = TitanDbUtil.getInstance().getTitanGraph();
		//TitanDbUtil.getInstance().clearGraph(graph);
		
		// JSON Elements to be removed
		removeKeys.add("**DOCUMENTTYPE**");
		removeKeys.add("**OBJECTTYPE**");
		removeKeys.add("information");
		removeKeys.add("**NESTEDVALUE**");
	
		// Titan RESERVED Keys
		reserveKeys.add("id");
		reserveKeys.add("label");
		
		diagSysModel.createVertexFromJSON(graph, DIAGNOSIS_JSON_PATH, "DIAGNOSISDEF", "DIAG_");
		diagSysModel.createVertexFromJSON(graph, SYMPTOM_JSON_PATH, "SMARTSYMPTOM", "SYMP_");		
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
						if (parentNode.get(fieldName).isArray()) {
							processJsonArrayAndMakeKey(graph, vertex, fieldName, parentNode.get(fieldName), reserveKeyExt);
						} else {
							processJsonFieldAndMakeKey(graph, vertex, fieldName, parentNode.get(fieldName), reserveKeyExt);
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
				double doubleValue = Double.parseDouble(jsonText);
				if (!fieldName.contains("icd")) {
					if (!makeKeys.contains(fieldName)) {
						graph.makeKey(fieldName).dataType(Double.class).indexed(TitanDbUtil.ES_INDEX_NAME, Vertex.class).make();
						makeKeys.add(fieldName);
					}
					vertex.setProperty(fieldName, doubleValue);
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
					vertex.setProperty(fieldName, map);
				}
				return;
			} catch (Exception e) {
			} 
		}
	}

	private void processJsonArrayAndMakeKey(TitanGraph graph, Vertex vertex, String fieldName, JsonNode jsonNode, String reserveKeyExt) {
		ObjectMapper mapper = new ObjectMapper();
		boolean isValueList = false;
		TitanVertex titanVertex = (TitanVertex) vertex;
		TypeReference<List<String>> listTypeRef = new TypeReference<List<String>>(){};
		TypeReference<List<Map<String,Object>>> listMapTypeRef = new TypeReference<List<Map<String,Object>>>(){};
		List<Map<String,Object>> valueListMap = null;
		List<String> valueList = null;
		
		if (reserveKeys.contains(fieldName)) {
			fieldName = reserveKeyExt + fieldName;
		}		
		
		if (!makeKeys.contains(fieldName)) {
			graph.makeKey(fieldName).dataType(Object.class).indexed(Vertex.class).make();
			//graph.createKeyIndex(fieldName, Vertex.class);
			makeKeys.add(fieldName);
		}
		try {
			for (int index = 0; index < jsonNode.size(); index++) {
				removeKeysFromNestedNodes(jsonNode.get(index));
			}
			valueListMap = mapper.readValue(jsonNode.traverse(), listMapTypeRef);
			if (valueListMap != null && !valueListMap.isEmpty()) {
				titanVertex.addProperty(fieldName, valueListMap);
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
						continue;
					}
				}
			}
		}
	}
}

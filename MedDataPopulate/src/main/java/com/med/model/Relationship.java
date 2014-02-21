package com.med.model;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
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
import com.thinkaurelius.titan.core.TitanGraphQuery;
import com.thinkaurelius.titan.core.TitanLabel;
import com.thinkaurelius.titan.core.TitanVertex;
import com.tinkerpop.blueprints.Edge;
import com.tinkerpop.blueprints.Vertex;

public class Relationship {
	
	/**
	 * This method is used to create edge between vertices
	 * @param graph
	 * @param JSON_PATH
	 * @param parentNodeName
	 * @param reservKeyAppendStr
	 * @param vertex1Collection
	 * @param vertex2Collection
	 * @param makeKeys
	 * @param removeKeys
	 * @param reserveKeys
	 * @param makeLabel
	 * @param makeTitanLabel
	 */
	public void createEdgeFromJSON(TitanGraph graph, String JSON_PATH, String parentNodeName, String reservKeyAppendStr, Set<String> makeKeys, Set<String> removeKeys, 
			Set<String> reserveKeys, Set<String> makeLabel,  Map<String,TitanLabel> makeTitanLabel, Map<String, Vertex> fromVertices, Map<String, Vertex> toVertices) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode parentNode = null;
			String fieldName = null;
			boolean isFieldRemoved = false;
			int count = 0;
			Iterator<String> fieldNameIterator = null;
			Vertex inVertex = null; 
			Vertex outVertex = null; 
			String EDGE1KEY = null;
			String EDGE2KEY = null;
			Iterator<Vertex> vertexes = null;
			TitanLabel titanLabel = null;
			TitanGraphQuery query = null;
			
			// Read all files
			File dir = new File(JSON_PATH);
			File [] files = dir.listFiles(new FilenameFilter() {
			    public boolean accept(File dir, String name) {
			        return name.endsWith(".json");
			    }
			});
			// Create Graph
			for (File jsonFile : files) {
				count++;
				System.out.println("Reading File >> " + jsonFile);
				inVertex = null; 
				outVertex = null; 
				parentNode = mapper.readValue(jsonFile, JsonNode.class).get(parentNodeName);
				EDGE1KEY = parentNode.get("**EDGE1KEY**").getTextValue();
				EDGE2KEY = parentNode.get("**EDGE2KEY**").getTextValue();
				
				// symptom
				//vertexes = graph.getVertices("GRAPHUNIQUEKEY", symptom).iterator();
				/*query = graph.query();
				System.out.println("Retriving vertex 1");
				vertexes = query.has("GRAPHUNIQUEKEY", EDGE1KEY).has("collection", vertex1Collection).vertices().iterator();
				if(vertexes.hasNext()) {
					inVertex = vertexes.next();
				}*/
				inVertex = fromVertices.get(EDGE1KEY);
				
				// diagnosis
				//vertexes = graph.getVertices("GRAPHUNIQUEKEY", diagnosis).iterator();
				/*query = graph.query();
				System.out.println("Retriving vertex 2");
				vertexes =  query.has("GRAPHUNIQUEKEY", EDGE2KEY).has("collection", vertex2Collection).vertices().iterator();
				if(vertexes.hasNext()) {
					outVertex = vertexes.next();
				}*/
				
				outVertex = toVertices.get(EDGE2KEY);
				
				if (inVertex != null && outVertex != null) {
					String label = parentNode.get("**GRAPHUNIQUEKEY**").getTextValue();
					label = label.replaceAll("_", "").replaceAll("\\s", "");
					if (!makeLabel.contains(label)) {
						titanLabel = graph.makeLabel(label).make();
						makeLabel.add(label);
						makeTitanLabel.put(label, titanLabel);
					}
					
					// Titan Vertexes
					Edge edge = graph.addEdge(null, inVertex, outVertex, label);
					// JSON Nodes
					fieldNameIterator = parentNode.getFieldNames();
					//System.out.println("setting properties /setting sub vertex");
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
								processJsonArrayAndMakeKey(graph, edge, fieldName, reservKeyAppendStr, jsonNode, makeKeys, reserveKeys, removeKeys, makeLabel, makeTitanLabel);
							} else {
								processJsonFieldAndMakeKey(graph, edge, fieldName, reservKeyAppendStr, jsonNode, makeKeys, reserveKeys, makeLabel, makeTitanLabel);
							}
						}
					}
				}
				graph.commit();
				/*if (count > 60000) {
					break;
				} else {
					jsonFile.delete();
				}*/
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * This method is used to process edge JSON fields, make key if not created before and set properties for edge
	 * @param graph
	 * @param edge
	 * @param fieldName
	 * @param reservKeyAppendStr
	 * @param jsonNode
	 * @param makeKeys
	 * @param reserveKeys
	 * @param makeLabel
	 * @param makeTitanLabel
	 */
	private void processJsonFieldAndMakeKey(TitanGraph graph, Edge edge, String fieldName, String reservKeyAppendStr, JsonNode jsonNode, Set<String> makeKeys, Set<String> reserveKeys, Set<String> makeLabel, Map<String,TitanLabel> makeTitanLabel) {
		try {
			if (fieldName != null && !fieldName.isEmpty()) {
				ObjectMapper mapper = new ObjectMapper();
				TypeReference<Map<String,Object>> mapTypeRef = new TypeReference<Map<String,Object>>(){};
				Map<String, Object> map = null;
				String jsonText = jsonNode.getTextValue(); // gives value without ""
				if (jsonText != null) {
					
					if (reserveKeys.contains(fieldName)) {
						fieldName = reservKeyAppendStr + fieldName; //  "DIAG_SYS_EDGE_" 
					}
					
					// date
					Date date = TitanDbUtil.getInstance().generateDate(jsonText);
					if (date != null && fieldName.toLowerCase().contains("date")) {
						if (!makeKeys.contains(fieldName)) {
							graph.makeKey(fieldName).dataType(Date.class).indexed(Edge.class).make();
							makeKeys.add(fieldName);
						}
						edge.setProperty(fieldName, date);
						return;
					}
					
					// double 
					try {
						if (!fieldName.contains("icd") && !fieldName.toLowerCase().contains("_id") && jsonNode.isNumber()) {
							if (!makeKeys.contains(fieldName)) {
								graph.makeKey(fieldName).dataType(Double.class).indexed(TitanDbUtil.ES_INDEX_NAME, Edge.class).make();
								makeKeys.add(fieldName);
							}
							edge.setProperty(fieldName, jsonNode.getDoubleValue());
							return;
						}
					} catch (NumberFormatException e) {
						
					}
					
					// String
					if (!makeKeys.contains(fieldName)) {
						graph.makeKey(fieldName).dataType(String.class).indexed(TitanDbUtil.ES_INDEX_NAME, Edge.class).make();
						makeKeys.add(fieldName);
					}
					edge.setProperty(fieldName, jsonText);
				} else {
					try {
						// map
						map = mapper.readValue(jsonNode.toString(), mapTypeRef);
						if (map != null && !map.isEmpty()) {
							//edge.setProperty(fieldName, map);
							List<Map<String,Object>> valueListMap = new ArrayList<Map<String,Object>>(1);
							valueListMap.add(map);
							createVertexesWithUnidirectedEdge(graph, (TitanEdge)edge, fieldName, valueListMap, makeLabel, makeKeys, reserveKeys, makeTitanLabel);
						}
						return;
					} catch (Exception e) {
						//e.printStackTrace();
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
	 * This method is used to process edge JSON arrays make key if not created before, create Titan relationship for complex objects
	 * @param graph
	 * @param edge
	 * @param fieldName
	 * @param reservKeyAppendStr
	 * @param jsonNode
	 * @param makeKeys
	 * @param reserveKeys
	 * @param removeKeys
	 * @param makeLabel
	 * @param makeTitanLabel
	 */
	private void processJsonArrayAndMakeKey(TitanGraph graph, Edge edge, String fieldName, String reservKeyAppendStr, JsonNode jsonNode,
			Set<String> makeKeys, Set<String> reserveKeys,Set<String> removeKeys, Set<String> makeLabel, Map<String,TitanLabel> makeTitanLabel) {
		try {
			if (fieldName != null && !fieldName.isEmpty()) {
				ObjectMapper mapper = new ObjectMapper();
				boolean isValueList = false;
				TypeReference<List<String>> listTypeRef = new TypeReference<List<String>>(){};
				TypeReference<List<Map<String,Object>>> listMapTypeRef = new TypeReference<List<Map<String,Object>>>(){};
				List<Map<String,Object>> valueListMap = null;
				List<String> valueList = null;
				
				if (reserveKeys.contains(fieldName)) {
					fieldName = reservKeyAppendStr + fieldName;
				}
				
				try {
					//valueListMap = mapper.readValue(jsonNode.traverse(), listMapTypeRef);
					for (int index = 0; index < jsonNode.size(); index++) {
						removeKeysFromNestedNodes(jsonNode.get(index), removeKeys);
					}
					valueListMap = mapper.readValue(jsonNode.traverse(), listMapTypeRef);
					if (valueListMap != null && !valueListMap.isEmpty()) {
						//edge.setProperty(fieldName, valueListMap);
						createVertexesWithUnidirectedEdge(graph, (TitanEdge)edge, fieldName, valueListMap, makeLabel, makeKeys, reserveKeys, makeTitanLabel);
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
						graph.createKeyIndex(fieldName, Edge.class);
						makeKeys.add(fieldName);
					}
					try {
						valueList = mapper.readValue(jsonNode.traverse(), listTypeRef);
						if (valueList != null && !valueList.isEmpty()) {
							edge.setProperty(fieldName, valueList);
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
	 * Create TitanRelationship for titan edge
	 * @param graph
	 * @param titanEdge
	 * @param label
	 * @param valueListMap
	 * @param makeLabel
	 * @param makeKeys
	 * @param makeTitanLabel
	 */
	private void createVertexesWithUnidirectedEdge(TitanGraph graph, TitanEdge titanEdge, String label, List<Map<String, Object>> valueListMap, Set<String> makeLabel, Set<String> makeKeys, Set<String> reserveKeys, Map<String, TitanLabel> makeTitanLabel) {
		TitanLabel titanLabel = null;
		label = label.replaceAll("_", "").replaceAll("\\s", "");
		if (!makeLabel.contains(label)) {
			titanLabel = graph.makeLabel(label).unidirected().manyToOne().make();
			makeLabel.add(label);
			makeTitanLabel.put(label, titanLabel);
		} else {
			titanLabel = makeTitanLabel.get(label);
		}
		
		Set<String> keys = null;
		Vertex vertex = null;
		for (Map<String, Object> element : valueListMap) {
			keys = element.keySet();
			vertex = graph.addVertex(null);
			for (String key : keys) {
				Object value = element.get(key);
				if (reserveKeys.contains(key)) {
					key = "SUBEDG_" + key;
				}
				Object object = setDataTypeAndFormatObject(graph, (TitanVertex)vertex, key, value, makeKeys);
				if (object != null) {
					vertex.setProperty(key, object);
				}
			}
			titanLabel.setProperty("subedge", "true");
			titanEdge.setProperty(titanLabel, (TitanVertex)vertex);
			// titanEdge = titanVertex.addEdge(label, (TitanVertex)vertex);
			//titanEdge.setProperty("subvertexedge", "true");
		}		
		graph.commit();
	}

	/**
	 * This method is used to set data types for keys 
	 * @param graph
	 * @param titanVertex
	 * @param key
	 * @param object
	 * @param makeKeys
	 * @return
	 */
	private Object setDataTypeAndFormatObject(TitanGraph graph, TitanVertex titanVertex, String key, Object object, Set<String> makeKeys) {
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
				//createVertexesWithUnidirectedEdge(graph, titanVertex, key, listMap);
				object = null;
			} catch (Exception e) {
				titanVertex.addProperty(key, object);
			}
			isString = false;
		}
		
		if (object instanceof Map) {
			List<Map<String,Object>> listMap = new ArrayList<Map<String,Object>>(1);
			listMap.add((Map<String,Object>)object);
			//createVertexesWithUnidirectedEdge(graph, titanVertex, key, listMap);
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
	
	/**
	 * Remove unwanted fields from json object
	 * @param jsonNode
	 * @param removeKeys
	 */
	private void removeKeysFromNestedNodes(JsonNode jsonNode, Set<String> removeKeys) {
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

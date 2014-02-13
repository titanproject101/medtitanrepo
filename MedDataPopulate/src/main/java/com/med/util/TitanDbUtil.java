package com.med.util;

import static com.thinkaurelius.titan.graphdb.configuration.GraphDatabaseConfiguration.INDEX_BACKEND_KEY;
import static com.thinkaurelius.titan.graphdb.configuration.GraphDatabaseConfiguration.STORAGE_DIRECTORY_KEY;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.configuration.BaseConfiguration;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import com.thinkaurelius.titan.core.TitanFactory;
import com.thinkaurelius.titan.core.TitanGraph;
import com.thinkaurelius.titan.core.util.TitanCleanup;
import com.thinkaurelius.titan.graphdb.configuration.GraphDatabaseConfiguration;
import com.tinkerpop.blueprints.Edge;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.rexster.client.RexsterClient;
import com.tinkerpop.rexster.client.RexsterClientFactory;
import com.tinkerpop.rexster.client.RexsterClientTokens;

public class TitanDbUtil {
	
	private static TitanDbUtil titanDbUtil = null;
	
	/****offshore****/
	public static final String HOSTNAME =  "192.168.10.204";// "192.168.10.204" "192.168.10.136"
	public static final String ES_INDEX_NAME = "titan"; // "titan" "patient"
	public static final String STORAGE_BACKEND = "cassandra";
	public static final String STORAGE_INDEX_BACKEND = "elasticsearch";
	public static final String STORAGE_CLUSTER_NAME = "MEDGRAPH";
	public static final String GRAPH_NAME = "patientgraph"; // "graph" "patientgraph"
	public static final String KEYSPACE = "patient"; // "titan" "patient"
	
	/**** onsite ****/
	/*public static final String HOSTNAME =  "192.168.0.2";
	public static final String ES_INDEX_NAME = "titan";
	public static final String STORAGE_BACKEND = "cassandra";
	public static final String STORAGE_INDEX_BACKEND = "elasticsearch";
	public static final String GRAPH_NAME = "patientgraph";
	public static final String KEYSPACE = "patient";*/
	
	protected static final Log logger = LogFactory.getLog(TitanDbUtil.class);

	private TitanDbUtil() {
		
	}
	
	public static TitanDbUtil getInstance() {
		if (titanDbUtil == null) {
			titanDbUtil = new TitanDbUtil();
		}
		return titanDbUtil;
	}
	
	public TitanGraph getTitanGraph() {
		Configuration conf	= new BaseConfiguration();
		conf.setProperty("storage.backend",STORAGE_BACKEND);
		conf.setProperty("storage.hostname",HOSTNAME);
		conf.setProperty("storage.keyspace",KEYSPACE);
		//conf.setProperty("storage.port",9160);
		conf.setProperty("storage.batch-loading","true");
		conf.setProperty("storage.index."  + ES_INDEX_NAME + ".backend", STORAGE_INDEX_BACKEND);
		conf.setProperty("storage.index."  + ES_INDEX_NAME + ".hostname", HOSTNAME);
		conf.setProperty("storage.index."  + ES_INDEX_NAME + ".cluster-name", STORAGE_CLUSTER_NAME);
		conf.setProperty("storage.index."  + ES_INDEX_NAME + ".client-only", false);
		conf.setProperty("storage.index."  + ES_INDEX_NAME + ".local-mode", true);
		return TitanFactory.open(conf);
	}
	
	public TitanGraph getTempTitanGraph(String directory) {
		BaseConfiguration config = new BaseConfiguration();
        Configuration storage = config.subset(GraphDatabaseConfiguration.STORAGE_NAMESPACE);
        // configuring local backend
        storage.setProperty(GraphDatabaseConfiguration.STORAGE_BACKEND_KEY, "local");
        storage.setProperty(GraphDatabaseConfiguration.STORAGE_DIRECTORY_KEY, directory);
        // configuring elastic search index
        Configuration index = storage.subset(GraphDatabaseConfiguration.INDEX_NAMESPACE).subset(ES_INDEX_NAME);
        index.setProperty(INDEX_BACKEND_KEY, "elasticsearch");
        index.setProperty("local-mode", true);
        index.setProperty("client-only", false);
        index.setProperty(STORAGE_DIRECTORY_KEY, directory + File.separator + "es");
        
        return TitanFactory.open(config);
	}
	
	/*public RexsterClient getRexsterClient() {
		RexsterClient client = null;
		try {
			client = RexsterClientFactory.open(HOSTNAME, "graph");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return client;
	}*/
	
	public RexsterClient getRexsterClient() {
		  RexsterClient client = null;
		  try {
				 BaseConfiguration conf = new BaseConfiguration() {{
					   addProperty(RexsterClientTokens.CONFIG_HOSTNAME, HOSTNAME);
					   addProperty(RexsterClientTokens.CONFIG_GRAPH_NAME, GRAPH_NAME);
					   addProperty(RexsterClientTokens.CONFIG_TIMEOUT_CONNECTION_MS, 20000);
					   addProperty(RexsterClientTokens.CONFIG_TIMEOUT_READ_MS, 20000);
					   addProperty(RexsterClientTokens.CONFIG_TIMEOUT_WRITE_MS, 20000);
					   addProperty(RexsterClientTokens.CONFIG_MESSAGE_RETRY_WAIT_MS, 0);
				 }};
				 client = RexsterClientFactory.open(conf);
		  } catch (Exception e) {
				 logger.error(e);
		  }
		  return client;
	}
	
	public TitanGraph clearGraph(TitanGraph titanGraph) {
		titanGraph.shutdown();
		TitanCleanup.clear(titanGraph);
		return getTitanGraph();
	}

	public void createKeyIndex(TitanGraph titanGraph, Set<String> indexKeys, Class vertexOrEdgeclazz) {
		for (String key : indexKeys) {
			titanGraph.createKeyIndex(key, vertexOrEdgeclazz);
		}		
	}
	
	public void createStringKeyIndex(TitanGraph titanGraph, Set<String> indexKeys, Class vertexOrEdgeclazz) {
		for (String key : indexKeys) {
			titanGraph.makeKey(key).dataType(String.class).indexed(ES_INDEX_NAME, vertexOrEdgeclazz).make();
		}		
	}
	
	public void createDateKeyIndex(TitanGraph titanGraph, Set<String> indexKeys, Class vertexOrEdgeclazz) {
		for (String key : indexKeys) {
			titanGraph.makeKey(key).dataType(Date.class).indexed(vertexOrEdgeclazz).make();
		}		
	}
	
	public void createDoubleKeyIndex(TitanGraph titanGraph, Set<String> indexKeys, Class vertexOrEdgeclazz) {
		for (String key : indexKeys) {
			titanGraph.makeKey(key).dataType(Double.class).indexed(vertexOrEdgeclazz).make();
		}		
	}
	
	public void createListKeyIndex(TitanGraph titanGraph, Set<String> indexKeys, Class vertexOrEdgeclazz) {
		for (String key : indexKeys) {
			titanGraph.makeKey(key).dataType(ArrayList.class).indexed(ES_INDEX_NAME, vertexOrEdgeclazz).make();
		}		
	}
	
	public void createMapKeyIndex(TitanGraph titanGraph, Set<String> indexKeys, Class vertexOrEdgeclazz) {
		for (String key : indexKeys) {
			titanGraph.makeKey(key).dataType(HashMap.class).indexed(ES_INDEX_NAME, vertexOrEdgeclazz).make();
		}		
	}

	public void makeLabel(TitanGraph patientGraph, Set<String> labelKeys) {
		for (String key : labelKeys) {
			patientGraph.makeLabel(key).make();
		}
	}	
	
	public void createVertexFromJson(TitanGraph graph, String JSON_PATH, String parentNodeKey, Set<String> indexStringKeys, Set<String> indexDateKeys, Set<String> indexListKeys, Set<String> indexListMapKeys, Set<String> indexMapKeys) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode parentNode = null;
			TypeReference<List<String>> listTypeRef = new TypeReference<List<String>>(){};
			TypeReference<List<Map<String,Object>>> listMapTypeRef = new TypeReference<List<Map<String,Object>>>(){};
			TypeReference<Map<String,Object>> mapTypeRef = new TypeReference<Map<String,Object>>(){};
			List<String> valueList = null;
			List<Map<String,Object>> valueListMap = null;
			Map<String,Object> map = null;
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
				// JSON Nodes
				parentNode = mapper.readValue(jsonFile, JsonNode.class).get(parentNodeKey);
			
				// Titan Vertexes
				Vertex vertex = graph.addVertex(jsonFile.getName().replace(".json", ""));
				JsonNode jsonNode = null;
				
				// String properties
				for (String key : indexStringKeys) {
					jsonNode = parentNode.get(key);
					if (jsonNode != null && !jsonNode.isNull() && !jsonNode.getTextValue().isEmpty()) {
						vertex.setProperty(key, jsonNode.getTextValue());
					}
				}
				
				// Date properties
				for (String key : indexDateKeys) {
					jsonNode = parentNode.get(key);
					if (jsonNode != null && !jsonNode.isNull()) {
						vertex.setProperty(key, this.generateDate(jsonNode.getTextValue()));
					}
				}
				
				// List Properties 
				for (String key : indexListKeys) {
					jsonNode = parentNode.get(key);
					if (jsonNode != null && !jsonNode.isNull() && jsonNode.isArray()) {
						valueList = mapper.readValue(jsonNode.traverse(), listTypeRef);
						if (valueList != null && !valueList.isEmpty()) {
							vertex.setProperty(key, valueList);
						}
					}
				}
				
				// List-Map Properties 
				for (String key : indexListMapKeys) {
					jsonNode = parentNode.get(key);
					if (jsonNode != null && !jsonNode.isNull() && jsonNode.isArray()) {
						valueListMap = mapper.readValue(jsonNode.traverse(), listMapTypeRef);
						if (valueListMap != null && !valueListMap.isEmpty()) {
							vertex.setProperty(key, valueListMap);
						}
					}
				}	
				
				// Map Properties 
				for (String key : indexMapKeys) {
					jsonNode = parentNode.get(key);
					if (jsonNode != null && !jsonNode.isNull() && !jsonNode.isArray()) {
						map = mapper.readValue(jsonNode.toString(), mapTypeRef);
						if (map != null && !map.isEmpty()) {
							vertex.setProperty(key, map);
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
	
	
	
	public void addEdgeJson(TitanGraph graph, JsonNode parentNode, Vertex fromVertex, Vertex toVertex, String edgeLabel, Set<String> indexStringKeys, Set<String> indexDateKeys, Set<String> indexListKeys, Set<String> indexListMapKeys, Set<String> indexMapKeys) {
		try {
			ObjectMapper mapper = new ObjectMapper();
			TypeReference<List<String>> listTypeRef = new TypeReference<List<String>>(){};
			TypeReference<List<Map<String,Object>>> listMapTypeRef = new TypeReference<List<Map<String,Object>>>(){};
			TypeReference<Map<String,Object>> mapTypeRef = new TypeReference<Map<String,Object>>(){};
			List<String> valueList = null;
			List<Map<String,Object>> valueListMap = null;
			Map<String,Object> map = null;
			
			graph.makeLabel(edgeLabel).make();
			
			// Titan Vertexes
			Edge edge = graph.addEdge(null, fromVertex, toVertex, edgeLabel);
			JsonNode jsonNode = null;
			
			// String properties
			if (indexStringKeys != null && !indexStringKeys.isEmpty()) {
				for (String key : indexStringKeys) {
					jsonNode = parentNode.get(key);
					if (jsonNode != null && !jsonNode.isNull() && !jsonNode.getTextValue().isEmpty()) {
						edge.setProperty(key, jsonNode.getTextValue());
					}
				}
			}
			
			// Date properties
			if (indexDateKeys != null && !indexDateKeys.isEmpty()) {
				for (String key : indexDateKeys) {
					jsonNode = parentNode.get(key);
					if (jsonNode != null && !jsonNode.isNull()) {
						edge.setProperty(key, this.generateDate(jsonNode.getTextValue()));
					}
				}
			}
			
			// List Properties 
			if (indexListKeys != null && !indexListKeys.isEmpty()) {
				for (String key : indexListKeys) {
					jsonNode = parentNode.get(key);
					if (jsonNode != null && !jsonNode.isNull() && jsonNode.isArray()) {
						valueList = mapper.readValue(jsonNode.traverse(), listTypeRef);
						if (valueList != null && !valueList.isEmpty()) {
							edge.setProperty(key, valueList);
						}
					}
				}
			}
			
			// List-Map Properties 
			if (indexListMapKeys != null && !indexListMapKeys.isEmpty()) {
				for (String key : indexListMapKeys) {
					jsonNode = parentNode.get(key);
					if (jsonNode != null && !jsonNode.isNull() && jsonNode.isArray()) {
						valueListMap = mapper.readValue(jsonNode.traverse(), listMapTypeRef);
						if (valueListMap != null && !valueListMap.isEmpty()) {
							edge.setProperty(key, valueListMap);
						}
					}
				}
			}
			
			// Map Properties 
			if (indexMapKeys != null && !indexMapKeys.isEmpty()) {
				for (String key : indexMapKeys) {
					jsonNode = parentNode.get(key);
					if (jsonNode != null && !jsonNode.isNull() && !jsonNode.isArray()) {
						map = mapper.readValue(jsonNode.toString(), mapTypeRef);
						if (map != null && !map.isEmpty()) {
							edge.setProperty(key, map);
						}
					}
				}
			}
			
			graph.commit();
				
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public Date generateDate(String dateString) {
		Set<String> dateFormats = new HashSet<String>(5);
		dateFormats.add("MM/dd/yyyy");
		//dateFormats.add("yyyyMMdd");
		dateFormats.add("yyyy-MM-dd");
		SimpleDateFormat dateFormat = null;
		for (String format : dateFormats) {
			dateFormat = new SimpleDateFormat(format);
			try {
				return dateFormat.parse(dateString);
			} catch (ParseException e) {
				
			}
		}
		try {
			return new Date(Long.parseLong(dateString));
		} catch(NumberFormatException e) {
			
		}	
		return null;
	}
}

package com.med.util;

import static com.thinkaurelius.titan.graphdb.configuration.GraphDatabaseConfiguration.INDEX_BACKEND_KEY;
import static com.thinkaurelius.titan.graphdb.configuration.GraphDatabaseConfiguration.STORAGE_DIRECTORY_KEY;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.apache.commons.configuration.BaseConfiguration;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.thinkaurelius.titan.core.TitanFactory;
import com.thinkaurelius.titan.core.TitanGraph;
import com.thinkaurelius.titan.core.util.TitanCleanup;
import com.thinkaurelius.titan.graphdb.configuration.GraphDatabaseConfiguration;
import com.tinkerpop.rexster.client.RexsterClient;
import com.tinkerpop.rexster.client.RexsterClientFactory;
import com.tinkerpop.rexster.client.RexsterClientTokens;

public class TitanDbUtil {
	
	private static TitanDbUtil titanDbUtil = null;
	
	/****offshore****/
	public static final String HOSTNAME =  "127.0.0.1";// "192.168.10.204" "192.168.10.136"
	public static final String ES_INDEX_NAME = "titan"; // "titan" "patient"
	private static final String ES_DIR_PATH = "/root/titan/MED/db/es";//"D:\\softwares\\TitanDB\\installations\\apache-cassandra-2.0.5\\db\\es";
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
	
	/**
	 * This method is used to get instance of TitanDbUtil
	 * @return
	 */
	public static TitanDbUtil getInstance() {
		if (titanDbUtil == null) {
			titanDbUtil = new TitanDbUtil();
		}
		return titanDbUtil;
	}
	
	/**
	 * This method is used to get TitanGraph
	 * @return TitanGraph
	 */
	public TitanGraph getTitanGraph() {
		Configuration conf	= new BaseConfiguration();
		conf.setProperty("storage.backend",STORAGE_BACKEND);
		conf.setProperty("storage.hostname",HOSTNAME);
		conf.setProperty("storage.keyspace",KEYSPACE);
		//conf.setProperty("storage.port",9160);
		//conf.setProperty("storage.batch-loading","true");
		conf.setProperty("storage.index."  + ES_INDEX_NAME + ".directory", ES_DIR_PATH);
		conf.setProperty("storage.index."  + ES_INDEX_NAME + ".backend", STORAGE_INDEX_BACKEND);
		//conf.setProperty("storage.index."  + ES_INDEX_NAME + ".hostname", HOSTNAME);
		conf.setProperty("storage.index."  + ES_INDEX_NAME + ".cluster-name", STORAGE_CLUSTER_NAME);
		conf.setProperty("storage.index."  + ES_INDEX_NAME + ".client-only", false);
		conf.setProperty("storage.index."  + ES_INDEX_NAME + ".local-mode", true);
		return TitanFactory.open(conf);
	}
	
	/**
	 * This method is used to create titan graph in directory
	 * @param directory
	 * @return TitanGraph
	 */
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
	
	
	/**
	 * This method is used to RexsterClient
	 * @return
	 */
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
	
	/**
	 * This method is used to clear TitanGraph
	 * @param titanGraph
	 * @return
	 */
	public TitanGraph clearGraph(TitanGraph titanGraph) {
		titanGraph.shutdown();
		TitanCleanup.clear(titanGraph);
		return getTitanGraph();
	}

	/**
	 * 	This method is used to generateDate
	 * @param dateString
	 * @return
	 */
	public Date generateDate(String dateString) {
		Set<String> dateFormats = new HashSet<String>(5);
		dateFormats.add("MM/dd/yyyy");
		//dateFormats.add("yyyyMMdd");
		dateFormats.add("yyyy-MM-dd");
		dateFormats.add("MMM dd, yyyy");
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

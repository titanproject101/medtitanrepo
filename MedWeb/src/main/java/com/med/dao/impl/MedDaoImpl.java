package com.med.dao.impl;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.apache.commons.configuration.BaseConfiguration;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.ImmutableSettings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.stereotype.Component;

import com.med.dao.MedDao;
import com.thinkaurelius.titan.core.TitanFactory;
import com.thinkaurelius.titan.core.TitanGraph;
import com.tinkerpop.rexster.client.RexsterClient;
import com.tinkerpop.rexster.client.RexsterClientFactory;
import com.tinkerpop.rexster.client.RexsterClientTokens;

@Component
public class MedDaoImpl implements MedDao {
	
	//private static TitanDbUtil titanDbUtil = null;
	
	/****offshore****/
	/*private static final String HOSTNAME =  "192.168.10.204";// "192.168.10.204" "192.168.10.136"
	private static final String ES_INDEX_NAME = "titan"; // "titan" "patient"
	private static final String STORAGE_BACKEND = "cassandra";
	private static final String STORAGE_INDEX_BACKEND = "elasticsearch";
	private static final String STORAGE_CLUSTER_NAME = "MEDGRAPH";
	private static final String GRAPH_NAME = "patientgraph"; // "graph" "patientgraph"
	private static final String KEYSPACE = "patient"; // "titan" "patient"
*/	
	/**** onsite ****/
	private static final String HOSTNAME =  "127.0.0.1";
	private static final String ES_INDEX_NAME = "titan";
	private static final String STORAGE_BACKEND = "cassandra";
	private static final String STORAGE_INDEX_BACKEND = "elasticsearch";
	private static final String STORAGE_CLUSTER_NAME = "MEDGRAPH";
	private static final String GRAPH_NAME = "patientgraph";
	private static final String KEYSPACE = "patient";
	
	private RexsterClient client = null;
	private TransportClient esClient = null;
	private static TitanGraph titanGraph = null;
	@SuppressWarnings("restriction")
	private static ScriptEngine scriptEngine = null;
	
	protected static final Log logger = LogFactory.getLog(MedDaoImpl.class);

	/**
	 * This method is used to get RexsterClient
	 * @return RexsterClient
	 */
	public RexsterClient getRexsterClient() {
		if(client == null){
			try {
				 BaseConfiguration conf = new BaseConfiguration() {{
					   addProperty(RexsterClientTokens.CONFIG_HOSTNAME, HOSTNAME);
					   addProperty(RexsterClientTokens.CONFIG_GRAPH_NAME, GRAPH_NAME);
					   addProperty(RexsterClientTokens.CONFIG_TIMEOUT_CONNECTION_MS, 6000000);
					   addProperty(RexsterClientTokens.CONFIG_TIMEOUT_READ_MS, 6000000);
					   addProperty(RexsterClientTokens.CONFIG_TIMEOUT_WRITE_MS, 6000000);
					   addProperty(RexsterClientTokens.CONFIG_MESSAGE_RETRY_WAIT_MS, 0);
				 }};
				 client = RexsterClientFactory.open(conf);
		  } catch (Exception e) {
				 logger.error(e);
		  }
		}		  
		return client;
	}

	/**
	 * This method is used to get Elastic Search Client
	 * @return Client
	 */
	public Client getESConnection() {
		if(esClient == null){
			esClient = new TransportClient(ImmutableSettings.settingsBuilder()
	                .put("cluster.name", STORAGE_CLUSTER_NAME)
	                .build())
	                .addTransportAddress(new InetSocketTransportAddress(HOSTNAME, 9300));
		}
		return esClient;
	}

	/**
	 * This method is used to get Elastic Search SearchRequestBuilder
	 * @return SearchRequestBuilder
	 */
	public SearchRequestBuilder getESSearchRequestBuilder() {
		Client client = getESConnection();
		SearchRequestBuilder requestBuilder = new SearchRequestBuilder(client)
		.setQuery(QueryBuilders.matchAllQuery())
		.setIndices(ES_INDEX_NAME)
		.setSize(1);
		return requestBuilder;
	}

	/**
	 * This method is used to get TitanGraph connection
	 * @return TitanGraph
	 */
	public TitanGraph getTitanGraph() {
		if(titanGraph == null) {
			try {
				Configuration conf	= new BaseConfiguration();
				conf.setProperty("storage.backend",STORAGE_BACKEND);
				conf.setProperty("storage.hostname",HOSTNAME);
				conf.setProperty("storage.keyspace",KEYSPACE);
				conf.setProperty("storage.batch-loading","true");
				conf.setProperty("storage.index."  + ES_INDEX_NAME + ".backend", STORAGE_INDEX_BACKEND);
				conf.setProperty("storage.index."  + ES_INDEX_NAME + ".hostname", HOSTNAME);
				conf.setProperty("storage.index."  + ES_INDEX_NAME + ".cluster-name", STORAGE_CLUSTER_NAME);
				conf.setProperty("storage.index."  + ES_INDEX_NAME + ".client-only", false);
				conf.setProperty("storage.index."  + ES_INDEX_NAME + ".local-mode", false);
				titanGraph = TitanFactory.open(conf);
			} catch (Exception e) {
				 logger.error(e);
			}
		}
		return titanGraph;
	}

	@SuppressWarnings("restriction")
	public ScriptEngine getScriptEngine() {
		if (scriptEngine == null) {
			ScriptEngineManager manager = new ScriptEngineManager();
            scriptEngine = manager.getEngineByName("gremlin-groovy");
        }
		return scriptEngine;
	}		
}

package com.med.dao.impl;

import org.apache.commons.configuration.BaseConfiguration;
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
import com.tinkerpop.rexster.client.RexsterClient;
import com.tinkerpop.rexster.client.RexsterClientFactory;
import com.tinkerpop.rexster.client.RexsterClientTokens;

@Component
public class MedDaoImpl implements MedDao {
	
	//private static TitanDbUtil titanDbUtil = null;
	
	/****offshore****/
	private static final String HOSTNAME =  "192.168.10.204";// "192.168.10.204" "192.168.10.136"
	private static final String ES_INDEX_NAME = "titan"; // "titan" "patient"
	private static final String STORAGE_BACKEND = "cassandra";
	private static final String STORAGE_INDEX_BACKEND = "elasticsearch";
	private static final String STORAGE_CLUSTER_NAME = "MEDGRAPH";
	private static final String GRAPH_NAME = "patientgraph"; // "graph" "patientgraph"
	private static final String KEYSPACE = "patient"; // "titan" "patient"
	
	/**** onsite ****/
	/*private static final String HOSTNAME =  "192.168.0.2";
	private static final String ES_INDEX_NAME = "titan";
	private static final String STORAGE_BACKEND = "cassandra";
	private static final String STORAGE_INDEX_BACKEND = "elasticsearch";
	private static final String STORAGE_CLUSTER_NAME = "MEDGRAPH";
	private static final String GRAPH_NAME = "patientgraph";
	private static final String KEYSPACE = "patient";*/
	
	private RexsterClient client = null;
	private TransportClient esClient = null;
	
	protected static final Log logger = LogFactory.getLog(MedDaoImpl.class);

	public RexsterClient getRexsterClient() {
		if(client == null){
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
		}		  
		return client;
	}

	public Client getESConnection() {
		if(esClient == null){
			esClient = new TransportClient(ImmutableSettings.settingsBuilder()
	                .put("cluster.name", STORAGE_CLUSTER_NAME)
	                .build())
	                .addTransportAddress(new InetSocketTransportAddress(HOSTNAME, 9300));
		}
		return esClient;
	}

	public SearchRequestBuilder getESSearchRequestBuilder() {
		Client client = getESConnection();
		SearchRequestBuilder requestBuilder = new SearchRequestBuilder(client)
		.setQuery(QueryBuilders.matchAllQuery())
		.setIndices(ES_INDEX_NAME)
		.setSize(1);
		return requestBuilder;
	}		
}

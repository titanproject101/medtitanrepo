package com.med.dao;

import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.client.Client;

import com.tinkerpop.rexster.client.RexsterClient;

public interface MedDao {
	
	/**
	 * This method is used to get RexsterClient
	 * @return RexsterClient
	 */
	public RexsterClient getRexsterClient();
	
	/**
	 * This method is used to get Elastic Search Client
	 * @return Client
	 */
	public Client getESConnection();
	
	/**
	 * This method is used to get Elastic Search SearchRequestBuilder
	 * @return SearchRequestBuilder
	 */
	public SearchRequestBuilder getESSearchRequestBuilder();
}

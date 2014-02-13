package com.med.dao;

import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.client.Client;

import com.tinkerpop.rexster.client.RexsterClient;

public interface MedDao {
	
	public RexsterClient getRexsterClient();
	
	public Client getESConnection();
	
	public SearchRequestBuilder getESSearchRequestBuilder();
}

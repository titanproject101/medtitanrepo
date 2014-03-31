package com.med.service.app;

import javax.script.ScriptEngine;

import com.thinkaurelius.titan.core.TitanGraph;

public interface MedService {
	
	/**
	 * Get total vertices count
	 * @return int
	 */
	public long getVerticesCount();
	
	/**
	 * Get total edges count
	 * @return int
	 */
	public long getEdgesCount();
	
	/**
	 * This method is used to get TitanGraph connection
	 * @return TitanGraph
	 */
	public TitanGraph getTitanGraph();
	
	/**
	 * This method is used to get ScriptEngine
	 * @return ScriptEngine
	 */
	@SuppressWarnings("restriction")
	public ScriptEngine getScriptEngine();
}

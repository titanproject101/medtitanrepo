package com.med.test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.apache.commons.configuration.BaseConfiguration;
import org.apache.commons.configuration.Configuration;

import com.med.util.TitanDbUtil;
import com.thinkaurelius.titan.core.TitanFactory;
import com.thinkaurelius.titan.core.TitanGraph;
import com.thinkaurelius.titan.core.TitanKey;
import com.tinkerpop.blueprints.Vertex;
import com.tinkerpop.rexster.client.RexProException;
import com.tinkerpop.rexster.client.RexsterClient;

public class TestTitan {

	public static void main(String[] args) {
		long startTime = new Date().getTime();
		TestTitan testTitan = new TestTitan();
		//testTitan.testTitanQuery();
		//testTitan.testRexsterQuery();
		testTitan.testTitanCassandraQuery();
		long endTime = new Date().getTime(); // end time
		calculateTimeForExecution(endTime - startTime);
	}
	
	private void testTitanCassandraQuery() {
		System.out.println("testTitanCassandraQuery()");
		Configuration conf = new BaseConfiguration();
		conf.setProperty("storage.backend","cassandra");
		conf.setProperty("storage.hostname","127.0.0.1");
		//conf.setProperty("storage.keyspace","titan");
		TitanGraph graph = TitanFactory.open(conf);
		
		/*Iterator<Vertex> iterator = graph.getVertices().iterator();
		while (iterator.hasNext()) {
			Vertex vertex = (Vertex) iterator.next();
			System.out.println(vertex);
		}*/
		Iterator<TitanKey> keys = graph.getTypes(TitanKey.class).iterator();
		List<String> keyNames = new ArrayList<String>();
		int count = 0;
		while (keys.hasNext()) {
			TitanKey titanKey = (TitanKey) keys.next();
			keyNames.add(titanKey.getName());
			count++;
		}
		System.out.println("keys count : " + count);
		System.out.println("keys : " + keyNames);
	}

	private void testRexsterQuery() {
		try {
			System.out.println("testRexsterQuery()");
			RexsterClient rexsterClient = TitanDbUtil.getInstance().getRexsterClient();
			List vertices = rexsterClient.execute("g.V.has('GRAPHUNIQUEKEY','hypertension')");
			System.out.println("Vertices count : " + vertices.size());
			for (Object object : vertices) {
				System.out.println(object);
			}
		} catch (RexProException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void testTitanQuery() {
		//TitanGraph graph  = TitanDbUtil.getInstance().getTitanGraph();
		TitanGraph graph  = TitanFactory.open("/root/titan/titan-server-0.4.1/conf/titan-cassandra-embedded.properties");
		Iterator<TitanKey> keys = graph.getTypes(TitanKey.class).iterator();
		List<String> keyNames = new ArrayList<String>();
		int count = 0;
		while (keys.hasNext()) {
			TitanKey titanKey = (TitanKey) keys.next();
			keyNames.add(titanKey.getName());
			count++;
		}
		System.out.println("keys count : " + count);
		System.out.println("keys : " + keyNames);
		/*Iterator<Vertex> iterator = graph.getVertices("GRAPHUNIQUEKEY", "hypertension").iterator();
		while (iterator.hasNext()) {
			Vertex vertex = (Vertex) iterator.next();
			System.out.println("collection : " + vertex.getProperty("collection"));
			
		}*/
		//graph.shutdown();
	}
	
	private static void calculateTimeForExecution(long miliseconds) {
		System.out.println("**********************calculateTimeForExecution*******************");
		String time = String.format("%d hrs, %d min, %d sec", TimeUnit.MILLISECONDS.toHours(miliseconds) ,TimeUnit.MILLISECONDS.toMinutes(miliseconds), TimeUnit.MILLISECONDS.toSeconds(miliseconds) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(miliseconds)));
		System.out.println("Total Time of execution : " + time);
	}
}

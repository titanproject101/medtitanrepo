package com.med.model;

import java.util.HashSet;
import java.util.Set;

import com.med.util.TitanDbUtil;
import com.thinkaurelius.titan.core.TitanGraph;
import com.tinkerpop.blueprints.Vertex;

public class SymptomModel {
	
	private static String SYMPTOM_JSON_PATH = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\sample\\symptom";
	private static Set<String> indexStringKeys = new HashSet<String>();
	private static Set<String> indexDateKeys = new HashSet<String>();
	private static Set<String> indexListKeys = new HashSet<String>();
	private static Set<String> indexListMapKeys = new HashSet<String>();
	private static Set<String> indexMapKeys = new HashSet<String>();
	
	public static void main(String[] args) {
		SymptomModel symptomModel = new SymptomModel();
		TitanGraph graph  = TitanDbUtil.getInstance().getTitanGraph();
		//TitanDbUtil.getInstance().clearGraph(graph);
		symptomModel.createPropertyKeyIndex(graph);
		TitanDbUtil.getInstance().createVertexFromJson(graph, SYMPTOM_JSON_PATH, "SMARTSYMPTOM", indexStringKeys, indexDateKeys, indexListKeys, indexListMapKeys, indexMapKeys);
	}

	private void createPropertyKeyIndex(TitanGraph graph) {
		indexStringKeys.add("**DATATYPE**");
		indexStringKeys.add("**GRAPHUNIQUEKEY**");
		indexStringKeys.add("**ID**");
		indexStringKeys.add("abstract");
		indexStringKeys.add("collection");
		indexStringKeys.add("description");
		indexStringKeys.add("detailedexp");
		indexStringKeys.add("disable");
		indexStringKeys.add("emergency");
		indexStringKeys.add("emergentcare");
		indexStringKeys.add("fuzzydate");
		indexStringKeys.add("gender");
		indexStringKeys.add("infolink");
		indexStringKeys.add("isbinary");
		indexStringKeys.add("iscommon");
		indexStringKeys.add("issign");
		indexStringKeys.add("keyconcepts");
		indexStringKeys.add("laymanlabel");
		indexStringKeys.add("liklihood");
		indexStringKeys.add("mainconcepts");
		indexStringKeys.add("medlinehomecare");
		indexStringKeys.add("minesilevel");
		indexStringKeys.add("mustcritical");
		indexStringKeys.add("mustcritical1day");
		indexStringKeys.add("name");
		indexStringKeys.add("potentialcritical");
		indexStringKeys.add("potentialcritical1day");
		indexStringKeys.add("referencesource");
		indexStringKeys.add("rev");
		indexStringKeys.add("summary");
		indexStringKeys.add("symptom");
		indexStringKeys.add("title");		
		TitanDbUtil.getInstance().createStringKeyIndex(graph, indexStringKeys, Vertex.class);			
		/**-------------------------------------------------------------------------------------------------------*/
		
		indexDateKeys.add("adddate");
		indexDateKeys.add("effectivedate");
		indexDateKeys.add("moddate");
		TitanDbUtil.getInstance().createDateKeyIndex(graph, indexDateKeys, Vertex.class);	
		
		/**-------------------------------------------------------------------------------------------------------*/

		indexListKeys.add("adwords");
		indexListKeys.add("asktoflip");
		indexListKeys.add("category");
		indexListKeys.add("diagcategory");
		indexListKeys.add("linkedsymptoms");
		indexListKeys.add("linkedsymptoms2");
		indexListKeys.add("seasonal");
		indexListKeys.add("severity_xaxis");
		indexListKeys.add("severity_yaxis");
		indexListKeys.add("superset");
		indexListKeys.add("synonyms");
		TitanDbUtil.getInstance().createKeyIndex(graph, indexListKeys, Vertex.class);

		/**-------------------------------------------------------------------------------------------------------*/
		indexListMapKeys.add("severity_matrix"); // TBD 
		TitanDbUtil.getInstance().createKeyIndex(graph, indexListMapKeys, Vertex.class);
		
		/**-------------------------------------------------------------------------------------------------------*/
		indexMapKeys.add("severity_matrix"); // TBD 
		indexMapKeys.add("concepthash");
		TitanDbUtil.getInstance().createKeyIndex(graph, indexMapKeys, Vertex.class);
	}
}

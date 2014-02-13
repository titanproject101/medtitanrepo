package com.med.model;

import java.util.HashSet;
import java.util.Set;

import com.med.util.TitanDbUtil;
import com.thinkaurelius.titan.core.TitanGraph;
import com.tinkerpop.blueprints.Vertex;



public class DiagnosisModel {
	
	private static String DIAGNOSIS_JSON_PATH = "D:\\softwares\\TitanDB\\testdata\\MEDDATA\\sample\\diagnosis";
	private static Set<String> indexStringKeys = new HashSet<String>();
	private static Set<String> indexDateKeys = new HashSet<String>();
	private static Set<String> indexListKeys = new HashSet<String>();
	private static Set<String> indexListMapKeys = new HashSet<String>();
	private static Set<String> indexMapKeys = new HashSet<String>();
	
	public static void main(String[] args) {
		DiagnosisModel diagnosisModel = new DiagnosisModel();
		TitanGraph graph  = TitanDbUtil.getInstance().getTitanGraph();
		//TitanDbUtil.getInstance().clearGraph(graph);
		diagnosisModel.createDiagnosisPropertyKeyIndex(graph);
		TitanDbUtil.getInstance().createVertexFromJson(graph, DIAGNOSIS_JSON_PATH, "DIAGNOSISDEF", indexStringKeys, indexDateKeys, indexListKeys, indexListMapKeys, indexMapKeys);
	}

	private void createDiagnosisPropertyKeyIndex(TitanGraph graph) {
		indexStringKeys.add("**DATATYPE**");
		indexStringKeys.add("**GRAPHUNIQUEKEY**");
		indexStringKeys.add("PrevalenceAfrica");
		indexStringKeys.add("PrevalenceAustralia");
		indexStringKeys.add("PrevalenceCentralAmerica");
		indexStringKeys.add("PrevalenceEasternAsia");
		indexStringKeys.add("PrevalenceEurope");
		indexStringKeys.add("PrevalenceMiddleEast");
		indexStringKeys.add("PrevalenceNortheastUS");
		indexStringKeys.add("PrevalenceNorthernAsia");
		indexStringKeys.add("PrevalenceOtherUS");
		indexStringKeys.add("PrevalencePacificIslands");
		indexStringKeys.add("PrevalenceSouthAmerica");
		indexStringKeys.add("PrevalenceSouthAsia");
		indexStringKeys.add("PrevalenceSoutheastUS");
		indexStringKeys.add("PrevalenceSoutheasternAsia");
		indexStringKeys.add("PrevalenceSouthwestUS");
		indexStringKeys.add("abstract");
		indexStringKeys.add("beforeyougo");
		indexStringKeys.add("chronicacute");
		indexStringKeys.add("collection");
		indexStringKeys.add("definition");
		indexStringKeys.add("detailedexp");
		indexStringKeys.add("downstreamsources");
		indexStringKeys.add("diagnosis");
		indexStringKeys.add("duetoinjury");
		indexStringKeys.add("emergency");
		indexStringKeys.add("exclusionduration");
		indexStringKeys.add("familialhistory");
		indexStringKeys.add("fuzzydate");
		indexStringKeys.add("gender");
		indexStringKeys.add("generalprevalence");
		indexStringKeys.add("gpinfantoverride");
		//indexStringKeys.add("id"); RESERVED
		indexStringKeys.add("infantend");
		indexStringKeys.add("infantoverride");
		indexStringKeys.add("infantstart");
		indexStringKeys.add("infolink");
		indexStringKeys.add("keyconcepts");
		// indexStringKeys.add("label"); RESERVED
		indexStringKeys.add("mainconcepts");
		indexStringKeys.add("name");
		indexStringKeys.add("only2wto2m");
		indexStringKeys.add("onlyless2w");
		indexStringKeys.add("prevalenceinfo");
		indexStringKeys.add("referencesource");
		indexStringKeys.add("rev");
		indexStringKeys.add("rootdiagnosis");
		indexStringKeys.add("std");
		indexStringKeys.add("summary");
		indexStringKeys.add("specialists");
		indexStringKeys.add("subjectiveprevalence");
		indexStringKeys.add("title");
		indexStringKeys.add("usefortriage");
		indexStringKeys.add("underdiagnosessources");
		indexStringKeys.add("wikiname");
		indexStringKeys.add("youtube");
		TitanDbUtil.getInstance().createStringKeyIndex(graph, indexStringKeys, Vertex.class);	
		
		/**-------------------------------------------------------------------------------------------------------*/
		indexDateKeys.add("adddate");
		indexDateKeys.add("effectivedate");
		indexDateKeys.add("moddate");
		TitanDbUtil.getInstance().createDateKeyIndex(graph, indexDateKeys, Vertex.class);	
		
		/**-------------------------------------------------------------------------------------------------------*/

		indexListKeys.add("autoicd9");
		indexListKeys.add("adwords");
		indexListKeys.add("category");
		indexListKeys.add("chronic");
		indexListKeys.add("chronichomecare");
		indexListKeys.add("doctorspeciality");
		indexListKeys.add("downstream");
		indexListKeys.add("drugs");
		indexListKeys.add("emlevels");
		indexListKeys.add("ethnicity");
		indexListKeys.add("excludesymptoms");
		indexListKeys.add("factors");
		indexListKeys.add("homecare");
		indexListKeys.add("icd10");
		indexListKeys.add("icd9");
		indexListKeys.add("lifestyles");
		indexListKeys.add("otcdrugs");
		indexListKeys.add("procedures");
		indexListKeys.add("regionalprevalence");
		indexListKeys.add("relateddiagnoseslist");
		indexListKeys.add("resourcelinks");
		indexListKeys.add("seasonal");
		indexListKeys.add("speciality");
		indexListKeys.add("severity_xaxis");
		indexListKeys.add("severity_yaxis");
		indexListKeys.add("subdiagnoses");
		indexListKeys.add("synonyms");
		indexListKeys.add("underdiagnoses");
		
		TitanDbUtil.getInstance().createKeyIndex(graph, indexListKeys, Vertex.class);

		/**-------------------------------------------------------------------------------------------------------*/
		indexListMapKeys.add("OLDaggregateageprevalence");
		indexListMapKeys.add("OLDaggregatedurationprevalence");
		indexListMapKeys.add("aggregateageprevalence");
		indexListMapKeys.add("aggregatedurationprevalence");
		indexListMapKeys.add("associatedprocdata");
		indexListMapKeys.add("coocurance");
		indexListMapKeys.add("downstreamdetailmap");
		indexListMapKeys.add("prevalencematrix");
		indexListMapKeys.add("prevalencematrixauto");
		indexListMapKeys.add("relateddiagnoses");
		indexListMapKeys.add("underdiagnosesdetailmap");
		indexListMapKeys.add("highriskclassification");
		indexListMapKeys.add("highrisktherapy");
		indexListMapKeys.add("highriskmonitoring");
		indexListMapKeys.add("itherapy");
		indexListMapKeys.add("preclassification");
		indexListMapKeys.add("pretherapy");
		indexListMapKeys.add("severity_matrix"); // TBD dont know map or list as two diff json files has diff formats for severity_matrix
		TitanDbUtil.getInstance().createKeyIndex(graph, indexListMapKeys, Vertex.class);
		
		/**-------------------------------------------------------------------------------------------------------*/
		indexMapKeys.add("severity_matrix"); // TBD dont know map or list as two diff json files has diff formats for severity_matrix
		indexMapKeys.add("concepthash");
		TitanDbUtil.getInstance().createKeyIndex(graph, indexMapKeys, Vertex.class);
	}
}

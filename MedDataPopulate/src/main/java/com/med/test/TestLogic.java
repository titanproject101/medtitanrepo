package com.med.test;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

public class TestLogic {
	
	private static String DIAGNOSIS_JSON_PATH = "D:\\Softwares\\TitanDB\\testdata\\MEDGLE\\newdata\\sample\\diagnosis";
	private static Set<String> indexStringKeys = new HashSet<String>();
	private static Set<String> indexDateKeys = new HashSet<String>();
	private static Set<String> indexListKeys = new HashSet<String>();
	private static Set<String> indexListMapKeys = new HashSet<String>();
	private static Set<String> indexMapKeys = new HashSet<String>();
	
	public static void main(String[] args) {
		TestLogic diagnosisModel = new TestLogic();
		diagnosisModel.createDiagnosisPropertyKeyIndex();
		diagnosisModel.createDiagnosisVertex();
	}

	private void createDiagnosisPropertyKeyIndex() {
		
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
		indexStringKeys.add("id");
		indexStringKeys.add("infantend");
		indexStringKeys.add("infantoverride");
		indexStringKeys.add("infantstart");
		indexStringKeys.add("infolink");
		indexStringKeys.add("keyconcepts");
		indexStringKeys.add("label");
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
		
		/**-------------------------------------------------------------------------------------------------------*/
		indexDateKeys.add("adddate");
		indexDateKeys.add("effectivedate");
		indexDateKeys.add("moddate");
		
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
		indexListMapKeys.add("highriskmonitoring");
		indexListMapKeys.add("highrisktherapy");
		indexListMapKeys.add("itherapy");
		indexListMapKeys.add("preclassification");
		indexListMapKeys.add("pretherapy");
		
		/**-------------------------------------------------------------------------------------------------------*/
		
		indexMapKeys.add("severity_matrix");
		
		/**-------------------------------------------------------------------------------------------------------*/
	}
	
	private void createDiagnosisVertex() {
		try {
			ObjectMapper mapper = new ObjectMapper();
			JsonNode diagnosisNode = null;
			TypeReference<List<String>> listTypeRef = new TypeReference<List<String>>(){};
			TypeReference<List<Map<String,Object>>> listMapTypeRef = new TypeReference<List<Map<String,Object>>>(){};
			TypeReference<Map<String,Object>> mapTypeRef = new TypeReference<Map<String,Object>>(){};
			List<String> valueList = null;
			List<Map<String,Object>> valueListMap = null;
			Map<String, String> valueMap = null;
			// Read all files
			File dir = new File(DIAGNOSIS_JSON_PATH);
			File [] files = dir.listFiles(new FilenameFilter() {
			    public boolean accept(File dir, String name) {
			        return name.endsWith(".json");
			    }
			});
			// Create Graph
			for (File jsonFile : files) {
				System.out.println("Reading File >> " + jsonFile);
				// JSON Nodes
				diagnosisNode = mapper.readValue(jsonFile, JsonNode.class).get("DIAGNOSISDEF");
				JsonNode jsonNode = null;
				
				// String properties
				for (String key : indexStringKeys) {
					//System.out.println("Key " + key);
					jsonNode = diagnosisNode.get(key);
					if (jsonNode != null && !jsonNode.isNull() && !jsonNode.getTextValue().isEmpty()) {
						jsonNode.getTextValue();
					}
				}
				
				// Date properties
				for (String key : indexDateKeys) {
					//System.out.println("Key " + key);
					jsonNode = diagnosisNode.get(key);
					if (jsonNode != null && !jsonNode.isNull()) {
						jsonNode.getTextValue();
					}
				}
				
				// List Properties 
				for (String key : indexListKeys) {
					//System.out.println("Key " + key);
					jsonNode = diagnosisNode.get(key);
					if (jsonNode != null && !jsonNode.isNull() && jsonNode.isArray()) {
						valueList = mapper.readValue(jsonNode.traverse(), listTypeRef);
					}
				}
				
				// List-Map Properties 
				for (String key : indexListMapKeys) {
					//System.out.println("Key " + key);
					jsonNode = diagnosisNode.get(key);
					if (jsonNode != null && !jsonNode.isNull() && jsonNode.isArray()) {
						valueListMap = mapper.readValue(jsonNode.traverse(), listMapTypeRef);
					}
				}				
				
				// Map Properties 
				for (String key : indexMapKeys) {
					System.out.println("Key " + key);
					jsonNode = diagnosisNode.get(key);
					if (jsonNode != null && !jsonNode.isNull()) {
						valueMap = mapper.readValue(jsonNode.traverse(), mapTypeRef);
					}
				}
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

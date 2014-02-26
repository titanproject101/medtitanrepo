package com.med.model;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.med.util.TitanDbUtil;
import com.thinkaurelius.titan.core.TitanGraph;
import com.thinkaurelius.titan.core.TitanLabel;
import com.tinkerpop.blueprints.Edge;
import com.tinkerpop.blueprints.Vertex;

public class TitanCount {
	public static void main(String[] args) {
		TitanCount titanCount = new TitanCount();
		TitanGraph titanGraph = TitanDbUtil.getInstance().getTitanGraph();
		System.out.println("*********************************** COUNTS *******************************************");
		titanCount.getCounts(titanGraph);
	}

	private void getCounts(TitanGraph titanGraph) {
		/********************* vertices count variables ******************************/
		int DIAGNOSIS_COUNT = 0;
		int DIAGNOSISCATEGORY_COUNT = 0;
		int DIAGNOSTIC_COUNT = 0;
		int DIAGNOSTICCATEGORY_COUNT = 0;
		int MED_COUNT = 0;
		int MEDCATEGORY_COUNT = 0;
		int SYMPTOM_COUNT = 0;
		int SYMPTOMCATEGORY_COUNT = 0;
		int THERAPEUTIC_COUNT = 0;
		int THERAPEUTICCATEGORY_COUNT = 0;
		int PHYSICIANCATEGORY_COUNT = 0;
		int VTX_NOCOLLECTION_COUNT = 0;
		int VERTEX_COUNT = 0;
		
		/********************* edges counts variables ******************************/
		int DIAGNOSIS_DIAGNOSIS_COUNT = 0;
		int DIAGNOSIS_DIAGNOSISCATEGORY_COUNT = 0;
		int DIAGNOSTIC_DIAGNOSTICCATEGORY_COUNT = 0;
		int MED_MEDCATEGORY_COUNT = 0;
		int DIAGNOSIS_MED_COUNT = 0;
		int DIAGNOSIS_THERAPEUTIC_COUNT = 0;
		int SYMPTOM_SYMPTOMCATEGORY_COUNT = 0;
		int DIAGNOSIS_DIAGNOSTIC_COUNT = 0;
		int THERAPEUTIC_THERAPCATEGORY_COUNT = 0;
		int SYMPTOM_MED_COUNT = 0;
		int SYMPTOM_DIAGNOSIS_COUNT = 0;
		int EDG_NOCOLLECTION_COUNT = 0;
		int EDGE_COUNT = 0;
		
		/******************* Indexed Keys *************************************/
		Set<String> vertexKeys = new HashSet<String>();
		Set<String> edgeKeys = new HashSet<String>();
		/**************** labels *******************************************/
		Set<String> edgeLabels = new HashSet<String>();
		
		// Vertex
		Iterator<Vertex> vertices = titanGraph.getVertices().iterator();
		while (vertices.hasNext()) {
			Vertex vertex = (Vertex) vertices.next();
			String collection = vertex.getProperty("collection");
			String GRAPHUNIQUEKEY = vertex.getProperty("GRAPHUNIQUEKEY");
			if (collection != null && !collection.isEmpty() && GRAPHUNIQUEKEY != null && !GRAPHUNIQUEKEY.isEmpty()) {
				if ("DIAGNOSISDEF".equalsIgnoreCase(collection)) {
					DIAGNOSIS_COUNT++;
				} else if ("SMARTSYMPTOM".equalsIgnoreCase(collection)) {
					SYMPTOM_COUNT++;
				} else if ("DIAGNOSISCATEGORY".equalsIgnoreCase(collection)) {
					DIAGNOSISCATEGORY_COUNT++;
				} else if ("MEDICATIONS".equalsIgnoreCase(collection)) {
					MED_COUNT++;
				} else if ("MEDICATIONCATEGORY".equalsIgnoreCase(collection)) {
					MEDCATEGORY_COUNT++;
				} else if ("DIAGNOSTICCATEGORY".equalsIgnoreCase(collection)) {
					DIAGNOSTICCATEGORY_COUNT++;
				} else if ("SYMPTOMCATEGORY".equalsIgnoreCase(collection)) {
					SYMPTOMCATEGORY_COUNT++;
				} else if ("PHYSICIANCATEGORY".equalsIgnoreCase(collection)) {
					PHYSICIANCATEGORY_COUNT++;
				} else if ("PROCEDURES".equalsIgnoreCase(collection)) {
					List<String> proctype = vertex.getProperty("proctype");
					if (proctype != null && !proctype.isEmpty()) {
						if (proctype.contains("THERAPEUTIC")) {
							THERAPEUTIC_COUNT++;
						} else {
							DIAGNOSTIC_COUNT++;
						}
					}
				} else if ("THERAPEUTICCATEGORY".equalsIgnoreCase(collection)) {
					THERAPEUTICCATEGORY_COUNT++;
				} else {
					VTX_NOCOLLECTION_COUNT++;
				}
			}
			VERTEX_COUNT++;
		}
		
		System.out.println("<<<<<<< vertices count >>>>>>>>");
		System.out.println("DIAGNOSIS " + DIAGNOSIS_COUNT); 
		System.out.println("DIAGNOSISCATEGORY " + DIAGNOSISCATEGORY_COUNT); 
		System.out.println("DIAGNOSTIC " + DIAGNOSTIC_COUNT); 
		System.out.println("DIAGNOSTICCATEGORY " + DIAGNOSTICCATEGORY_COUNT); 
		System.out.println("MED " + MED_COUNT); 
		System.out.println("MEDCATEGORY " + MEDCATEGORY_COUNT); 
		System.out.println("SYMPTOM " + SYMPTOM_COUNT); 
		System.out.println("SYMPTOMCATEGORY " + SYMPTOMCATEGORY_COUNT); 
		System.out.println("PHYSICIANCATEGORY " + PHYSICIANCATEGORY_COUNT); 
		System.out.println("THERAPEUTIC " + THERAPEUTIC_COUNT); 
		System.out.println("THERAPEUTICCATEGORY " + THERAPEUTICCATEGORY_COUNT); 
		System.out.println("Vertices having Collectionor or GRAPHUNIQUEKEY null/empty " + VTX_NOCOLLECTION_COUNT);
		System.out.println("Total vertices count " + VERTEX_COUNT);
		
		// Edges
		Iterator<Edge> edges = titanGraph.getEdges().iterator();
		while (edges.hasNext()) {
			Edge edge = edges.next();
			String collection = edge.getProperty("edge_collection");
			String GRAPHUNIQUEKEY = edge.getProperty("edge_GRAPHUNIQUEKEY");
			if (collection != null && !collection.isEmpty() && GRAPHUNIQUEKEY != null && !GRAPHUNIQUEKEY.isEmpty()) {
				if ("DIAGNOSISDIAGNOSISEDGE".equalsIgnoreCase(collection)) { 
					DIAGNOSIS_DIAGNOSIS_COUNT++;
				} else if ("DIAGNOSISCATEGORYEDGE".equalsIgnoreCase(collection)) { 
					DIAGNOSIS_DIAGNOSISCATEGORY_COUNT++;
				} else if ("DIAGNOSTICCATEGORYEDGE".equalsIgnoreCase(collection)) { 
					DIAGNOSTIC_DIAGNOSTICCATEGORY_COUNT++;
				} else if ("MEDCATEGORYEDGE".equalsIgnoreCase(collection)) { 
					MED_MEDCATEGORY_COUNT++;
				} else if ("DIAGNOSISMEDEDGE".equalsIgnoreCase(collection)) { 
					DIAGNOSIS_MED_COUNT++;
				} else if ("DIAGNOSISTHERAPEUTICEDGE".equalsIgnoreCase(collection)) { 
					DIAGNOSIS_THERAPEUTIC_COUNT++;
				} else if ("SYMPTOMCATEGORYEDGE".equalsIgnoreCase(collection)) { 
					SYMPTOM_SYMPTOMCATEGORY_COUNT++;
				} else if ("DIAGNOSISDIAGNOSTICEDGE".equalsIgnoreCase(collection)) { 
					DIAGNOSIS_DIAGNOSTIC_COUNT++;
				} else if ("THERAPEUTICCATEGORYEDGE".equalsIgnoreCase(collection)) { 
					THERAPEUTIC_THERAPCATEGORY_COUNT++;
				} else if ("SYMPTOMMEDMAP".equalsIgnoreCase(collection)) { 
					SYMPTOM_MED_COUNT++;
				} else if ("SYMPTOMDIAGNOSISMAP".equalsIgnoreCase(collection)) { 
					SYMPTOM_DIAGNOSIS_COUNT++;
				} else {
					EDG_NOCOLLECTION_COUNT++;
				}
			}
			EDGE_COUNT++;
		}
		
		System.out.println("<<<<<<< edges count >>>>>>>>");
		System.out.println("DIAGNOSIS_DIAGNOSIS_COUNT " + DIAGNOSIS_DIAGNOSIS_COUNT);
		System.out.println("DIAGNOSIS_DIAGNOSISCATEGORY_COUNT " + DIAGNOSIS_DIAGNOSISCATEGORY_COUNT);
		System.out.println("DIAGNOSTIC_DIAGNOSTICCATEGORY_COUNT " + DIAGNOSTIC_DIAGNOSTICCATEGORY_COUNT);
		System.out.println("MED_MEDCATEGORY_COUNT " + MED_MEDCATEGORY_COUNT);
		System.out.println("DIAGNOSIS_MED_COUNT " + DIAGNOSIS_MED_COUNT);
		System.out.println("DIAGNOSIS_THERAPEUTIC_COUNT " + DIAGNOSIS_THERAPEUTIC_COUNT);
		System.out.println("SYMPTOM_SYMPTOMCATEGORY_COUNT " + SYMPTOM_SYMPTOMCATEGORY_COUNT);
		System.out.println("DIAGNOSIS_DIAGNOSTIC_COUNT " + DIAGNOSIS_DIAGNOSTIC_COUNT);
		System.out.println("THERAPEUTIC_THERAPCATEGORY_COUNT " + THERAPEUTIC_THERAPCATEGORY_COUNT);
		System.out.println("SYMPTOM_MED_COUNT " + SYMPTOM_MED_COUNT);
		System.out.println("SYMPTOM_DIAGNOSIS_COUNT " + SYMPTOM_DIAGNOSIS_COUNT);
		System.out.println("Edge having edge_collection or edge_GRAPHUNIQUEKEY null/empty " + EDG_NOCOLLECTION_COUNT);
		System.out.println("Total edges count " + EDGE_COUNT);
		
		// Indexed Keys 
		vertexKeys.addAll(titanGraph.getIndexedKeys(Vertex.class));
		System.out.println("<<<<<<< vertices keys >>>>>>>>");
		System.out.println(vertexKeys);
		edgeKeys.addAll(titanGraph.getIndexedKeys(Edge.class));
		System.out.println("<<<<<<< edges keys >>>>>>>>");
		System.out.println(edgeKeys);
		
		// Edge Labels
		System.out.println("<<<<<<< edge labels >>>>>>>>");
		Iterator<TitanLabel> titanLabels = titanGraph.getTypes(TitanLabel.class).iterator();
		while (titanLabels.hasNext()) {
			TitanLabel titanLabel = titanLabels.next();
			edgeLabels.add(titanLabel.getName());			
		}
	}
}

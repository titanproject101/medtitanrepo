package com.med.service.diagnosis;

import java.util.Map;

public interface DiagnosisService {

	public Map<String, Object> getDiagnosisByName(String diagnosis);
	
	public String getGenderBias(Map<String, Object> diagnosisVertex);

	public Map<String, Object> getSymptomAnalysis(String diagnosis);

	public Map<String, Float> getSymptomCategoryHistogram(String diagnosis);

	public Map<String, Object> getDiagnosticChartListData(String diagnosis, Map<String, Object> diagnosisVertex, Map<String, Object> symptomAnalysis);

	public Map<String, Object> getTherapeuticChartListData(String diagnosis);
	
	public Map<String, Object> getMedicationChartListData(String diagnosis);

	public Map<String, Object> getUpstramDownstreamData(String diagnosis);
}

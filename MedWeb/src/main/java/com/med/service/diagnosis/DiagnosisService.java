package com.med.service.diagnosis;

import java.util.Map;

public interface DiagnosisService {

	/**
	 * This method is used to get diagnosis details by name
	 * @param diagnosis
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getDiagnosisByName(String diagnosis);
	
	/**
	 * This method is used to get Gender Bias graph JSON for given diagnosis details
	 * @param diagnosisVertex
	 * @return String
	 */
	public String getGenderBias(Map<String, Object> diagnosisVertex);

	/**
	 * This method is used to get SymptomAnalysis for given diagnosis
	 * @param diagnosis
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getSymptomAnalysis(String diagnosis);

	/**
	 * This method is used Symptom Category Histogram for given diagnosis
	 * @param diagnosis
	 * @return Map<String, Float>
	 */
	public Map<String, Float> getSymptomCategoryHistogram(String diagnosis);

	/**
	 * This method is used to get diagnostic chart data for given diagnosis
	 * @param diagnosis
	 * @param diagnosisVertex
	 * @param symptomAnalysis
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getDiagnosticChartListData(String diagnosis, Map<String, Object> diagnosisVertex, Map<String, Object> symptomAnalysis);

	/**
	 * This method is used to get therapeutic chart Data for given diagnosis
	 * @param diagnosis
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getTherapeuticChartListData(String diagnosis);
	
	/**
	 * This method is used to get medication chart data for given diagnosis
	 * @param diagnosis
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getMedicationChartListData(String diagnosis);

	/**
	 * This method is used to get upstream downstream chart data for given diagnosis
	 * @param diagnosis
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getUpstreamDownstreamData(String diagnosis);
}

package com.med.service.symptom;

import java.util.Map;

public interface SymptomService {

	public Map<String, Object> getRelatedDiagnosisListForSymptoms(Map<String, String> symptomDuration, String age);
}

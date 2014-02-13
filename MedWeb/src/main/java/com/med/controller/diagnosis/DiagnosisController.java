package com.med.controller.diagnosis;

import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.med.service.diagnosis.DiagnosisService;


@Controller
public class DiagnosisController {

	protected static final Log logger = LogFactory.getLog(DiagnosisController.class);
	
	private static final String MED_HOME_PAGE = "/jsp/med/medHome.jsp";
	private static final String DIAGNOSIS_DETAILS_PAGE = "/jsp/med/diagnosis/diagnosisDetails.jsp";
	
	@Autowired
	private DiagnosisService diagnosisService;
	
	@RequestMapping(value = "/medHome.htm")
	public ModelAndView getMedHomePage() {
		logger.info("Med Home Page");
		return new ModelAndView(MED_HOME_PAGE);
	}	
	
	@RequestMapping(value = "/diagnosisDetails.htm", method = RequestMethod.POST)
	public ModelAndView getDiagnosisDetails(@RequestParam("diagnosis") String diagnosis, ModelMap modelMap) {
		logger.info("Diagnosis Details Page");
		Map<String, Object> diagnosisVertex = diagnosisService.getDiagnosisByName(diagnosis);
		Map<String, Object> symptomAnalysis = diagnosisService.getSymptomAnalysis(diagnosis);
		modelMap.addAttribute("diagnosis", diagnosisVertex);
		modelMap.addAttribute("genderBias", diagnosisService.getGenderBias(diagnosisVertex));
		modelMap.addAttribute("symptomAnalysis", symptomAnalysis);
		modelMap.addAttribute("symptomCategoryHistogram", diagnosisService.getSymptomCategoryHistogram(diagnosis));
		modelMap.addAttribute("diagnosticChartListData", diagnosisService.getDiagnosticChartListData(diagnosis, diagnosisVertex, symptomAnalysis));
		modelMap.addAttribute("therapeuticChartListData", diagnosisService.getTherapeuticChartListData(diagnosis));
		modelMap.addAttribute("medicationChartListData", diagnosisService.getMedicationChartListData(diagnosis));
		modelMap.addAttribute("upstrmDwnStrmData", diagnosisService.getUpstramDownstreamData(diagnosis));
		return new ModelAndView(DIAGNOSIS_DETAILS_PAGE, modelMap);
	}
}

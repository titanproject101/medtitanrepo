package com.med.controller.symptom;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.med.service.symptom.SymptomService;

@Controller
public class SymptomController {

	protected static final Log logger = LogFactory.getLog(SymptomController.class);
	private static final String SYMPTOM_SEARCH_DIAG_PAGE = "/jsp/med/symptom/symptomRelatedDiagnosisRest.jsp";
	private static final String SYMPTOM_SEARCH_DIAG_REXPRO_PAGE = "/jsp/med/symptom/symptomRelatedDiagnosisRexpro.jsp";
	private static final String SYMPTOM_SEARCH_DIAG_REXPRO_RESULT_PAGE = "/jsp/med/symptom/symptomRelatedDiagnosisRexproResult.jsp";
	
	@Autowired
	private SymptomService symptomService;
	
	/**
	 * This method is used to get diagnosis search page 
	 * To search diagnosis using rexster's REST api
	 * @param modelMap
	 * @return
	 */
	@RequestMapping(value = "/symptomDiagnosisSearchRest.htm", method = RequestMethod.GET)
	public ModelAndView getSymptomDiagnosisRestSearchPage(ModelMap modelMap) {
		return new ModelAndView(SYMPTOM_SEARCH_DIAG_PAGE);
	}
	
	/**
	 * This method is used to get diagnosis search page 
	 * To search diagnosis using REXPRO api
	 * @param modelMap
	 * @return
	 */
	@RequestMapping(value = "/symptomDiagnosisSearchRexpro.htm", method = RequestMethod.GET)
	public ModelAndView getSymptomDiagnosisRexproSearchPage(ModelMap modelMap) {
		return new ModelAndView(SYMPTOM_SEARCH_DIAG_REXPRO_PAGE);
	}
	
	@RequestMapping(value = "/symptomDiagnosisSearchRexpro.htm", method = RequestMethod.POST)
	public ModelAndView getRelatedDiagnosisListForSymptoms(@RequestBody Map<String, String> symptomDuration, @RequestParam(value="age") String age, ModelMap modelMap) {
		Map<String, Object> results = symptomService.getRelatedDiagnosisListForSymptoms(symptomDuration, age);
		modelMap.addAttribute("results", results);
		return new ModelAndView(SYMPTOM_SEARCH_DIAG_REXPRO_RESULT_PAGE, modelMap);
	}
	
}

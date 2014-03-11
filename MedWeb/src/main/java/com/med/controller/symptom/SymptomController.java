package com.med.controller.symptom;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SymptomController {

	protected static final Log logger = LogFactory.getLog(SymptomController.class);
	private static final String SYMPTOM_SEARCH_DIAG_PAGE = "/jsp/med/symptom/symptomRelatedDiagnosis.jsp";
	
	/**
	 * This method is used to get diagnosis search page
	 * @param modelMap
	 * @return
	 */
	@RequestMapping(value = "/symptomDiagnosisSearch.htm", method = RequestMethod.GET)
	public ModelAndView getDiagnosisSearchPage(ModelMap modelMap) {
		return new ModelAndView(SYMPTOM_SEARCH_DIAG_PAGE);
	}
	
}

package com.med.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	protected static final Log logger = LogFactory.getLog(HomeController.class);
	
	private static final String MED_HOME_PAGE = "/jsp/med/medHome.jsp";
	
	/**
	 * This method is used to get Med Home Page
	 * @return ModelAndView
	 */
	@RequestMapping(value = "/medHome.htm")
	public ModelAndView getMedHomePage() {
		logger.info("Med Home Page");
		return new ModelAndView(MED_HOME_PAGE);
	}	
	
}

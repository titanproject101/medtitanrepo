package com.med.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.med.service.app.MedService;

public class MedContextListener implements ServletContextListener {
	
	public void contextInitialized(ServletContextEvent sce) {
		ServletContext stx = sce.getServletContext();
		WebApplicationContext applicationCtx = WebApplicationContextUtils.getWebApplicationContext(stx);
		MedService medService = (MedService)applicationCtx.getBean("medService");
		long verticesCount = medService.getVerticesCount();
		long edgesCount = medService.getEdgesCount();
		applicationCtx.getServletContext().setAttribute("verticesCount", verticesCount);
		applicationCtx.getServletContext().setAttribute("edgesCount", edgesCount);
		medService.getScriptEngine();
		medService.getTitanGraph();
	}

	public void contextDestroyed(ServletContextEvent sce) {
		
	}
}

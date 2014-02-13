package com.med.service.diagnosis.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.TreeMap;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.med.dao.MedDao;
import com.med.service.diagnosis.DiagnosisService;
import com.tinkerpop.rexster.client.RexProException;
import com.tinkerpop.rexster.client.RexsterClient;

@Service
public class DiagnosisServiceImpl implements DiagnosisService {

	@Autowired
	private MedDao medDao;
	
	@Autowired
	MessageSource messageSource;
	
	protected static final Log logger = LogFactory.getLog(DiagnosisServiceImpl.class);
	
	
	public Map<String, Object> getDiagnosisByName(String diagnosis) {
		RexsterClient rexsterClient = medDao.getRexsterClient();
		String script = "g.V.has('GRAPHUNIQUEKEY','" + diagnosis +"').has('collection','DIAGNOSISDEF')";
		
		/*
		String[] paramArray = new String[1];
		paramArray[0] = diagnosis;
		String script = messageSource.getMessage(MedConstant.GremlinQuery.QUERY_GET_DIAGNOSIS, paramArray, LocaleContextHolder.getLocale());
		*/
		List<Object> response = null;
		try {
			response = rexsterClient.execute(script);
			if (response != null && response.size() > 0) {
				Object obj = ((Map<String, Object>) response.get(0)).get("_properties");
				return  (Map<String, Object>)obj;
			}
			rexsterClient.close();
		} catch (RexProException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		} 
		return null;
	}
	
	public String getGenderBias(Map<String, Object> diagnosisVertex) {
		TreeMap<String,Float> GENBIAS=new TreeMap<String,Float>();
		String gender = (String)diagnosisVertex.get("gender");
		String favfemale= (String)diagnosisVertex.get("femalelikelihood");
		if (favfemale != null && favfemale.trim().length()>0) {
			if ("Much More Likely".equals(favfemale)) {
				GENBIAS.put("Female",0.8f);
				GENBIAS.put("Male",0.2f);
			} else if ("More Likely".equals(favfemale)) {
				GENBIAS.put("Female",0.65f);
				GENBIAS.put("Male",0.35f);
			} else if ("Little More Likely".equals(favfemale)) {
				GENBIAS.put("Female",0.55f);
				GENBIAS.put("Male",0.45f);
			}
		}
	
		String favmale=(String)diagnosisVertex.get("malelikelihood");
		if (favmale != null && favmale.trim().length()>0) {
			if ("Much More Likely".equals(favmale)) {
				GENBIAS.put("Female",0.2f);
				GENBIAS.put("Male",0.8f);
			} else if ("More Likely".equals(favmale)) {
				GENBIAS.put("Female",0.35f);
				GENBIAS.put("Male",0.65f);
			} else if ("Little More Likely".equals(favmale)) {
				GENBIAS.put("Female",0.45f);
				GENBIAS.put("Male",0.55f);
			}
		}
		String app="";
		if (GENBIAS.size()==0) {
			GENBIAS.put("Female",0.5f);
			GENBIAS.put("Male",0.5f);
			app=" (no known bias) ";										
		}
		if ("female".equalsIgnoreCase(gender)) {
			GENBIAS.put("Female",1f);
			GENBIAS.put("Male",0f);
		}
		if ("male".equalsIgnoreCase(gender)) {
			GENBIAS.put("Female",0f);
			GENBIAS.put("Male",1f);
		}
		String HD="";
		HD="[ {"; HD+=" \"key\" : \"Approx Gender Bias"+app+"\", "; HD+=" \"values\" : [ ";
		int a=0;
		for (Iterator it=GENBIAS.entrySet().iterator();it.hasNext();) {
			Map.Entry mape=(Map.Entry)it.next();
			String LABEL=(String)mape.getKey();
			Float F=(Float)mape.getValue();
			float ff=java.lang.Math.round(100f*F.floatValue());
			F=new Float(ff);
			if (a>0) HD+=", ";
			HD+=" { "; HD+="\"label\": \""+LABEL+"\" , "; HD+="\"value\": "+F+"  "; HD+=" } ";
			a++;
		}         
		HD+=" ] "; HD+=" } "; HD+="] ";	
		return HD;
	}

	public Map<String, Object> getSymptomAnalysis(String diagnosis) {
		Map<String, Object> symptomAnalysis = new LinkedHashMap<String, Object>(); 
		RexsterClient rexsterClient = medDao.getRexsterClient();
		List<Object> response = null;
		// Queries
		String ALL_SYMP_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').count()";
		String ALL_SYMP_SYN_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').hasNot('synonyms', null).synonyms.scatter.count()";
		//String VERY_COMM_SYMP_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Very Common').hasNot('issign','Yes').count()";
		String VERY_COMM_SYMP = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Very Common').hasNot('issign','Yes').GRAPHUNIQUEKEY";
		String VERY_COMM_SYMP_SYN_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Very Common').hasNot('issign','Yes').hasNot('synonyms' , null).synonyms.scatter.count()";
		//String VERY_COMM_SYMP_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Common').hasNot('issign','Yes').count()";
		String COMM_SYMP = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Common').hasNot('issign','Yes').GRAPHUNIQUEKEY";
		String COMM_SYMP_SYN_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Common').hasNot('issign','Yes').hasNot('synonyms' , null).synonyms.scatter.count()";
		//String OTHER_SYMP_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon', T.notin, ['Very Common','Common']).hasNot('issign','Yes').count()";
		String OTHER_SYMP = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon', T.notin, ['Very Common','Common']).hasNot('issign','Yes').GRAPHUNIQUEKEY";
		String OTHER_SYMP_SYN = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon', T.notin, ['Very Common','Common']).hasNot('issign','Yes').hasNot('synonyms' , null).synonyms.scatter.count()";
		//String VERY_COMM_SIGN_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Very Common').has('issign', 'Yes').count()";
		String VERY_COMM_SIGN = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Very Common').has('issign', 'Yes').GRAPHUNIQUEKEY";
		String VERY_COMM_SIGN_SYN_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Very Common').has('issign', 'Yes').hasNot('synonyms' , null).synonyms.scatter.count()";
		//String COMM_SIGN_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Common').has('issign', 'Yes').count()";
		String COMM_SIGN = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Common').has('issign', 'Yes').GRAPHUNIQUEKEY";
		String COMM_SIGN_SYN_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Common').has('issign', 'Yes').hasNot('synonyms' , null).synonyms.scatter.count()";
		//String OTHER_SIGN_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon', T.notin, ['Very Common','Common']).has('issign', 'Yes').count()";
		String OTHER_SIGN = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon', T.notin, ['Very Common','Common']).has('issign', 'Yes').GRAPHUNIQUEKEY";
		String OTHER_SIGN_SYN_COUNT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon', T.notin, ['Very Common','Common']).has('issign', 'Yes').hasNot('synonyms' , null).synonyms.scatter.count()";
		String OTHERRISKFACTORS = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').factors";
		String OTHERRISKFACTORS_LIFESTYLE = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').lifestyles";
		
		try {
			response = rexsterClient.execute(ALL_SYMP_COUNT);
			symptomAnalysis.put("allsymptomcount",  response.get(0));
			response = rexsterClient.execute(ALL_SYMP_SYN_COUNT);
			symptomAnalysis.put("allsymptomsynonymscount",  response.get(0));
			
			// Very Common Symptom
			Map<String, Object> VCSYMP = new HashMap<String, Object>();
			response = rexsterClient.execute(VERY_COMM_SYMP);
			VCSYMP.put("symptoms", response);
			VCSYMP.put("symptomsCount", response.size());
			response = rexsterClient.execute(VERY_COMM_SYMP_SYN_COUNT);
			VCSYMP.put("symptomsSynCount", response.get(0));
			symptomAnalysis.put("Very Common Symp", VCSYMP);

			// Common Symptom
			Map<String, Object> CSYMP = new HashMap<String, Object>();
			response = rexsterClient.execute(COMM_SYMP);
			CSYMP.put("symptoms", response);
			CSYMP.put("symptomsCount", response.size());
			response = rexsterClient.execute(COMM_SYMP_SYN_COUNT);
			CSYMP.put("symptomsSynCount", response.get(0));
			symptomAnalysis.put("Common Symp", CSYMP);
			
			// Other Symptom
			Map<String, Object> OSYMP = new HashMap<String, Object>();
			response = rexsterClient.execute(OTHER_SYMP);
			OSYMP.put("symptoms", response);
			OSYMP.put("symptomsCount", response.size());
			response = rexsterClient.execute(OTHER_SYMP_SYN);
			OSYMP.put("symptomsSynCount", response.get(0));
			symptomAnalysis.put("Other Symp", OSYMP);
			
			// Very Common Sign
			Map<String, Object> VCSIGN = new HashMap<String, Object>();
			response = rexsterClient.execute(VERY_COMM_SIGN);
			VCSIGN.put("symptoms", response);
			VCSIGN.put("symptomsCount", response.size());
			response = rexsterClient.execute(VERY_COMM_SIGN_SYN_COUNT);
			VCSIGN.put("symptomsSynCount", response.get(0));
			symptomAnalysis.put("Very Common Sign", VCSIGN);
			
			// Common Sign
			Map<String, Object> CSIGN = new HashMap<String, Object>();
			response = rexsterClient.execute(COMM_SIGN);
			CSIGN.put("symptoms", response);
			CSIGN.put("symptomsCount", response.size());
			response = rexsterClient.execute(COMM_SIGN_SYN_COUNT);
			CSIGN.put("symptomsSynCount", response.get(0));
			symptomAnalysis.put("Common Sign", CSIGN);
			
			// Other Sign
			Map<String, Object> OSIGN = new HashMap<String, Object>();
			response = rexsterClient.execute(OTHER_SIGN);
			OSIGN.put("symptoms", response);
			OSIGN.put("symptomsCount", response.size());
			response = rexsterClient.execute(OTHER_SIGN_SYN_COUNT);
			OSIGN.put("symptomsSynCount", response.get(0));
			symptomAnalysis.put("Other Sign", OSIGN);
			
			// Other Risk Factors
			List<String> otherRiskFactors = new ArrayList<String>(5);
			Map<String, Object> OTHER_RISK_FACT = new HashMap<String, Object>();
			response = rexsterClient.execute(OTHERRISKFACTORS);
			otherRiskFactors.addAll((List<String>)response.get(0));
			response = rexsterClient.execute(OTHERRISKFACTORS_LIFESTYLE);
			otherRiskFactors.addAll((List<String>)response.get(0));
			OTHER_RISK_FACT.put("otherriskfactors", otherRiskFactors);
			OTHER_RISK_FACT.put("otherriskfactorscount", otherRiskFactors.size());
			symptomAnalysis.put("Other Risk Factors", OTHER_RISK_FACT);
		} catch (RexProException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		}
		return symptomAnalysis;
	}

	public Map<String, Float> getSymptomCategoryHistogram(String diagnosis) {
		Map<String, Float> sympCatHisto = new HashMap<String, Float>(10);
		Map<String, List<String>> sympCatMap = new HashMap<String, List<String>>(3);
		RexsterClient rexsterClient = medDao.getRexsterClient();
		List<String> response = null;
		Set<String> keys = null;
		float mul = 0;
		String VERY_COMM_SYMP_CAT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Very Common').out.has('collection', 'SYMPTOMCATEGORY').GRAPHUNIQUEKEY";
		String COMM_SYMP_CAT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon','Common').out.has('collection', 'SYMPTOMCATEGORY').GRAPHUNIQUEKEY";
		String OTHER_SYMP_CAT = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').in.has('collection','SMARTSYMPTOM').has('iscommon', T.notin, ['Very Common','Common']).out.has('collection', 'SYMPTOMCATEGORY').GRAPHUNIQUEKEY";
		try {
			response = rexsterClient.execute(VERY_COMM_SYMP_CAT);
			sympCatMap.put("VCSympCat", response.subList(0, response.size() > 5 ? 4 : response.size() - 1 ));
			response = rexsterClient.execute(COMM_SYMP_CAT);
			sympCatMap.put("CSympCat", response.subList(0, response.size() > 5 ? 4 : response.size() - 1 ));
			response = rexsterClient.execute(OTHER_SYMP_CAT);
			sympCatMap.put("OSympCat", response.subList(0, response.size() > 5 ? 4 : response.size() - 1 ));
			
			keys = sympCatMap.keySet();
			for (String key : keys) {
				if (key.equals("VCSympCat")) mul = 1f; else if (key.equals("CSympCat")) mul = 0.7f; else mul = 0.1f;
				
				for (String category : sympCatMap.get(key)) {
					Float PV = (Float)sympCatHisto.get(category); 
					if (PV == null) PV = new Float(0f);
					sympCatHisto.put(category, new Float(PV.floatValue() + mul));
				}
			}
		} catch (RexProException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		}		
		return sympCatHisto;
	}

	public Map<String, Object> getDiagnosticChartListData(String diagnosis, Map<String, Object> diagnosisVertex, Map<String, Object> symptomAnalysis) {
		Map<String, Object> diagnosticChart = new HashMap<String, Object>(5);
		RexsterClient rexsterClient = medDao.getRexsterClient();
		Random random = new Random();
		List<String> response = null;
		List<Object> responseObj = null;
		Map<String,String> diagnosticWithCost =  null;
		Set<String> diagnostics = null;
		TreeMap<String,Float> ADDTOLABS = new TreeMap<String,Float>();
		Map<String,Map<String, String>> associatedProcDataMap = new HashMap<String, Map<String,String>>();
		Map<String, String> associatedprocdata = null;
		String DIAG_DIAGNOSTICS = "g.V.has('GRAPHUNIQUEKEY','"+ diagnosis +"').has('collection','DIAGNOSISDEF').out.has('collection', 'PROCEDURES').filter{it.getProperty('proctype') ? it.getProperty('proctype').contains('DIAGNOSTIC') : false}.map('GRAPHUNIQUEKEY','cost')";
        String OFLABS[]={" tool"," Tool","Inventory","inventory"," Scale","criteria","Criteria","mutation","Mutation"};
        List<String> ACS = (List<String>)(((Map<String,Object>)symptomAnalysis.get("Very Common Symp")).get("symptoms"));
        List<String> VCS = (List<String>)(((Map<String,Object>)symptomAnalysis.get("Common Symp")).get("symptoms"));
        List<String> CCS = (List<String>)(((Map<String,Object>)symptomAnalysis.get("Other Symp")).get("symptoms"));
        
        ArrayList POINTS = new ArrayList();
        TreeMap<String, Object> GROUPS = new TreeMap<String, Object>();
        TreeMap<String, Object> SCORES = new TreeMap<String, Object>();
        TreeMap<String, Float> COSTS = new TreeMap<String, Float>();
        
        // ADDTOLABS
        for (Iterator<String> it= ACS.iterator(); it.hasNext(); ) {
          String SY = it.next();
          for (int i=0;i < OFLABS.length;i++) {
            if (SY.indexOf(OFLABS[i])>=0) {
              if (VCS.contains(SY)) ADDTOLABS.put(SY,1f);    
              else if (CCS.contains(SY)) ADDTOLABS.put(SY,0.7f);    
              else if (ACS.contains(SY)) ADDTOLABS.put(SY,0.1f);    
            }
          }
        }
        try {
        	// Query To Get DIAGNOSTICS
			response = rexsterClient.execute(DIAG_DIAGNOSTICS);
			if (response != null && !response.isEmpty()) {
				String jsonStr = response.toString();
				jsonStr  = jsonStr.substring(1, jsonStr.length()-1);
				jsonStr = jsonStr.replaceAll("GRAPHUNIQUEKEY=", "\"");
				jsonStr = jsonStr.replaceAll(", cost=", "\":\"");
				jsonStr = jsonStr.replaceAll("\\}, \\{", "\",");
				StringBuilder builder = new StringBuilder(jsonStr);
				builder.deleteCharAt(builder.length()-1);
				builder.append("\"}");
				jsonStr = builder.toString().replaceAll("\"null\"", "\"0\"");
				
				diagnosticWithCost = new ObjectMapper().readValue(jsonStr, HashMap.class);
				diagnostics = diagnosticWithCost.keySet();
			}
			// Query to get all associate data
			String ASSO_PROC_DATA = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').outE.has('label','associatedprocdata').has('subvertexedge','true').inV.map('**NESTED**','prevalence', 'specificity', 'result')";
			List<Map<String, String>> associatedResponse = rexsterClient.execute(ASSO_PROC_DATA);
			if (associatedResponse != null && !associatedResponse.isEmpty() ) {
				for (Map<String, String> associated : associatedResponse) {
					associatedProcDataMap.put(associated.get("**NESTED**"), associated);
				}
			}
			
	        if (diagnosticWithCost != null) {
	        	for (Iterator<String> itt = ADDTOLABS.keySet().iterator();itt.hasNext();) {
	                String SY = itt.next();
	                if (!diagnosticWithCost.keySet().contains(SY) && !diagnostics.contains(SY.toLowerCase())) diagnosticWithCost.put(SY, "0");
	            }
	        	int loopCount = 0; 
	            diagnostics = diagnosticWithCost.keySet();
	            for (String diagnostic : diagnostics) {
	            	String costStr = diagnosticWithCost.get(diagnostic).replaceAll("\\$", "").replaceAll(",", "");
	            	if (costStr == null || costStr.isEmpty()) {
	            		costStr = "0";
	            	}
	            	float COST = 0;
	            	try {
	            		COST =  Float.parseFloat(costStr);
	            	} catch (NumberFormatException e) {
	            		logger.error("For COST : " + costStr);
	            	}
	            	
	            	if (ADDTOLABS.containsKey(diagnostic)) COST=5;
					COSTS.put(diagnostic,COST);
					COST/=50;
					if (COST<0) COST=1f;
					if (COST>50) COST=50;
					COST/=100;
					
					associatedprocdata = associatedProcDataMap.get(diagnostic);
					if (associatedprocdata != null && !associatedprocdata.isEmpty()) {
						String PPTC = associatedprocdata.get("prevalence") != null ? associatedprocdata.get("prevalence") : "";
		                String PPSP = associatedprocdata.get("specificity") != null ? associatedprocdata.get("specificity") : "";
		                String PPII = associatedprocdata.get("result") != null ? associatedprocdata.get("result") : "**";
		                
		                if ("high".equalsIgnoreCase(PPII)) PPII = "above normal range";
						if ("low".equalsIgnoreCase(PPII)) PPII = "below normal range";
						
						////////////////////////////////////////////////////////////////////////////// 
						
						float tc=0f;
		                float sp=0f;
		                float ii=0f;
	
		                if ("very common".equalsIgnoreCase(PPTC)) tc=1f;
		                else if ("common".equalsIgnoreCase(PPTC)) tc=.7f;
		                else if ("uncommon".equalsIgnoreCase(PPTC)) tc=.1f;
		                else if ("rare".equalsIgnoreCase(PPTC)) tc=.005f;
		                
		                if (ADDTOLABS.containsKey(diagnostic)) {
		                  Float rell = ADDTOLABS.get(diagnostic);
		                  tc = rell.floatValue();
		                }
	
		                if ("high".equalsIgnoreCase(PPSP)) sp=1f;
		                else if ("low".equalsIgnoreCase(PPSP)) sp=.1f;
	
		                if ("high".equalsIgnoreCase(PPII)) ii=.7f;
		                else if ("low".equalsIgnoreCase(PPII)) ii=.4f;
		                else if ("positive".equalsIgnoreCase(PPII)) ii=.7f;
		                else if ("negative".equalsIgnoreCase(PPII)) ii=.4f;
		                else if ("abnormal".equalsIgnoreCase(PPII)) ii=.7f;
		                else if ("normal".equalsIgnoreCase(PPII)) ii=.4f;
		                if (tc==0) tc=0.01f;
		                if (sp==0) sp=0.01f;
	
		                // Query to get diagnosis count for current diagnostic
		               /* String ASSO_PROC_DATA_DIAG_COUNT = "g.V.outE.has('label','associatedprocdata').has('subvertexedge','true').inV.has('**NESTED**', '"+diagnostic+"').count()";
		                responseObj = rexsterClient.execute(ASSO_PROC_DATA_DIAG_COUNT);
		                if (responseObj != null && !responseObj.isEmpty()) {*/
		                	//int diagCount = Integer.parseInt(responseObj.get(0).toString());
		                	int diagCount = random.nextInt(4);
	     					if (diagCount>0) {
	     					  float mul= diagCount / 100f;
	     					  tc*=(1f-0.1f*mul);
	     					}
		                //}
		                sp*=1f+0.001*loopCount;
						sp=60;
						float FC=0;
						//if (COST>0) FC=1/COST;
						if (COST>0) FC=(float)java.lang.Math.log(1/COST);
		                List ALL=(List)GROUPS.get(PPII);
		                if (ALL==null) {
		                  ALL=new ArrayList(); GROUPS.put(PPII, ALL);
		                }
		                diagnostic=diagnostic.replaceAll("\'","");
		                String NAM=diagnostic+" [Specificity: "+PPSP+", Commoness: "+PPTC+"]";
						String DP="{ \"name\": \""+NAM+"\", \"x\": "+tc+", \"y\": "+FC+", \"size\": "+sp+" } ";
						Map<String, Object> tempMap = new HashMap<String, Object>();
						tempMap.put("name", NAM);
						tempMap.put("x", tc);
						tempMap.put("y", FC);
						tempMap.put("size", sp);
		                ALL.add(tempMap);
		                POINTS.add(DP);
		                float SC=tc*FC;
						SCORES.put(diagnostic,SC);	
					}
					loopCount++;
	    		}
	        }
        } catch (RexProException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 
        
        
        ////////////////
        try {
			ObjectMapper objectMapper = new ObjectMapper();
			String []SHAPEOPTIONS = {"circle", "diamond", "cross", "triangle-up", "square", "triangle-down"};
			List<Map<String, Object>> data = new ArrayList<Map<String,Object>>();
			int yc = 0;
			for (Iterator git= GROUPS.entrySet().iterator(); git.hasNext();) {
				Map<String, Object> dataMap = new LinkedHashMap<String, Object>();
	            Map.Entry mape=(Map.Entry)git.next();
	            String g = (String)mape.getKey();
	            if (g.trim().length()==0) g="**";
	            List<Map<String, Object>> DP=(List<Map<String, Object>>)mape.getValue();
	            dataMap.put("key", "Result Type: " + g);
	            for (int x=0;x<DP.size();x++) {
	            	Map<String, Object> PPP = DP.get(x);
	            	if (PPP.get("shape") == null) {
	            		PPP.put("shape", SHAPEOPTIONS[yc % SHAPEOPTIONS.length]);
	            	}
	            	yc++;
	            }
	            dataMap.put("values", DP);
	            data.add(dataMap);
	       }
		  diagnosticChart.put("diagnosisChart", objectMapper.writeValueAsString(data));
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
        diagnosticChart.put("diagnostics", diagnostics);
        diagnosticChart.put("SCORES", SCORES);
		return diagnosticChart;
	}

	public Map<String, Object> getTherapeuticChartListData(String diagnosis) {
		Map<String, Object> therapeuticChart = new HashMap<String, Object>(5);
		RexsterClient rexsterClient = medDao.getRexsterClient();
		String script = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').out.has('collection', 'PROCEDURES').filter{it.getProperty('proctype') ? it.getProperty('proctype').contains('THERAPEUTIC') : false}.procedure";
		List<String> response = null;
		try {
			response = rexsterClient.execute(script);
			if (response != null && response.size() > 0) {
				therapeuticChart.put("therapeuticList", response);
			}
		} catch (RexProException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		} 
		return therapeuticChart;
	}
	
	public Map<String, Object> getMedicationChartListData(String diagnosis) {
		Map<String, Object> medicationData = new HashMap<String, Object>(5);
		RexsterClient rexsterClient = medDao.getRexsterClient();
		String script = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').out.has('collection', 'MEDICATIONS').medication";
		List<String> response = null;
		try {
			response = rexsterClient.execute(script);
			if (response != null && response.size() > 0) {
				medicationData.put("medicationList", response);
			}
		} catch (RexProException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		} 
		return medicationData;
	}

	public Map<String, Object> getUpstramDownstreamData(String diagnosis) {
		Map<String, Object> upstreamDownStreamData = new HashMap<String, Object>();
		RexsterClient rexsterClient = medDao.getRexsterClient();
		List<String> response = null;
		try {
			String script = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').outE.has('collection', 'DIAGNOSISDIAGNOSISEDGE').has('relationshiptype','downstream').EDGE2KEY";
			response = rexsterClient.execute(script);
			if (response != null && response.size() > 0) {
				upstreamDownStreamData.put("downstreamList", response);
			}
			script = "g.V.has('GRAPHUNIQUEKEY','"+diagnosis+"').has('collection','DIAGNOSISDEF').outE.has('collection', 'DIAGNOSISDIAGNOSISEDGE').has('relationshiptype','upstream').EDGE2KEY";
			response = rexsterClient.execute(script);
			if (response != null && response.size() > 0) {
				upstreamDownStreamData.put("upstreamList", response);
			}
		} catch (RexProException e) {
			logger.error(e);
		} catch (IOException e) {
			logger.error(e);
		} 
		return upstreamDownStreamData;
	}
}

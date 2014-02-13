<%@ include file='/include/inc_taglib.jsp' %>
<html>
	<%@ include file='/include/inc_script.jsp' %>
	 <body style="text-align: center;">
        <script>
           var SHAPEOPTIONS = ['circle', 'diamond', 'cross', 'triangle-up', 'square', 'triangle-down' ];
           var sympCatValue = "";
        </script>
    <style>
     .LH15 {
       line-height: 1.5;
     }
    </style>
    <div class="TAL pdL5 pdR5">
      <div style="float: right;">
      	<a href="${basePath}/medHome.htm">Back To Search</a>
		<a href="<c:url value="j_spring_security_logout" />" >Logout</a>
	  </div>
      <div class="fbt2 bold llTXT pdB5" style="border-bottom: 1px solid #00aaff;">${fn:toUpperCase(diagnosis['GRAPHUNIQUEKEY'])}<span class="pdL10 fbt2 msTXT">medical graph fact sheet</span></div>

      <div class="FW pdT10 pdB10">
        <div class="fbt2 laTXT">General</div>
        <table class="FW" border="0" cellpadding="0" cellspacing="0">
          <tbody><tr>
            <td class="fbt2 lmTXT LH15" valign="top" width="33%">
              Description: ${diagnosis.DIAG_label}<br>
              Synonyms: <c:forEach items="${diagnosis.synonyms}" var="synonym">${synonym},</c:forEach> <br> 
              Seasonality: 
              <c:choose> 
              			<c:when test="${not empty diagnosis.seasonal}">
              				<c:forEach items="${diagnosis.seasonal}" var="seasonal" varStatus="status">
              					${seasonal}
              					<c:if test="${!status.last}">
									,
								</c:if>
              				</c:forEach>
              			</c:when>
              			<c:otherwise>
              				None
              			</c:otherwise>
              </c:choose> <br>
              Acute vs Chronic: 
              <c:choose>
              	<c:when test="${fn:contains(diagnosis.chronic, 'Chronic')}">
              		Chronic
              	</c:when>
              	<c:otherwise>
              		Acute
				</c:otherwise>
              </c:choose>
            </td>
            <td class="fbt2 lmTXT pdL10 LH15" valign="top" width="33%">
              Categories:
              	<c:forEach items="${diagnosis.category}" var="category" varStatus="status">
              		${category}
					<c:if test="${!status.last}">
						,
					</c:if>           		
              	</c:forEach>
              <br>
              Sub Diagnoses:
              <c:forEach items="${diagnosis.subdiagnoses}" var="subdiagnoses" varStatus="status">
              		${subdiagnoses}
              		<c:if test="${!status.last}">
						,
					</c:if>  
              	</c:forEach>
            </td>
          </tr>
        </tbody></table>   
</div>
 
<div class="pdT10" style="border-top: 1px solid #f2f2f2;">
<div class="fbt2 msTXT">Approx. Gender Bias</div>
	<div class="gallery" id="genbias" style="background-Color: #ffffff;width: 400px; height: 200px;"></div>
      <script>
			 function doGENBIAS() {
				 var DSTRING='{ "array" : ${genderBias} }';
				 var data = JSON.parse(DSTRING);
				 function displayGENBIAS() {
					 
					 //var chart = nv.models.discreteBarChart().x(function(d) { return d.label }).y(function(d) { return d.value });
					 var chart = nv.models.pieChart().x(function(d) { return d.label }).y(function(d) { return d.value }).donut(true);
					 
					 d3.select('#genbias').append("svg")
						 .datum(data["array"][0]["values"])
						 .transition().duration(500)
						 .call(chart);
																	 
					 nv.utils.windowResize(chart.update);								 
					 return chart;
				 }
				 nv.addGraph(displayGENBIAS());
			 }
			 setTimeout("doGENBIAS()",500);									 
	 </script>
</div>
 
<div class="pdT10" style="border-top: 1px solid #f2f2f2;">
<div class="fbt2 laTXT LH15">Symptoms and Signs [${symptomAnalysis.allsymptomcount} with ${symptomAnalysis.allsymptomsynonymscount} known synonyms]</div>
</div>
<div class="pdT10" style="border-top: 1px solid #f2f2f2;">
	<div class="fbt asmTXT MEDGREYCOLOR" style="float: right;">
		Top Sym/Sign Category Histogram (number of symptoms per category weighted)
		<div class="gallery" id="sscathisto" style="background-Color: #ffffff;width: 700px; height: 300px;"></div>
	</div>
	
	<c:forEach items="${symptomCategoryHistogram}" var="sympCat" varStatus="status">
		<script>
			sympCatValue = sympCatValue + '{"label" : "${sympCat.key}", "value" : ${sympCat.value}}';
		</script>
		<c:if test="${!status.last}">
			<script>
				sympCatValue = sympCatValue + ',';
			</script>
		</c:if>
	</c:forEach>
		
	<Script>
			 function doSscathisto() {
				 var DSTRING='{ "array" : [{"key": "Symptom Category Histogram", "values": [' + sympCatValue + ']}]}';
				 var data = JSON.parse(DSTRING);
				 function displaySscathisto() {
					 var chart = nv.models.multiBarHorizontalChart().x(function(d) { return d.label }).y(function(d) { return d.value });
	              				 chart.showValues(true).tooltips(false).showControls(false);
					 chart.margin({left: 200});
					 //chart.xAxis.rotateLabels(-30);
					 d3.select('#sscathisto').append("svg")
						 .datum(data["array"])
						 .transition().duration(500)
						 .call(chart);
					//var bbb=d3.selectAll("#sscathisto").selectAll("text").attr("style", "fill: #acacac;font-size: 8pt;");								 
					 nv.utils.windowResize(chart.update);
					 return chart;
				 }
				 nv.addGraph(displaySscathisto());
			 }
			 setTimeout("doSscathisto()",500);
	</script>
 </div>
 <div class="pdT10" style="border-top: 1px solid #f2f2f2;">
 	<div class="fbt asmTXT MEDGREYCOLOR" style="float: left;">
		Histogram
		<div class="gallery" id="sshisto" style="background-Color: #ffffff;width: 700px; height: 300px;"></div>
		<Script>
						 function doSSHisto() {
							
							 var DSTRING='{"array" : [ {"key" : "Symptom Sign Histogram",  "values" : [  {"label": "Very Com. Symptoms" ,  "value": ${symptomAnalysis["Very Common Symp"].symptomsCount} } ,  {"label": "Com. Symptoms" ,  "value": ${symptomAnalysis["Common Symp"].symptomsCount} } ,  {"label": "Other Symptoms" ,  "value": ${symptomAnalysis["Other Symp"].symptomsCount} } ,  {"label": "Very Com. Signs" ,  "value": ${symptomAnalysis["Very Common Sign"].symptomsCount} },'  +
							 '{"label": "Com. Signs" ,  "value": ${symptomAnalysis["Common Sign"].symptomsCount} } ,  {"label": "Other Signs" ,  "value": ${symptomAnalysis["Other Sign"].symptomsCount} } ,  {"label": "Other Risk Factors" ,  "value": ${symptomAnalysis["Other Risk Factors"].otherriskfactorscount} }  ] } ] }';
							
							 var data = JSON.parse(DSTRING);
							 function displaySSHisto() {
								 var chart = nv.models.discreteBarChart().x(function(d) { return d.label}) .y(function(d) { return d.value }).staggerLabels(false).tooltips(true).showXAxis(true).showYAxis(true).showValues(true);

								 chart.margin({bottom: 100});
								 chart.xAxis.rotateLabels(-30);
								 d3.select('#sshisto').append("svg")
									 .datum(data["array"])
									 .transition().duration(500)
									 .call(chart);
								 
								 nv.utils.windowResize(chart.update);
								 
								 return chart;
							 }
							 nv.addGraph(displaySSHisto());
						 }
						 setTimeout("doSSHisto()",500);
						</script>
	</div>
 </div> 
<div class="pdT10" style="border-top: 1px solid #f2f2f2;">
   <Style>
     .LGB {background-Color: #f6f6f6;}
   </style>
    <table border="0" cellpadding="0" cellspacing="0" class="pdT10 FW">
        <tr>
          <td> <div class="fbt2 blmTXT LH15 LGB"></div></td>
          <td class="fbt2 smTXT MEDGREYCOLOR LGB"><center>likelihood by age</center></td>
          <td class="fbt2 smTXT MEDGREYCOLOR LGB"><center>likelihood by duration</center></td>
          <!--  <td class="fbt2 smTXT MEDGREYCOLOR LGB"><center>&nbsp;</center></td>
          <td class="fbt2 smTXT MEDGREYCOLOR LGB"><center>&nbsp;</center></td> -->
        </tr>
        <c:forEach items="${symptomAnalysis}" var="sympAnalysis">
        	<c:if test="${sympAnalysis.key ne 'allsymptomcount' && sympAnalysis.key ne 'allsymptomsynonymscount' && sympAnalysis.key ne 'Other Risk Factors'}">
        		 <tr>
			           <td> <div class="fbt2 blmTXT LH15 LGB">${sympAnalysis.key}  [<u>${sympAnalysis.value.symptomsCount}</u> with <u>${sympAnalysis.value.symptomsSynCount}</u> known synonyms]</div></td>
			           <td class="fbt2 smTXT MEDGREYCOLOR LGB"></td>
			           <td class="fbt2 smTXT MEDGREYCOLOR LGB"></td>
			          <!--  <td class="fbt2 smTXT MEDGREYCOLOR LGB"><center>&nbsp;</center></td>
			           <td class="fbt2 smTXT MEDGREYCOLOR LGB"><center>&nbsp;</center></td> -->
		         </tr>
		         <tr>
		         	<td valign="top"  class="fbt2 msTXT LH15"  width="50%">
                  		${sympAnalysis.value.symptoms}
                	</td>
		         </tr>
        	</c:if>
        	<c:if test="${sympAnalysis.key eq 'Other Risk Factors'}">
        		 <tr>
			           <td> <div class="fbt2 blmTXT LH15 LGB">${sympAnalysis.key}  [<u>${sympAnalysis.value.otherriskfactorscount}</u> with <u> 0 </u> known synonyms]</div></td>
			           <td class="fbt2 smTXT MEDGREYCOLOR LGB"></td>
			           <td class="fbt2 smTXT MEDGREYCOLOR LGB"></td>
			          <!--  <td class="fbt2 smTXT MEDGREYCOLOR LGB"><center>&nbsp;</center></td>
			           <td class="fbt2 smTXT MEDGREYCOLOR LGB"><center>&nbsp;</center></td> -->
		         </tr>
		         <tr>
		         	<td valign="top"  class="fbt2 msTXT LH15"  width="50%">
                  		${sympAnalysis.value.otherriskfactors}
                	</td>
		         </tr>
        	</c:if>
        </c:forEach>
    </table>
</div>
<table>
<tr>
		<td>		
				<div id="diagnosticchart" style="width: 700px; height: 500px;">
					<svg></svg>
				</div>
				<script>
				var chart;
				nv.addGraph(function() {
						  chart = nv.models.scatterChart()
						                .showDistX(true)
						                .showDistY(true)
						                .useVoronoi(true)
						                .color(d3.scale.category10().range())
						                .transitionDuration(300)
						                ;
		
						  chart.xAxis.tickFormat(d3.format('.02f'));
						  chart.yAxis.tickFormat(d3.format('.02f'));
						  chart.tooltipContent(function(key) {
						      return '<h2>' + key + '</h2>';
						  });
		
						  d3.select('#diagnosticchart svg')
						      .datum(JSON.parse('${diagnosticChartListData.diagnosisChart}'))
						      .call(chart);
		
						  nv.utils.windowResize(chart.update);
		
						  chart.dispatch.on('stateChange', function(e) { ('New State:', JSON.stringify(e)); });
		
						  return chart;
					});
				</script>
				
		</td>
		<td>
		<div class="pdT10" style="border-top: 1px solid #f2f2f2;">
				<div class="fbt2 laTXT LH15">Labs, Imaging, Diagnostics</div>
				<div class="fbt2 pdT5 msTXT LH15">interactive chart</div>
				<div id="diagnosticlist" style="width: 400px; height: 500px; padding-right: 20px; overflow-Y: auto;overflow-X: hidden;float: right;">
				<table border="0" cellpadding="0" cellspacing="0" width="400px">
						  <tr>
						    <td valign="top">		      
						      List (${fn:length(diagnosticChartListData.diagnostics)})
						    </td>
						    <td valign="top" class="pdL10">
						      Scores
						    </td>
						    <td valign="top" class="pdL10">
						      Cost
						    </td>
						  </tr>
						  <tr>
						  	<td class="fbt smTXT">
					    	<c:forEach items="${diagnosticChartListData.diagnostics}" var="diagnostic">
					    			${diagnostic} <br />
					    	</c:forEach>
					    	</td>
						    <td class="pdL10"></td>
						    <td class="fbt smTXT pdL10"></td>
						  </tr>
				</table>
				
				
				</div>
				</div>
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<div class="pdT10" style="border-top: 1px solid #f2f2f2;">
				<div class="fbt2 laTXT LH15">Management and Therapy (Non-Pharma)</div>
				<div class="fbt2 pdT5 msTXT LH15">interactive chart</div>
				<div id="therapeuticlist" style="width: 400px; height: 500px; padding-right: 20px; overflow-Y: auto;overflow-X: hidden;float: right;">
				<table border="0" cellpadding="0" cellspacing="0" width="400px">
						  <tr>
						    <td valign="top">		      
						      List (${fn:length(therapeuticChartListData.therapeuticList)})
						    </td>
						    <td valign="top" class="pdL10">
						      Scores
						    </td>
						    <td valign="top" class="pdL10">
						      Cost
						    </td>
						  </tr>
						  <tr>
						  	<td class="fbt smTXT">
					    	<c:forEach items="${therapeuticChartListData.therapeuticList}" var="therapeutic">
					    			${therapeutic} <br />
					    	</c:forEach>
					    	</td>
						    <td class="pdL10"></td>
						    <td class="fbt smTXT pdL10"></td>
						  </tr>
				</table>
				
				<div id="therapeuticchart" style="width: 700px; height: 500px;float left;"></div>
				<script>
					function getTherapeuticChartData() {
						
				    }
					setTimeout("getTherapeuticChartData()",500);
				</script>
				</div>
			</div>
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<div class="pdT10" style="border-top: 1px solid #f2f2f2;">
				<div class="fbt2 laTXT LH15">Medications</div>
				<div class="fbt2 pdT5 msTXT LH15">interactive chart</div>
				<div id="medicationlist" style="width: 400px; height: 500px; padding-right: 20px; overflow-Y: auto;overflow-X: hidden;float: right;">
				<table border="0" cellpadding="0" cellspacing="0" width="400px">
						  <tr>
						    <td valign="top">		      
						      List (${fn:length(medicationChartListData.medicationList)})
						    </td>
						    <td valign="top" class="pdL10">
						      Scores
						    </td>
						    <td valign="top" class="pdL10">
						      Cost
						    </td>
						  </tr>
						  <tr>
						  	<td class="fbt smTXT">
					    	<c:forEach items="${medicationChartListData.medicationList}" var="medication">
					    			${medication} <br />
					    	</c:forEach>
					    	</td>
						    <td class="pdL10"></td>
						    <td class="fbt smTXT pdL10"></td>
						  </tr>
				</table>
				<div id="medicationchart" style="width: 700px; height: 500px;float left;"></div>
				<script>
					function getMedicationChartData() {
						
				    }
					setTimeout("getMedicationChartData()",500);
				</script>
				</div>
			</div>
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<div class="pdT10" style="border-top: 1px solid #f2f2f2;">
				<div class="fbt2 laTXT LH15">Risk Factor Mapping (Upstream &rarr; Downstream)</div>
					<table border="0" cellpadding="0" cellspacing="0" width="400px">
							  <tr>
							    <td valign="top">		      
							     	<b>Upstream</b>
							    </td>
							    <td valign="top" class="pdL10">
							      	<b>Downstream</b>
							    </td>
							  </tr>
							  <tr>
							  	<td class="fbt smTXT">
							    	<c:forEach items="${upstrmDwnStrmData.downstreamList}" var="downstream">
							    			${downstream} <br />
							    	</c:forEach>
						    	</td>
							    <td class="pdL10">
							    	<c:forEach items="${upstrmDwnStrmData.upstreamList}" var="upstream">
							    			${upstream} <br />
							    	</c:forEach>
							    </td>
							  </tr>
					</table>
			  </div>
		</td>
	</tr>
</table>
<div style="width: 330px; height: 280px; position: fixed; bottom: 0px; right: -330px; background-color: transparent; margin: 0px; padding: 0px; border-radius: 0px; z-index: 2147483647;" id="b_71735">
<div style="margin: 0px 10px 0px 0px; width: 300px; text-align: right; bottom: 0px; font-family: arial; font-size: 10px; position: absolute;">
</div></div><div class="base_e95e72c5 ui-draggable" style="width:0px; height:0px; position:fixed; bottom:20px; right:20px; display:none; z-index: 2147483600;" id="sf_e95e72c5-b61d-474e-a27b-036e12bba925"><div style="opacity: 0; display: block;" class="base_e95e72c5 quickList_e95e72c5 shad_e95e72c5 drag_e95e72c5"><div class="quickListBox_e95e72c5" style="filter:inherit"></div><div class="base_e95e72c5 btnclose2_e95e72c5" style="filter:inherit"></div></div>
<div class="base_e95e72c5 fullList_e95e72c5 shad_e95e72c5"><div class="fullList_e95e72c5-header drag_e95e72c5">
<div class="fullList_e95e72c5-title">Web Shield</div><div class="fullList_e95e72c5-subtitle">found the following:</div>
</div><div class="fullList_e95e72c5-body"><div class="fullList_e95e72c5-entry">No trackers here!</div></div>
<div class="fullList_e95e72c5-footer"><div class="fullList_e95e72c5-cp">©2014</div>
<div class="fullList_e95e72c5-history">
<a href="http://www.webshieldonline.com/app.html" target="_blank">View History</a></div>
<div class="fullList_e95e72c5-options"><div class="fullListTog_e95e72c5"></div>
<div class="fullListTog_e95e72c5-label">Show on Websites</div></div></div></div>
<div class="base_e95e72c5 main_e95e72c5">
<div class="base_e95e72c5 subcon_e95e72c5 shad_e95e72c5" style="filter:inherit">
<div class="btn-drag-drop_e95e72c5 drag_e95e72c5"></div><div style="float:left;padding:2px;"></div>
<div class="btn-pop_e95e72c5"></div></div><div class="base_e95e72c5 btnclose_e95e72c5" style="filter:inherit"></div>
<div class="base_e95e72c5 countbox_e95e72c5" style="filter:inherit">0</div></div></div>
</body></html>
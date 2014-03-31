<%@ include file='/include/inc_taglib.jsp' %>
<html>
  <%@ include file='/include/inc_script.jsp' %>
  <body style="text-align: center;">
       <script type="text/javascript">
			jQuery(document).ready(function ($) {
				addSymptoms();
				getDiagnosis();
			});
			
			function addSymptoms() {
				$('#addsympbtn').click(function() {
					var html = $(".copydiv").html();
					$(".pastediv").append("<div style='clear:both;'></div>" + html);
				});
			}
			
			function getDiagnosis() {
				$('#searchsympdiag').click(function() {
					$('#sympDiagDetails').empty();
					$('#sympDiagDetails').append("<b style='float:left;'>Please Wait ...</b>");
					$("body").css("cursor", "progress");
					
					var symptomduration = "{";
					var age = $("#ageselect").val();
					var classVal = null;
					var selectVal = null;
					var selectBoxescount = $(".sympdurdiv select").size();
					var index = 0;
					var blankSearchCriteria = false;
					if (age == null || age == "") {
						alert("Please select age");
						blankSearchCriteria = true;
						$("body").css("cursor", "default");
						$('#sympDiagDetails').empty();
					}
					$(".sympdurdiv select").each(function() {
						classVal = $(this).attr('class');
						selectVal = $(this).val();
						if (selectVal != null && selectVal != "") {
							if (classVal == "symptomselect") {
								symptomduration = symptomduration + '"' + selectVal +'":';	
							} else if (classVal == "durationselect") {
								symptomduration =  symptomduration + '"' + selectVal + '"';
								if (index < selectBoxescount && index != selectBoxescount - 1) {
									symptomduration = symptomduration +  ",";
								}
							}
						} else {
							if (!blankSearchCriteria) {
								alert("Symptom/Duration options can not be blank");
								blankSearchCriteria = true;
								$('#sympDiagDetails').empty();
								$("body").css("cursor", "default");
							}
						}
						index ++;
					});
					symptomduration = symptomduration + "}";
					if (!blankSearchCriteria) {
						$.ajax({
							type: 'POST',
							url: "${basePath}/symptomDiagnosisSearchRexpro.htm?age="+age,
							processData: false,
					        data: symptomduration,
					        cache: false,
					        dataType: 'html',
					        contentType: 'application/json',
							success: function(html) {		   
							   $('#sympDiagDetails').empty();
							   $('#sympDiagDetails').append(html);
							   $("body").css("cursor", "default");
							},
							error: function(){
								$("body").css("cursor", "default");
								$('#sympDiagDetails').empty();
								alert('Error !!!!');
							}
						});	
					}
				}); // End onclick
			}
		</script>
		<div style="float: right;">
      		<a href="${basePath}/medHome.htm">Back To Home</a>
			<a href="<c:url value="j_spring_security_logout" />" >Logout</a>
	  	</div>
		<div>
			<div style="float: left;">
					<div class="copydiv" style="padding-left: 138px;float: left;">
						<div class="sympdurdiv">
							<b>Symptom </b>
							<select class="symptomselect">
								<option value="">--select--</option>
								<option value="abnormal genitals">abnormal genitals</option>
								<option value="night sweats">night sweats</option>
								<option value="lump or swelling on jaw">lump or swelling on jaw</option>
								<option value="warmth in knee">warmth in knee</option>
								<option value="burning urination">burning urination</option>
								<option value="difficulty breathing">difficulty breathing</option>
								<option value="vomiting">vomiting</option>
								<option value="fever">fever</option>
								<option value="stomach pain">stomach pain</option>
								<option value="passing out">passing out</option>
								<option value="nausea">nausea</option>
								<option value="palpitations">palpitations</option>
								<option value="lethargy">lethargy</option>
								<option value="stomach swelling">stomach swelling</option>
								<option value="headache">headache</option>
								<option value="malaise">malaise</option>
								<option value="change in cognition">change in cognition</option>
								<option value="dizziness">dizziness</option>
								<option value="poor appetite">poor appetite</option>
								<option value="vision problems">vision problems</option>
								<option value="weakness">weakness</option>
								<option value="rash on arm(s)">rash on arm(s)</option>
								<option value="swollen feet">swollen feet</option>
								<option value="rash">rash</option>
								<option value="chest pain">chest pain</option>
								<option value="cough">cough</option>
								<option value="pain during walking">pain during walking</option>
								<option value="blood in stool">blood in stool</option>
								<option value="clammy skin">clammy skin</option>
								<option value="blindness">blindness</option>
								<option value="diarrhea">diarrhea</option>
								<option value="wheezing">wheezing</option>
							</select>
							<b>Duration </b>
							<select class="durationselect">
								<option value="">--select--</option>
								<option value="0-3 days">0-3 days</option>
								<option value="0-14 days">0-14 days</option>
								<option value="2 weeks-2 mnths">2 weeks-2 mnths</option>
								<option value="2-6 months">2-6 months</option>
								<option value="6 months +">6 months +</option>
							</select>
						</div>
					</div>
					<div style="float: left;">
						<b>Age </b>
						<select id="ageselect">
							<option value="">--select--</option>
							<option value="1-4">1-4</option>
							<option value="5-12">5-12</option>
							<option value="12-18">12-18</option>
							<option value="18-29">18-29</option>
							<option value="30-50">30-50</option>
							<option value="50+">50+</option>
						</select>
					</div>
					<div style="float: left;">	
						<button type="button" id="addsympbtn" style="background-color:lightgreen">Add Symptom</button>
						<button type="button" id="searchsympdiag" style="background-color:lightblue">Search Diagnosis</button>
					</div>
					<div class="pastediv" style="float: left;padding: 1% 60% 0% 10%"></div>
			</div>
        	<div id="sympDiagDetails" style="float: left;border: 1px solid #000000;"></div>
		</div>
  </body>
</html>
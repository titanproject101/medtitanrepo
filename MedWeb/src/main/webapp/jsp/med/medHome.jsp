<%@ include file='/include/inc_taglib.jsp' %>
<html>
	<body>
		 <div>
			<div style="float: right;">
				<a href="<c:url value="j_spring_security_logout"/>">Logout</a>
			</div>
			<div style="float: left; ">
				<a href="${basePath}/diagnosisDetails.htm">Diagnosis Details</a><br />
				<a href="${basePath}/symptomDiagnosisSearchRest.htm">Symptom Diagnosis-REST</a><br />
				<a href="${basePath}/symptomDiagnosisSearchRexpro.htm">Symptom Diagnosis-REXPRO</a>
			</div>
		 </div>
	</body>
</html>
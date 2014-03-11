<%@ include file='/include/inc_taglib.jsp' %>
<html>
  <%@ include file='/include/inc_script.jsp' %>
  <body style="text-align: center;">
       <script type="text/javascript">
			jQuery(document).ready(function ($) { // wait until the document is ready
				$('#searchsympdiag').click(function() {
					$("body").css("cursor", "progress");
					var symptom = $("#symptom").val();
					var age = $("#age").val();
					var duration = $("#duration").val();
					$.ajax({
					    type: 'GET',
					    url: "http://localhost:8182/graphs/patientgraph/tp/gremlin?script=pagerank('"+symptom+"', '"+age+"', '"+duration+"')&load=[subgraph]",
					    datatype: 'application/json',
					    cache: 'false',
					    success: function(response) {
					      //  alert('Load was performed.');
					       var results = response.results;
					       var html = "<b style='float:left;'>Top 20 Diagnosis</b></br><table border='1'>";
					       $.each(results, function(i, item) {
					    	   html = html + "<tr><td>"+results[i][0]+"</td></tr>";
					    	   return i < 20;
					       });
					       html = html + "</table>";
					       $('#sympDiagDetails').empty();
					       $('#sympDiagDetails').append(html);
					       $("body").css("cursor", "default");
					    },
					    error: function(){
					      //  alert('Fuuuuuuuuuuuuuu');
					    }
					});				
					//alert('Fail');				
				}); // End onclick
			});
		
		</script>
		<div style="float: right;">
      		<a href="${basePath}/medHome.htm">Back To Home</a>
			<a href="<c:url value="j_spring_security_logout" />" >Logout</a>
	  	</div>
		<div>
			<div>
				<b>Symptom </b>
				<select id="symptom">
					<option value="">--select--</option>
					<option value="fever">fever</option>
					<option value="pain during walking">pain during walking</option>
					<option value="blood in stool">blood in stool</option>
					<option value="chest pain">chest pain</option>
					<option value="clammy skin">clammy skin</option>
					<option value="double vision">double vision</option>
					<option value="blindness">blindness</option>
					<option value="diarrhea">diarrhea</option>
					<option value="wheezing">wheezing</option>
				</select>
				<b>Age </b>
				<select id="age">
					<option value="">--select--</option>
					<option value="1-4">1-4</option>
					<option value="5-12">5-12</option>
					<option value="12-18">12-18</option>
					<option value="18-29">18-29</option>
					<option value="30-50">30-50</option>
					<option value="50+">50+</option>
				</select>
				<b>Duration </b>
				<select id="duration">
					<option value="">--select--</option>
					<option value="0-3 days">0-3 days</option>
					<option value="0-14 days">0-14 days</option>
					<option value="2 weeks-2 mnths">2 weeks-2 mnths</option>
					<option value="2-6 months">2-6 months</option>
					<option value="6 months +">6 months +</option>
				</select>
					
				<button type="button" id="searchsympdiag">Search Diagnosis</button>
			</div>
        	<div id="sympDiagDetails"></div>
		</div>
  </body>
</html>
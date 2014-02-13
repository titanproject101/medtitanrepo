<%@ include file='/include/inc_taglib.jsp' %>
<html>
	<body>
	 <div>
		<div style="float: right;">
			<a href="<c:url value="j_spring_security_logout" />" >Logout</a>
		</div>
		<form action="${basePath}/diagnosisDetails.htm" method="POST">
			<table>
				<tr>
					<td>Enter Diagnosis To Search: </td>
					<td><input name="diagnosis"></td>
				</tr>
				<tr>
					<td colspan="2">
						<input type="submit"/>
					</td>
				</tr>
			</table>
		</form>
	 </div>
	</body>
</html>
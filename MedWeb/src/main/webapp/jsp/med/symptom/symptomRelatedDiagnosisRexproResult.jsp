<%@ include file='/include/inc_taglib.jsp' %>
<div>
	<div style="background-color:#b0c4de;">
		<div><b># of diagnosis : </b>${results.diagosisCount}</div>
		<div><b>Query Time : </b> ${results.queryTime} ms </div>
		<div><b>Top 20 Diagnosis</b></div>
	</div>
	<div>
		<table>
			<c:forEach items="${results.diagnosisList}" var="diagnosis">
				<tr>
					<td>
						<u>${diagnosis}</u>
					</td>
				</tr>
			</c:forEach>
		</table>
	</div>
</div>
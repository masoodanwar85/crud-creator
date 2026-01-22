<table border="1">
<tr>
<th>name</th>
<th>age</th>
</tr>

<cfloop array="#rc.records#" index="r">
<tr>
<td>#r.name#</td>
<td>#r.age#</td>
</tr>
</cfloop>
</table>

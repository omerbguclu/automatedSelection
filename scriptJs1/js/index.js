window.onload = function () {

 var i = 0;
 var inputCounter = 0;
 currentRow = null;
 $("button#savebutton").click(function () {
	var minAmt = $("#minAmt").val();
	var maxAmt = $("#maxAmt").val();
	var type = $("#type").val();
	i++;
	var new_row = "<tr id='row" + i + "' class='info'><td class='RowNumber'>"+ i +"</td><td class='minAmt'>" + minAmt +
	   "</td><td class='maxAmt'>" + maxAmt + "</td><td class='type'>" + type +
	   "</td><td><span class='editrow'><a class='fa fa-edit' href='javascript: void(0);'>edit</a></span></td><td><span class='deleterow'><a class='glyphicon glyphicon-trash' href=''>delete</a></span></tr>";
	if (currentRow) {

	   $("table tbody").find($(currentRow)).replaceWith(new_row);
	   currentRow = null;
	} else {
	   $("table tbody").append(new_row);
	}
	//i = val(('td.RowNumber').last().text());
	$("#minAmt").val($('td.minAmt').last().text());
	$("#maxAmt").val('');
	//$("#type").val('');
 });

 $(document).on('click', 'span.deleterow', function () {
	$(this).parents('tr').remove();
	return false;
 });
 $(document).on('click', 'span.editrow', function () {
	currentRow = $(this).parents('tr');
	$("#minAmt").val($(this).closest('tr').find('td.minAmt').text());
	$("#maxAmt").val($(this).closest('tr').find('td.maxAmt').text());
	$("#type").val($(this).closest('tr').find('td.type').text());
 });

 $("button#addInput").click(function () {
	 var new_Input = "<th>MaxAmmount" + inputCounter + "</th>";

	console.log(new_Input);

	 $("form#chargestableForm div.col-md-12 table#charges thead tr").first("th").append(new_Input);
	inputCounter++;
 });

}
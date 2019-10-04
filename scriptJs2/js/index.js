window.onload = function () {

	var i = 0;
	var inputCounter = 1;
	currentRow = null;


	$("button#addInput").click(function () {
		var new_Input = "<th id='input" + inputCounter + "'>MaxAmmount" + inputCounter + "</th>";

		console.log();
		updateRows();

		$("form#chargestableForm div.col-md-12 table#charges thead tr th#addColumn").before(new_Input);

		inputCounter++;
	});

	$("button#addRow").click(function () {
		var edited_Input = " ";

		//$("#rowCopyorClone").before("<tr><td>dasd" + inputCounter++ + "</td></tr>");
		$("#rowCopyorClone").before("<tr>");
		for (let index = 0; index < inputCounter; index++) {
			edited_Input = "<td>" + index + "</td>";
			$("#rowCopyorClone").before(edited_Input);
			console.log(edited_Input);
		}
		$("#rowCopyorClone").before("</tr>");
		//$("form# chargestableForm div.col - md - 12 table# charges thead tr ")

	});

	$(function () {
		$(document).on('dblclick', '[id*=input]', function (e) {
			e.stopPropagation(); //<-------stop the bubbling of the event here
			var currentEle = $(this);
			var value = $(this).html();
			updateVal(currentEle, value);
		});
	});


	function updateVal(currentEle, value) {
		$(currentEle).html('<input class="thVal" type="text" value="' + value + '" />');
		$(".thVal").focus();
		$(".thVal").keydown(function (event) {
			if (event.keyCode == 13) {
				$(currentEle).html($(".thVal").val());
			}
		});

		/*$(document).click(function () { // you can use $('html')
			$(currentEle).html($(".thVal").val());
		});*/
	}

	function updateRows(){
		var row = $('#rowCopyorClonetBody > tr');
		var rowChilds = $('#rowCopyorClonetBody > tr');
		var rowCount = row.length;
		if ( rowCount>1) {
			for (let index = 0; index < rowCount; index++) {
				//console.log(rowChilds.length);
			}
			var i = 0;
			rowChilds.each(function(){console.log(i++)});
			console.log("passed");
		}
	}

}
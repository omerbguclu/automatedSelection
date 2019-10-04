window.onload = function () {

 var i = 0;
 var inputCounter = 1;
 currentRow = null;


 $("button#addInput").click(function () {
	 var new_Input = "<th id='input" + inputCounter + "'>MaxAmmount" + inputCounter + "</th>";

	console.log(new_Input);

	 $("form#chargestableForm div.col-md-12 table#charges thead tr th#addColumn").before(new_Input);
	inputCounter++;
 });

  $("button#editInput").click(function () {
	var edited_Input = " ";

	for (let index = 0; index < inputCounter; index++) {
		edited_Input = $('th#input' + index).text();
		$('th#input' + index).html('<input value =' + edited_Input +' ></input>');
		console.log(edited_Input);

		
	}
	//$("form# chargestableForm div.col - md - 12 table# charges thead tr ")

  });


}
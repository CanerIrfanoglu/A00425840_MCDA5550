var SERVER_URL = 'http://dev.cs.smu.ca:8122';

 function saveNumbers() {

	var obj = {
		"num1": $("#Num1").val(),
		"num2": $("#Num2").val(),
		"fileName": "result.txt"
	};
	
	//now send the request
	$.post(SERVER_URL + "/addNumbers",
			obj,
			function (data) {
				alert("Result saved successfully!");
			}).fail(function (error) {
		alert("Error: " +error.responseText);
	});
}//end function

//client side
 function getResult() {
	 
 //now sends request
		$.post(SERVER_URL + "/getResult",
				function (data) {
					alert("Result received successfully!" + data);
					$('#result').html(data);//write to the element
				}).fail(function (error) {
			alert("Error: " +error.responseText);
		});
 }

var SERVER_URL = 'http://dev.cs.smu.ca:8144';
function search () {

	 if ($("#searchKey").val() == "") {
	 	displayRecords();
	 }
	 else
		{
	
                  var newObj = {"search":$("#searchKey").val()}; 
                  
                  $.post(SERVER_URL + "/getDetails",newObj,
                        
                    function (data) {
                       
                              uni = data;

        if (uni == null || uni.length == 0) {           
      alert("No record found"); //no record whatsoever, let the user know
  }
  else {
      alert('Records downloaded successfully!');
      
          var name = uni[0].Name;  
          var address = uni[0].Address;
          var phoneNumber= uni[0].PhoneNumber;


           $('#name').val(name);
           $('#address').val(address);
           $('#phone').val(phoneNumber);
        

  }//end else 

                        }).fail(function (error) {
                        alert("Error: " +error.responseText);
                         });                 
           // }//end if validateData()
        }//end function



}
 



function dlt () {
                  var newObj = {"delete":$("#deleteKey").val()}; 
                  
                  $.post(SERVER_URL + "/deleteDetails",newObj,
                        
                    function (data) {
                       
                      alert(data.n);//attribute "n"
                      emptyFields();
                        }).fail(function (error) {
                        alert("Error: " +error.responseText);
                         });                 
           // }//end if validateData()
        }//end function


function Save() {
    if (validate()) {
        var newObj = {
            "Name": $("#name").val(),
            "Address": $("#address").val(),
            "PhoneNumber": $("#phone").val()
        };
        $.post(SERVER_URL + '/saveUniversity', newObj,
                function (data) {
                    alert(data);
                    emptyFields();
                }).fail(function (error) {
            alert("Error: " + error.responseText);
        });
    }
}


function validate() {
    var name = $("#name").val();
    var address = $("#address").val();
    var phone = $("#phone").val();

    //check empty fields
    if (name == '') {
        alert("Please Enter University Name!");
        $("#name").focus();
        return false;
    }

    if (address == '') {
        alert("Please Enter Address!");
        $("#address").focus();
        return false;
    }

    if (phone == '') {
        alert("Please Enter Phone Number!");
        $("#phone").focus();
        return false;
    }

    var numericExpression = /^[0-9]+$/;
    if (!phone.match(numericExpression)) {
        alert("Please Enter Valid Number");
        $("#phone").focus();
        return false;
    }

    return true;
}


function displayRecords() {

    $.post(SERVER_URL + '/displayUniversity',
            function (data) {
                var universities = data;
                if (universities == null) {
                    //no record whatsoever, let the user know
                    alert("No Record Found!");
                } else {
                    var dataTable = document.getElementById('all_data');
                    dataTable.innerHTML = '';

                    var row = dataTable.insertRow(0);
                    var name = row.insertCell(0);
                    var address = row.insertCell(1);
                    var phone = row.insertCell(2);

                    name.innerHTML = 'Name';
                    address.innerHTML = 'Address';
                    phone.innerHTML = 'Phone';

                    for (var i = 0; i < universities.length; i++) {
                        var row = dataTable.insertRow(-1);
                        var n1 = row.insertCell(0);
                        var n2 = row.insertCell(1);
                        var n3 = row.insertCell(2);
                        n1.innerHTML = universities[i].Name;
                        n2.innerHTML = universities[i].Address;
                        n3.innerHTML = universities[i].PhoneNumber;
                    }
                }

            }).fail(function (error) {
        alert("Error: " + error.responseText);
    });
}

function saveInfo () {
            if (validateData()) {
                //create an object
                var newObj = {
                    "Name": $("#name").val(),
                    "Address": $("#address").val(),
                    "PhoneNumber": $("#phone").val()

                };

                alert('Save info is running');
                
                /**
                 * Implement the rest
                 * 
                 * 1) "post" the data (newObj) to the server
                 *      (the data should be saved by your server-side script
                 * 2) If error, alert the user
                 * 
                 */
            }//end if validateData()
        }//end function

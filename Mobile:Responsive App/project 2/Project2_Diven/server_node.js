
const SERVER_PORT = 8144;
var express = require('express');


//CORS Middleware, causes Express to allow Cross-Origin Requests
// Do NOT change anythinghere
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
};


//set up the server variables
var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/css'));
app.use(express.static(__dirname));


//mongo db connection

var mongodb = require('mongodb');
//NAME_OF_COLLECTION = 'rectangles';
//const SERVER_PORT = 9898;
var user = 'dk_sambhwani';
var password = 'A00425915';
var database = 'dk_sambhwani';

//These should not change, unless the server spec changes
var host = '127.0.0.1';
var port = '27017'; // Default MongoDB port


// Now create a connection String to be used for the mongo access
var connectionString = 'mongodb://' + user + ':' + password + '@' +
    host + ':' + port + '/' + database;

console.log(connectionString);

//#############################################
//the var for the rectangle collections
var universitiesCollection;
const NAME_OF_COLLECTION = 'universities';
//#############################################

//now connect to the db
mongodb.connect(connectionString, function (error, db) {
    
    if (error) {
        throw error;
    }//end if

    universitiesCollection = db.collection(NAME_OF_COLLECTION);

    // Close the database connection and server when the application ends
    process.on('SIGTERM', function () {
        console.log("Shutting server down.");
        db.close();
        app.close();
    });

 //now start the application server
    var server = app.listen(SERVER_PORT, function () {
    console.log('Listening on port %d',
        server.address().port);
    });
});


app.post('/getDetails', function (request, response) {

    var search = request.body.search;
    console.log(search);
    universitiesCollection.find({"Name":search},
         //skip the argument (empty key) to get all records 

        function (err, result) {

           if (err) {
               return response.send(400,'An error occurred retrieving records.');
           }//end if
           
           //now result is expected to be an array of rectangles
        result.toArray(
            function (err, resultArray) {
            if (err) {
                return response.send(400, 'An error occurred processing your records.');
            }//end if

            //if succeeded, send it back to the calling thread
            return response.send(200, resultArray);
        });
       });
    });




app.post('/deleteDetails', function (request, response) {

    var dlt = request.body.delete;
    console.log(dlt);
    universitiesCollection.remove({"Name":dlt},
    
         //skip the argument (empty key) to get all records 

        function (err, returnedStr) {

           if (err) {
               return response.send(400,'An error occurred deleting records.');
           }//end if
           
           //now result is expected to be an array of rectangles
             var obj = JSON.parse(returnedStr);//convert it to an obj
            console.log(obj.n + " records"); //contain # of removed docs
            return response.send(200, returnedStr);

       });
    });

app.post('/displayUniversity', function (request, response) {
    universitiesCollection.find(function (err, result) {
        if (err) {
            return response.send(400, 'An error occurred retreving records.');
        }//end if
        result.toArray(
                function (error, resultArray) {
                    if (error) {
                        return response.send(400, 'An error occurred processing your records.');
                    }//end if
                    
                    //if succeeded, send it back to the calling thread
                    return response.send(200, resultArray);
                });
    });
});

app.post('/saveUniversity', function (request, response) {

    var cnt = universitiesCollection.count({'Name': request.body.Name}, function (err, result) {

        if (err) {
            return response.send(200, error)
        }
        console.log('Count: %d', result);

        if (result == 0) {
            universitiesCollection.insert(request.body,
                    function (err, reslt) {
                        if (err) {
                            return response.send(400, 'An error occurred saving a record.');
                        }//end if

                        return response.send(200, "Record inserted successfully.");
                    });
        } else {
            return response.send(200, "Record Exists.");
        }

    });
});


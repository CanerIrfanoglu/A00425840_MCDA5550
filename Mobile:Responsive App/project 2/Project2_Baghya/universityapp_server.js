var mongodb = require('mongodb');
var express = require('express');
const SERVER_PORT = 8122;
var user = 'ca_irfanoglu';
var password = 'A00425840';
var database = 'ca_irfanoglu';


var host = '127.0.0.1';
var port = '27017'; // Default MongoDB port

// Now create a connection String to be used for the mongo access
var connectionString = 'mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + database;

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

var unidb;
const Collection_name = 'universities';


mongodb.connect(connectionString, async function (error, db) {
  
  if (error) {
    throw error;
    }//end if
    console.log(connectionString);
    const collections = await db.collections();
    if (!collections.map(c => c.s.name).includes(Collection_name)) {
     await db.createCollection(Collection_name);
   }

   unidb = db.collection(Collection_name);

    // Close the database connection and server when the application ends
    process.on('SIGTERM', function () {
      console.log("Server Shutting down.");
      db.close();
      app.close();
    });

 //now start the application server
 var server = app.listen(SERVER_PORT, function () {
  console.log('Listening on port %d',
    server.address().port);
});
});

app.post('/search',function(request, response){
  console.log(request.body.Name);    
  var name =  request.body.Name; 
  unidb.count({"Name": name},function (err, result) {

   if (err) {
     return response.send(400,'Error occurred while retrieving records.');
           }//end if

           //now result is expected to be an array of rectangles
           console.log("Results of search query :");
           console.log(result);
           if(result == 1) {
             console.log("Searching Record..");
             unidb.find({"Name":name},
               function (err, result1) {//use empty to get all records
                 if (err) {
                  return response.send(400,'Error occurred while saving record.');
                   }//end if
                   
                   result1.toArray(
                     function (err, resultArray) {
                       if (err) {
                        return response.send(400, 'Error occurred while processing records.');
                      }      
                      return response.send(200, resultArray);
                    });
                 });
           } else {
             return response.send(400,'Record not found!');
           }
           return result;
         });

});

app.post('/display',function(request, response){
  console.log("Display query executed ");
  unidb.find(
   function (err, result1) {
     if (err) {
      return response.send(400,'Error occurred while saving record.');
    }

    result1.toArray(
     function (err, resultArray) {
       if (err) {
        return response.send(400, 'Error occurred while processing records.');
      }
      return response.send(200, resultArray);
    });
  });
  
});

app.post('/saveUniversity', function(request, response){
	console.log(request.body.Name);
	console.log(request.body.Address);
	console.log(request.body.PhoneNumber);
  var name =  request.body.Name;
  var address = request.body.Address;
  var phone = request.body.PhoneNumber;
  var count;
  var count = unidb.count({"Name": name },function (err, result) {

   if (err) {
     return response.send(400,'Error occurred while retrieving mongo records.');
           }//end if
           
           console.log("Results of save query");
           console.log(result);
           if(result == 0) {
             console.log("Inserting record..")
             unidb.insert(request.body,
               function (err, result1) {//use empty to get all records
                 if (err) {
                  return response.send(400,'Error occurred while saving record.');
                   }//end if

                   return response.send(200, "Record saved successfully.");
                 });
           } else {
             return response.send(400,'Record already exists!');
           }

           return result;
           // return response.send(200, result);
         });           

});

app.post('/delete',function(request, response){
  console.log(request.body.Name);
       // console.log(request.body.Address);
        //console.log(request.body.PhoneNumber);
        console.log(request.body);
        var name =  request.body.Name;
        var address = request.body.Address;
        var phone = request.body.PhoneNumber;
        var count = unidb.count({"Name": name},function (err, result) {

         if (err) {
           return response.send(400,'An error occurred retrieving records.');
           }//end if

           
           console.log("Results of delete query");
           console.log(result);
           if(result == 1) {
             console.log("Attempting to Delete Record..");
             unidb.remove(request.body,
               function (err, result1) {//use empty to get all records
                 if (err) {
                  return response.send(400,'Error occurred while saving record.');
                   }//end if
                   console.log(request.body);    
                   return response.send(200, "Record deleted successfully.");
                 });
           } else {
             return response.send(400,'Record not found!');
           }
           return result;
         });     
      });



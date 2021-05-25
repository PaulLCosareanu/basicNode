//Import the express module
const express = require('express');

//import the database module
const mysql = require('mysql');




// ***************************************************************************************************************************************************
//The express module is a function. When it is executed it returns an app object
const app = express();


// ***************************************************************************************************************************************************
//Create a connection pool with the user details
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost", //or wherever the database is situated
    user: "exampleUsername", //the username of the database used for authentication
    password: "examplePassword", //the password of the user
    database: "db", //the name of the database that you want to modify
    debug: false

});




// **********************************************************************************************************************************************8
//Set up express to serve static files from the directory called 'public'
app.use(express.static("public")); 

//REST API example   app.(get,post,etc)("your route", your function)
app.get("[yourRoute]",getFunction);
app.post("[yourRoute]",addItemToDatabase);
app.put("[yourRoute]", updateItem);
app.delete("[yourRoute]",deleteItem);



//database functions
// ***************************************************************************************************************************************************
// update function

function updateItem(request,response){

    let sql="UPDATE <tableName> SET <attributeName>=<yourValue>";

    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
           response.send("<Attribute Name> updated");
           
        }
    });

}


// **************************************************************************************************************************************************
// delete function 

function deleteItem(request,response){
    let sql="DELETE FROM <tableName> WHERE <attributeName>=<yourValue>"; 
   connectionPool.query(sql, (err, result) => {
    if (err) {//Check for errors
        console.error("Error executing query: " + JSON.stringify(err));
    }
    else {
       response.send("Item Deleted Succesfully!");
      
    }
});
}


// ***************************************************************************************************************************************************
// get data

function getFunction(request,response){
    let sql = "SELECT <* or attribute name(s)> FROM <tableName>";

    connectionPool.query(sql, (err, result) => {
        if (err) {//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else {
           
            let object = JSON.stringify(result); //stringify the data
            response.send(object); // send it
          
        }
    });

}


// *******************************************************************************************************************************************************
// submit a comment


function addItemToDatabase(request,response){
    let sql="INSERT INTO <tableName>(<attribute1>,<attribute2>) VALUES (<value1>,<value2>)";
    connectionPool.query(sql,(err,result)=>{
        
        if(err){
            console.error("Error executing query: " + JSON.stringify(err));
            response.send(err)
        }
        else{
            response.send("Item added")
        }

    });
}

//************************************************************************************************************************************************************ */
//Start the app listening on port 8080
app.listen(8080, () => {
    console.log("server started at 8080 press control button + c to stop");
});





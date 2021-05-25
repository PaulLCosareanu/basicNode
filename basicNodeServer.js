//Import the express module
const express = require('express');



// ***************************************************************************************************************************************************
//The express module is a function. When it is executed it returns an app object
const app = express();


// **********************************************************************************************************************************************8
//Set up express to serve static files from the directory called 'public'
app.use(express.static("public"));

//***************************************************************************************************************************************************** */
//Start the app listening on port 8080
app.listen(8080, () => {
    console.log("server started at 8080 press control button + c to stop");
});





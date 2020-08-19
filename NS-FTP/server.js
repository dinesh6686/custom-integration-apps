var expressExtension = require('express-integrator-extension')
var serverFunctions = require('./serverfunctions')
var systemToken = '************************'
var options = {
    connectors: { 
        '*******************': serverFunctions 
    },
    systemToken : systemToken,
    port :8000
}
console.log("Starting server!!!!!!!!!!");
expressExtension.createServer(options,function(err){
    if(err) {
        console.log("Failed to create the server!Try again later! \n"+ JSON.stringify(error));       
    }
    else  console.log('Server started!!!');
})

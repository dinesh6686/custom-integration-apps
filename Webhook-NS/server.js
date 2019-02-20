var expressExtension = require('express-integrator-extension')
var serverFunctions = require('./serverfunctions')
var systemToken = 'c421ab97e4ac432fa7ef14f34d2ea653'
var options = {
    connectors: { 
        '5c6af51511cbbf67f57a9e96': serverFunctions 
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

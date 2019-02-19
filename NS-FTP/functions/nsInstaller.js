'use strict'
var _ = require('lodash')
var request = require('request')
var importConnection = require('../src/ImportConnection')
var exportConnection = require('../src/ExportConnection')
var importResource = require('../src/createImport')
var exportResource = require('../src/createExport')
var flow = require('../src/flow')
var requestHandler = require('../helper/requestHandler')
var jsonLoader = require('../helper/jsonLoader')
var resourceOptions = {

}

function nsInstaller() {

}

nsInstaller.prototype.installConnector = function (options, callback) {
    exportConnection(options, function (error1, response1, data) {
        if (!error1) {
            resourceOptions.exportConnectionId = response1.body._id
            importConnection(options, function (error2, response2, data) {
                if (!error2) {
                    resourceOptions.importConnectionId = response2.body._id
                    flow(options, function (error3, resposne3, data) {
                        if (!error3) {
                            resourceOptions.flowId = resposne3.body._id
                            var config = {
                                bearerToken: options.bearerToken,
                                id: options._integrationId,
                                resourceType: 'integrations',
                                body: jsonLoader('../data/integrationData')
                            }
                            config.body._connectorId = options._connectorId
                            config.body.install[0]._connectionId = response1.body._id
                            config.body.install[1]._connectionId = response2.body._id
                            config.body.settings.sections[0].flows[0]._id = resposne3.body._id
                            requestHandler(config, function (error, response, body) {
                                if (!error){
                                    console.log(JSON.stringify(response));   
                                    callback(null, null)
                                } 
                                else callback(error, null)
                            })
                        }
                        else callback(error3, null)
                    })
                }
                else callback(error2, null)
            })
        }
        else callback(error1, null)
    })
    
  
}
nsInstaller.prototype.netsuiteInstaller = function (options, callback) {
    var responseData = {
        success: true,
        stepsToUpdate: [{
            "imageURI": "/images/company-logos/netsuite.png",
            "completed": true,
            "name": "NetSuite-Connector Connection for SC",
            "description": "Please Provide Netsuite Credentials",
            "installerFunction": "netsuiteInstaller",
            "_connectionId": resourceOptions.exportConnectionId
        }]
    }
    resourceOptions.bearerToken = options.bearerToken
    exportResource(resourceOptions,function(error,response,body){  
        if(!error){
            console.log('\n REsource options:\n',JSON.stringify(resourceOptions));
            
            resourceOptions.expId = response.body._id
            callback(null,responseData,null)
        }
        else callback(error,null,null)
    })
}
nsInstaller.prototype.ftpInstaller = function (options, callback) {
    var responseData = {
        success: true,
        stepsToUpdate: [{
            "imageURI": "/images/company-logos/ftp.png",
            "completed": true,
            "name": "FTP-connector Connection for SC",
            "description": "Please Provide FTP Credentials",
            "installerFunction": "ftpInstaller",
            "_connectionId": resourceOptions.importConnectionId
        }]
    }
    resourceOptions.bearerToken = options.bearerToken
    importResource(resourceOptions,function(error,response,body){  
        if(!error){
            resourceOptions.impId = response.body._id
            updateIntegration(options, function (err, res, bdy) {
                if (!err) callback(null, responseData,null)
                else callback(err, null, null)
            })
            //callback(null,responseData)
        }
        else callback(error,null,null)
    })
}

var updateIntegration = function(options,callback){
    var conf={
        bearerToken:options.bearerToken,
        resourceType:'integrations',
        id:options._integrationId ,
        body:{}
    }
    updateFlow(options,function(error,response,body){
        if(!error)  console.log('\nFlow Updated\n'+JSON.stringify(response)+'\n');
        else console.log('\nFlow Updated Failed\n'+JSON.stringify(response)+'\n');
    })
    requestHandler(conf,function(error,response,body){
        if(!error){
            conf.body =response.body
            conf.body.mode ='settings'
            requestHandler(conf,function(err,res,bdy){
                callback(err,res,bdy)
            })
        }
        else callback(error,null,null)
    })
}
var updateFlow=function(options,callback){
    var conf={
        bearerToken:options.bearerToken,
        resourceType:'flows',
        id:resourceOptions.flowId,
        body:{}
    }
    requestHandler(conf,function(error,response,body){
        if(!error){
            conf.body =response.body
            conf.body._exportId=resourceOptions.expId
            conf.body._importId=resourceOptions.impId
            //conf.body.disabled=false
            requestHandler(conf,function(err,res,bdy){
                callback(err,res,bdy)
            })
        }
        else callback(err,null,null)
    })
}

nsInstaller.prototype.updateConnector = function (options, callback) {
    var config = {
        uri: url + '/integrations/' + options._integrationId,
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + options.bearerToken,
            'Content-Type': 'application/json',
            'Charset': 'utf8'
        },
        json: {}
    }
    request(config, function (err, response, data) {
        if (err) console.log('err \n' + JSON.stringify(err.message));
        else console.log('Response \n' + JSON.stringify(data));
        config.method = 'PUT'
        config.json = data
        config.json.updateInProgress = false
        request(config, function (err, response, data) {
            if (err) console.log('err \n' + JSON.stringify(err.message));
            else console.log('response \n' + JSON.stringify(response));
            callback({
                message: 'Error'
            }, {
                message: 'Error'
            })
        })
    })

}


module.exports = nsInstaller
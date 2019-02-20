'use strict'
var _ = require('lodash')
var request = require('request')
var importConnection = require('../src/ImportConnection')
var importConnection2 = require('../src/ImportConnection2')
var exportConnection = require('../src/ExportConnection')
//var exportConnection2 = require('../src/ExportConnection2')
var importResource = require('../src/createImport')
var importResource2 = require('../src/createImport2')
var exportResource = require('../src/createExport')
var exportResource2 = require('../src/createExport2')
var flow = require('../src/flow')
var flow2 = require('../src/flow2')
var requestHandler = require('../helper/requestHandler')
var jsonLoader = require('../helper/jsonLoader')
var async = require('async')
var resourceOptions = {

}

function nsInstaller() {

}

nsInstaller.prototype.installConnector = function (options, callback) {
    async.series([
        function (inlineCallback) {
            exportConnection(options, function (error1, response1, data) {
                if (!error1) {
                    resourceOptions.exportConnectionId1 = response1.body._id
                    importConnection(options, function (error2, response2, data) {
                        if (!error2) {
                            resourceOptions.importConnectionId1 = response2.body._id
                            flow(options, function (error3, resposne3, data) {
                                if (!error3) {
                                    resourceOptions.flowId1 = resposne3.body._id
                                    inlineCallback(null,options)
                                } else inlineCallback(error3,null)
                            })
                        } else inlineCallback(error2,null)
                    })
                } else inlineCallback(error1,null)
            })
        },
        function (inlineCallback) {
            importConnection2(options, function (error2, response2, data) {
                if (!error2) {
                    resourceOptions.importConnectionId2 = response2.body._id
                    flow2(options, function (error3, resposne3, data) {
                        if (!error3) {
                            resourceOptions.flowId2 = resposne3.body._id
                            inlineCallback(null,options)
                        } else inlineCallback(error3, null)
                    })
                } else inlineCallback(error2, null)
            })
        }
    ], function (err, response, body) {
        var config = {
            bearerToken: options.bearerToken,
            id: options._integrationId,
            resourceType: 'integrations',
            body: jsonLoader('../data/integrationData')
        }
        config.body._connectorId = options._connectorId
        config.body.install[0]._connectionId = resourceOptions.exportConnectionId1
        config.body.install[1]._connectionId = resourceOptions.importConnectionId1
        config.body.install[3]._connectionId = resourceOptions.importConnectionId2
        config.body.settings.sections[1].flows[0]._id = resourceOptions.flowId2
        config.body.settings.sections[0].flows[0]._id = resourceOptions.flowId1
        requestHandler(config, function (error, response, body) {
            if (!error) {
                console.log(JSON.stringify(response));
                callback(null, null)
            } else callback(error,null)
        })  
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
            "_connectionId": resourceOptions.exportConnectionId1
        }]
    }
    resourceOptions.bearerToken = options.bearerToken
    exportResource(resourceOptions, function (error, response, body) {
        if (!error) {
            console.log('\n REsource options:\n', JSON.stringify(resourceOptions));

            resourceOptions.expId1 = response.body._id
            callback(null, responseData, null)
        } else callback(error, null, null)
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
            "_connectionId": resourceOptions.importConnectionId1
        }]
    }
    resourceOptions.bearerToken = options.bearerToken
    importResource(resourceOptions, function (error, response, body) {
        if (!error) {
            resourceOptions.impId1 = response.body._id
            updateIntegration(options, function (err, res, bdy) {
                if (!err) callback(null, responseData, null)
                else callback(err, null, null)
            })
            //callback(null,responseData)
        } else callback(error, null, null)
    })
}
nsInstaller.prototype.webhookInstaller = function (options, callback) {
    var responseData = {
        success: true,
        stepsToUpdate: [{
            "imageURI": "/images/company-logos/netsuite.png",
            "completed": true,
            "name": "Webhook Connection for SC",
            "description": "Please Provide Credentials for Webhook",
            "installerFunction": "webhookInstaller"
        }]
    }
    resourceOptions.bearerToken = options.bearerToken
    exportResource2(resourceOptions, function (error, response, body) {
        if (!error) {
            console.log('\n Resource options:\n', JSON.stringify(resourceOptions));

            resourceOptions.expId2 = response.body._id
            callback(null, responseData, null)
        } else callback(error, null, null)
    })
}
nsInstaller.prototype.nsInstaller2 = function (options, callback) {
    var responseData = {
        success: true,
        stepsToUpdate: [{
            "imageURI": "/images/company-logos/netsuite.png",
            "completed": true,
            "name": "Netsuite Connection2 for SC",
            "description": "Please Provide NS Credentials",
            "installerFunction": "nsInstaller2",
            "_connectionId": resourceOptions.importConnectionId2
        }]
    }
    resourceOptions.bearerToken = options.bearerToken
    importResource2(resourceOptions, function (error, response, body) {
        if (!error) {
            resourceOptions.impId2 = response.body._id
            updateIntegration(options, function (err, res, bdy) {
                if (!err) callback(null, responseData, null)
                else callback(err, null, null)
            })
        } else callback(error, null, null)
    })
}
var updateIntegration = function (options, callback) {
    var conf = {
        bearerToken: options.bearerToken,
        resourceType: 'integrations',
        id: options._integrationId,
        body: {}
    }
    updateFlow1(options, function (error, response, body) {
        if (!error) console.log('\nFlow1 Updated\n' + JSON.stringify(response) + '\n');
        else console.log('\nFlow Updated Failed\n' + JSON.stringify(response) + '\n');
    })
    updateFlow2(options, function (error, response, body) {
        if (!error) console.log('\nFlow2 Updated\n' + JSON.stringify(response) + '\n');
        else console.log('\nFlow Updated Failed\n' + JSON.stringify(response) + '\n');
    })
    requestHandler(conf, function (error, response, body) {
        if (!error) {
            conf.body = response.body
            conf.body.mode = 'settings'
            requestHandler(conf, function (err, res, bdy) {
                callback(err, res, bdy)
            })
        } else callback(error, null, null)
    })
}
var updateFlow1 = function (options, callback) {
    var conf = {
        bearerToken: options.bearerToken,
        resourceType: 'flows',
        id: resourceOptions.flowId1,
        body: {}
    }
    requestHandler(conf, function (error, response, body) {
        if (!error) {
            conf.body = response.body
            conf.body._exportId = resourceOptions.expId1
            conf.body._importId = resourceOptions.impId1
            //conf.body.disabled=false
            requestHandler(conf, function (err, res, bdy) {
                callback(err, res, bdy)
            })
        } else callback(err, null, null)
    })
}
var updateFlow2 = function (options, callback) {
    var conf = {
        bearerToken: options.bearerToken,
        resourceType: 'flows',
        id: resourceOptions.flowId2,
        body: {}
    }
    requestHandler(conf, function (error, response, body) {
        if (!error) {
            conf.body = response.body
            conf.body._exportId = resourceOptions.expId2
            conf.body._importId = resourceOptions.impId2
            //conf.body.disabled=false
            requestHandler(conf, function (err, res, bdy) {
                callback(err, res, bdy)
            })
        } else callback(err, null, null)
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
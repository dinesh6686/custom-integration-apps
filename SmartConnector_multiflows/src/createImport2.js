var requestHandler = require('../helper/requestHandler')

function createImport(options, callback) {
    var config = {
        bearerToken: options.bearerToken,
        resourceType: 'imports',
        body: {
            "name": "Backend Import NetSuite Customer in SC",
            "responseTransform": {
                "type": "expression",
                "expression": {
                    "version": "1"
                },
                "version": "1"
            },
            "parsers": [],
            '_connectionId': options.importConnectionId2,
            "distributed": true,
            "lookups": [],
            "netsuite_da": {
                "operation": "add",
                "recordType": "customer",
                "lookups": [],
                "mapping": {
                    "lists": [],
                    "fields": [{
                            "generate": "isperson",
                            "extract": "isperson",
                            "internalId": false,
                            "immutable": false,
                            "discardIfEmpty": false
                        },
                        {
                            "generate": "subsidiary",
                            "extract": "subsidiary",
                            "internalId": true,
                            "immutable": false,
                            "discardIfEmpty": false
                        },
                        {
                            "generate": "firstname",
                            "extract": "firstname",
                            "internalId": false,
                            "immutable": false,
                            "discardIfEmpty": false
                        },
                        {
                            "generate": "lastname",
                            "extract": "lastname",
                            "internalId": false,
                            "immutable": false,
                            "discardIfEmpty": false
                        },
                        {
                            "generate": "entitystatus",
                            "extract": "entitystatus",
                            "internalId": true,
                            "immutable": false,
                            "discardIfEmpty": false
                        }
                    ]
                }
            },
            "adaptorType": "NetSuiteDistributedImport"
        }
    }
    requestHandler(config, function (error, response, body) {
        if (!error) {
            console.log('\nImport2 Created\n' + JSON.stringify(response) + '\n');
            callback(null, response, body)
        } else {
            console.log('\nImport2 Failed\n' + JSON.stringify(error) + '\n');
            callback(error, null, null)
        }
    })
}
module.exports = createImport
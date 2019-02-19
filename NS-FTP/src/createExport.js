var requestHandler = require('../helper/requestHandler')
function createExport(options, callback) {
    var config = {
        bearerToken: options.bearerToken,
        resourceType: 'exports',
        body: {
            'name': 'Backend Export NS for a SmartConnector',
            '_connectionId': options.exportConnectionId,
            'asynchronous': true,
            "netsuite": {
                "type": "restlet",
                "skipGrouping": false,
                "statsOnly": false,
                "restlet": {
                    "recordType": "inventoryitem",
                    "searchId": "customsearch97928",
                    "batchSize": 20,
                    "hooks": {
                        "batchSize": 20
                    }
                }
            },
            "adaptorType": "NetSuiteExport"
        }
    }
    requestHandler(config, function (error, response, body) {
        if (!error) {
            console.log('\nExport Created\n' + JSON.stringify(response) + '\n');
            callback(null, response, body)
        } else {
            console.log('\nExport Failed\n' + JSON.stringify(error) + '\n');
            callback(error, null, null)
        }
    })
}
module.exports = createExport
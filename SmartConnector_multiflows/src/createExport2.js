var requestHandler = require('../helper/requestHandler')

function createExport(options, callback) {
    var config = {
        bearerToken: options.bearerToken,
        resourceType: 'exports',
        body: {
            "name": "Webhook export2",
            "type": "webhook",
            "parsers": [],
            "webhook": {
                "provider": "custom",
                "verify": "token",
                "token": "123456789",
                "path": "token"
            },
            "sampleData": {
                    "token": "123456789",
                    "subsidiary": 3,
                    "entitystatus": 13,
                    "lastname": "Venkat",
                    "firstname": "Dinesh",
                    "isperson": "true"
            },
            "transform": {
                "type": "expression",
                "expression": {
                    "version": "1"
                },
                "version": "1"
            },
            "filter": {
                "type": "expression",
                "expression": {
                    "version": "1"
                },
                "version": "1"
            }
        }
    }
    requestHandler(config, function (error, response, body) {
        if (!error) {
            console.log('\nExport2 Created\n' + JSON.stringify(response) + '\n');
            callback(null, response, body)
        } else {
            console.log('\nExport2 Failed\n' + JSON.stringify(error) + '\n');
            callback(error, null, null)
        }
    })
}
module.exports = createExport
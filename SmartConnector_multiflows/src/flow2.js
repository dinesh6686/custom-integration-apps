var requestHelper = require('../helper/requestHandler')

function createFlow(options, callback) {
    var config = {
        bearerToken: options.bearerToken,
        resourceType: 'flows',
        body: {
            "name": "Webhook to NS flow for SC",
            "_integrationId": options._integrationId,
            "skipRetries": false,
            "imageURI": "/images/company-logos/netsuite.png"
        }
    }
    requestHelper(config, function (error, response, body) {
        if (!error) {
            console.log('\nFlow2 Created\n' + JSON.stringify(response) + '\n');
            callback(null, response, body)
        } else {
            console.log('\nFlow2 Failed\n' + JSON.stringify(error) + '\n');
            callback(error, null, null)
        }
    })
}
module.exports = createFlow
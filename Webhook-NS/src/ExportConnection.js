var requesthandler = require('../helper/requestHandler')


function createExpConnection(options, callback) {
    var config = {
        bearerToken: options.bearerToken,
        resourceType: 'connections',
        body: {
            "type": "webhook",
            "name": "Webhook export for smart connector",
            "path": "token"
        }
    }
    requesthandler(config, function (error, response, body) {
        if (!error) {
            console.log('\nExportConnection Success\n' + JSON.stringify(response) + '\n');
            callback(null, response, body)
        } else {
            console.log('\nExportConnection Failed\n' + JSON.stringify(error) + '\n');
            callback(error, null, null)
        }
    })
}

module.exports = createExpConnection
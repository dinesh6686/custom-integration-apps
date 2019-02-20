var requestHandler = require('../helper/requestHandler')


function createImpConnection(options, callback) {
    var config = {
        bearerToken: options.bearerToken,
        resourceType: 'connections',
        body: {
            "type": "netsuite",
            "name": "NS-Connection2 for SC"
        }
    }
    requestHandler(config, function (error, response, body) {
        if (!error) {
            console.log('\nImportConnection2 Success\n' + JSON.stringify(response) + '\n');
            callback(null, response, body)
        } else {
            console.log(('\nImportConnection2 Failed\n' + JSON.stringify(error) + '\n'));
            callback(error, null, null)
        }
    })
}
module.exports = createImpConnection
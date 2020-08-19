'use strict'

function nsUninstaller(nsConnector) {

}

nsUninstaller.prototype.preUninstall = function (options, callback) {
    var responseData = {
        success: true,
        stepsToUpdate: []
    }
    callback(null, responseData)
}

nsUninstaller.prototype.integrationUninstall = function (options, callback) {
    deleteResource(options.bearerToken, 'integrators', options._integrationId, function (error, response) {
        if (error) {
            callback(error, null)
        } else {
            var responseData = {
                success: true,
                stepsToUpdate: []
            }
            callback(null, responseData)
        }
    })

}

nsUninstaller.prototype.uninstallConnector = function (resource, id, callback) {
    var config = {
        uri: url + resource + '/' + id,
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Charset': 'utf8'
        },
        json: {
            'name': 'NetSuite-FTP Connector Uninstaller',
            'uninstall': [{
                'completed': 'false',
                'name': 'NetSuite-Connector Integration',
                'description': 'Uninstall Integration',
                'uninstallerFunction': integrationUninstall,
            }]
        }

    }
    deleteResource(options.bearerToken, 'connectors', '****************', function (err, response) {
        if (error) {
            callback(error, null)
        } else callback(null, null)
    })

}
module.exports = nsUninstaller
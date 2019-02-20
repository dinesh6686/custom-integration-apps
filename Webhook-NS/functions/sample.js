nsInstaller.prototype.connectorInstaller = function (options, callback) {

    nsConnection(options.bearerToken, function (exConError, exConResponse) {
        if (!exConError) {
            console.log('nsConnection Created' + myEntities.nextLine + JSON.stringify(exConResponse) + myEntities.nextLine);
            var expConnectionId = exConResponse.body._id
            ftpConnection(options.bearerToken, function (impConError, impConResponse) {
                if (!impConError) {
                    console.log('ftpConnection Created' + myEntities.nextLine + JSON.stringify(impConResponse) + myEntities.nextLine);
                    var importConnectionId = impConResponse.body._id
                    updateIntegration(options.bearerToken, importConnectionId, expConnectionId, options._integrationId, options._connectorId, function (error, response) {
                        if (error) callback(error)
                        else {
                            console.log(myEntities.nextLine + JSON.stringify(response));
                            callback(null, null)
                        }
                    })
                }
                else {
                    console.log('Import conError' + myEntities.nextLine + JSON.stringify(conError) + myEntities.nextLine);
                    callback(conError, null)
                }
            })
        }
        else {
            console.log('Export conError' + myEntities.nextLine + JSON.stringify(conError) + myEntities.nextLine);
            callback(conError, null)
        }
    })


}
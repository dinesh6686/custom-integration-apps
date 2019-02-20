'use strict'

function nsSettings() {
}
nsSettings.prototype.persistSettings = function (options, callback) {
    console.log('\noptions\n'+JSON.stringify(options.pending)+'\n');

    var responseData = {
        success: true,
        pending:options.pending
    }
    console.log('\nresponse\n'+JSON.stringify(responseData)+'\n');
    return callback(null, responseData)

}
nsSettings.prototype.refreshMetadata = function (options, callback) {
    var responseData = {

    }
    callback(null, responseData)
}
nsSettings.prototype.changeEdition = function (options, callback) {
    callback(null, null)
}
nsSettings.prototype.getMappingMetadata = function (options, callback) {

    // var responseData = [
    //     {
    //         importId: [
    //             {
    //                 requiredGenerateFields: [

    //                 ],
    //                 nonEditableGenerateFields: [
      
    //                 ]
    //             },
    //             {
    //                 generateList: '',
    //                 requiredGenerateFields: [

    //                 ],
    //                 nonEditableGenerateFields: [

    //                 ]
    //             }
    //         ]
    //     }
    // ]
    callback(null, null)
}


module.exports = nsSettings
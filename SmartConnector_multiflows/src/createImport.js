var requestHandler = require('../helper/requestHandler')

function createImport(options, callback) {
    var config = {
        bearerToken: options.bearerToken,
        resourceType: 'imports',
        body: {
            'name': 'Backend Import FTP for a SmartConnector',
            "responseTransform": {
                "type": "expression",
                "expression": {
                    "version": "1"
                },
                "version": "1"
            },
            '_connectionId': options.importConnectionId1,
            'distributed': false,
            "mapping": {
                "fields": [{
                        "extract": "Name",
                        "generate": "Name"
                    },
                    {
                        "extract": "Type",
                        "generate": "Type"
                    },
                    {
                        "extract": "id",
                        "generate": "id"
                    },
                    {
                        "extract": "recordType",
                        "generate": "RecordType"
                    }
                ]
            },
            "file": {
                "skipAggregation": false,
                "type": "csv",
                "csv": {
                    "rowDelimiter": "\n",
                    "columnDelimiter": ",",
                    "includeHeader": true,
                    "wrapWithQuotes": false,
                    "replaceTabWithSpace": false,
                    "replaceNewlineWithSpace": false,
                    "customHeaderRows": [],
                    "headerRow": "Name,Type,id,RecordType\n"
                }
            },
            "ftp": {
                "directoryPath": "/dineshtest",
                "fileName": "smartConnector-{{timestamp}}.csv"
            },
            "filter": {
                "type": "expression",
                "expression": {
                    "rules": [],
                    "version": "1"
                },
                "version": "1",
                "rules": []
            },
            "adaptorType": "FTPImport"
        }
    }
    requestHandler(config, function (error, response, body) {
        if (!error) {
            console.log('\nImport Created\n' + JSON.stringify(response) + '\n');
            callback(null, response, body)
        } else {
            console.log('\nImport Failed\n' + JSON.stringify(error) + '\n');
            callback(error, null, null)
        }
    })
}
module.exports = createImport
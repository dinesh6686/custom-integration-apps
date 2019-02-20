var request = require('request')
var _ = require('lodash')

function requestHandler(options, callback) {

    if (!options||!options.bearerToken||!options.resourceType) callback(new Error('Options are missing'), null, null)
    else {
        var conf ={
            uri:'https://api.staging.integrator.io/v1/'+options.resourceType,
            method:'',
            headers:{
                Authorization:'Bearer '+options.bearerToken,
                'Content-Type':'application/json',
                'Charset':'utf8'
            }
        }
        if(options.id){
            conf.uri = conf.uri+'/'+options.id
            if(options.body){
                if(_.isEmpty(options.body)){     
                    conf.method ='GET'
                    conf.json = {}
                }
                else{
                    conf.method ='PUT'
                    conf.json =options.body
                }
            }
            else{
                conf.method ='DELETE'
                conf.json = {}
            }
        }
        else{
            conf.method ='POST'
            conf.json = options.body
        }
        request(conf,function(error,resposne,body){
            if(!error) callback(null,resposne,body)
            else callback(error,null,null)
        })
    }
}

module.exports = requestHandler
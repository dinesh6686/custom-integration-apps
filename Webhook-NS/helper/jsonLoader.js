function loadJson(path){
    try{
        if(require.cache){
            delete require.cache[require.resolve('../'+path)]
        }
        return require('../'+path)
    } catch(e){
        if (e.code === 'MODULE_NOT_FOUND'){
            if(require.cache){
                delete require.cache[require.resolve(path)]
                return require(path)
            }
        }
    }    
}
module.exports = loadJson 
'use strict'

var nsInstaller  = require('./nsInstaller')
, nsUninstaller = require('./nsUninstaller')
, nsSettings = require('./nsSettings')

function nsConnector(){
  
}
nsConnector.prototype.installer = new nsInstaller()

nsConnector.prototype.uninstaller = new nsUninstaller()

nsConnector.prototype.settings = new nsSettings()

module.exports = nsConnector

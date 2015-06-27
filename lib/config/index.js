var defaultConfig = require('./defaultConfig'),
    Config        = require('./config');

var config = new Config();
config.addSource(defaultConfig);

module.exports = config;
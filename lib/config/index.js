var defaultConfig = require('./defaultConfig'),
    jf            = require('jsonfile'),
    path          = require('path');
require('sugar');

jf.spaces = 4;

var configPath = path.join(defaultConfig.home, 'config.json');
var config = jf.readFileSync(configPath, {throws: false}) || {};

function Config (){
    "use strict";

}

Config.prototype.addSource = function addSource(obj) {
    "use strict";
    Object.merge(this, obj);
    return this;
};

Config.prototype.set = function (obj) {
    "use strict";
    Object.merge(config, obj);
    jf.writeFile(configPath, config);
};

Config.prototype.unset = function (keys) {
    "use strict";
    if(!Array.isArray(keys))
        keys = [keys];
    keys.forEach(function (key) {
        delete config[key];
    });
    jf.writeFile(configPath, config);
};

module.exports = new Config()
    .addSource(defaultConfig)
    .addSource(config);
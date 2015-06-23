var defaultConfig = require('./defaultConfig'),
    jf            = require('jsonfile'),
    path          = require('path');
require('sugar');

jf.spaces = 4;

var configPath = path.join(defaultConfig.home, 'config.json');
var config = jf.readFileSync(configPath, {throws: false}) || {};

function Config (){
    "use strict";
    this.sources = [];
}

Config.prototype.get = function (key) {
    var defaultValue = undefined;

    this.sources.forEach(function (source) {
        "use strict";
        if(source[key]){
            defaultValue = source[key];
        }
    });
    return defaultValue;
};

Config.prototype.addSource = function addSource(source) {
    "use strict";
    this.sources.add(source, 0);
    return this;
};

Config.prototype.set = function (obj) {
    "use strict";
    Object.merge(config, obj, true);
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
var defaultConfig = require('./defaultConfig'),
    jf            = require('jsonfile');
require('sugar');

jf.spaces = 4;

function Config() {
    "use strict";
    this.sources = [];
}

Config.prototype.get = function (key) {
    var defaultValue = undefined;
    this.sources.forEach(function (source) {
        "use strict";
        if (source[key]) {
            defaultValue = source[key];
        }
    });
    return defaultValue;
};

Config.prototype.readJsonConfig = function (path) {
    "use strict";
    var config = jf.readFileSync(path, {throws: false}) || {};
    this._externalConfig = config;
    this._externalConfigPath = path;
    return config;
};

Config.prototype.addSource = function addSource(source) {
    "use strict";
    if (Object.isString(source)) {
        source = this.readJsonConfig(source);
    }
    this.sources.add(source);
    return this;
};

Config.prototype.set = function (obj) {
    "use strict";
    if (!this._externalConfig || !this._externalConfigPath) {
        console.log("no config file to write config to");
        return;
    }
    Object.merge(this._externalConfig, obj, true);
    jf.writeFile(this._externalConfigPath, this._externalConfig);
};

Config.prototype.unset = function (keys) {
    "use strict";
    if (!Array.isArray(keys))
        keys = [keys];
    keys.forEach(function (key) {
        delete this._externalConfig[key];
    }.bind(this));
    jf.writeFile(this._externalConfigPath, this._externalConfig);
};

module.exports = new Config()
    .addSource(defaultConfig);
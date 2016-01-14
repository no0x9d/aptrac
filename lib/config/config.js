var jf = require('jsonfile');
require('sugar');

jf.spaces = 4;

module.exports = Config;

function Config() {
    "use strict";
    this.sources = [];
}

Config.prototype.get = function (key) {
    var defaultValue = undefined;
    this.sources.forEach(function (source) {
        "use strict";
        if (source[key] !== undefined) {
            defaultValue = source[key];
        }
    });
    return defaultValue;
};

Config.prototype.readJsonConfig = function (path) {
    "use strict";
    try {
        var config = jf.readFileSync(path) || {};
    } catch (e){
        config = {};
    }
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

Config.prototype.unset = function (params) {
    "use strict";
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var param = params[key];
            if (Object.isBoolean(param) && param) {
                delete this._externalConfig[key];
            } else if (Object.isObject(param)) {
                for (var key2 in param) {
                    if (param.hasOwnProperty(key2)) {
                        if (Object.isBoolean(param[key2]) && param[key2]) {
                            delete this._externalConfig[key][key2];
                        }
                    }
                }
            } else if (Object.isArray(param)) {
                param.forEach(function (key2) {
                    delete this._externalConfig[key][key2]
                }, this)
            }
        }
    }
    jf.writeFile(this._externalConfigPath, this._externalConfig);
};
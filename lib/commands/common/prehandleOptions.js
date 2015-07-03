var config = require('../../config'),
    initDB = require('../../util/init-db');
    path   = require('path');

module.exports = function preHandleOptions(options) {
    loadingConfigFile(options);
    handleAliases(options);
    var context = generateContext(options);
    return context;
};

function loadingConfigFile(options){
    if (options.config) {
        var configPath = path.join(config.get('home'), options.config + ".cfg");
        config.addSource(configPath);
    }
}

function handleAliases(options) {
    var aliases = config.get('alias');

    if (!aliases) return;

    options.options.forEach(function (option) {
        if (option.required !== 0 || option.optional !== 0) {
            var name = option.name();
            var optionValue = options[name];
            if (optionValue) {
                if (Object.isString(optionValue))
                    if (optionValue.startsWith('\\')) {
                        options[name] = optionValue.slice(1);
                    }
                    else {
                        var alias = aliases[optionValue];
                        if (alias) {
                            options[name] = alias;
                        } else {
                            // regex search and replace for alias with "{alias}" pattern
                            options[name] = optionValue.replace(/(?:([^\\]|^){(.+?)})/g, function (match, leadingChar, alias) {
                                var aliase = aliases[alias];
                                return aliase ? leadingChar + aliase : leadingChar;
                            });
                            // unescape string with escaped aliases \{alias}
                            options[name] = options[name].replace(/[^\\]{(.+?)}/g, function (match, escapedText) {
                                console.log(escapedText);
                                var aliase = aliases[escapedText];
                                return aliase !== undefined ? aliase : '';
                            });
                        }
                    }
            }
        }
    })
}

function generateContext(options, cb) {
    "use strict";

    var args = {};

    args.options = options;
    args.config = config;
    args.db = initDB(args);
    // callback compatible
    if (cb)
        cb(null, args);
    return args;
}
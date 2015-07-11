var config = require('../../config'),
    initDB = require('../../util/init-db');
    path   = require('path');

module.exports = function preHandleOptions(options) {
    var context = {};
    // check if options is actually a valid context;
    if(options.isContext){
        context = options;
        options = options.options;
    }
    handleAliases(options);
    context = generateContext(context, options);
    return context;
};

function loadingConfigFile(options){
    if (options.config) {
        var configPath = path.join(config.get('home'), options.config + ".cfg");
        config.addSource(configPath);
    }
    return config;
}

function handleAliases(options) {
    var aliases = config.get('alias');

    if (!aliases) return;

    options.options.forEach(function (option) {
        //FIXME dependency to commander options in core
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

function generateContext(context, options) {
    "use strict";

    context.options = options;
    context.config =  context.config || loadingConfigFile(options);
    context.db = context.db || initDB(context);
    return context;
}
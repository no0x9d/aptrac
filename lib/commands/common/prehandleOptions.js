var config = require('../../config'),
    initDB = require('../../util/init-db'),
    model  = require('../../model'),
    path   = require('path');

module.exports = function preHandleOptions(options) {
    var context = {};
    // check if options is actually a valid context;
    if (options.isContext) {
        context = options;
        options = options.options;
    }
    context = generateContext(context, options);
    handleAliases(options);
    return context;
};

function loadingConfigFile(options) {
    if (options.config) {
        var configPath = path.join(config.get('home'), options.config + ".cfg");
        config.addSource(configPath);
    }
    return config;
}

function handleAliases(options) {
    var aliases = config.get('alias');
    if (!aliases) return;

    var schema = model.schema;
    for (var fieldName in schema) {
        if (!schema.hasOwnProperty(fieldName))continue;

        var field = schema[fieldName];
        if (field.type === String) {
            var optionValue = options[fieldName];
            if (optionValue) {
                if (Object.isString(optionValue))
                    if (optionValue.startsWith('\\')) {
                        options[fieldName] = optionValue.slice(1);
                    }
                    else {
                        var alias = aliases[optionValue];
                        if (alias) {
                            options[fieldName] = alias;
                        } else {
                            // regex search and replace for alias with "{alias}" pattern
                            options[fieldName] = optionValue.replace(/(?:([^\\]|^){(.+?)})/g, function (match, leadingChar, alias) {
                                var aliase = aliases[alias];
                                return aliase ? leadingChar + aliase : leadingChar;
                            });
                            // unescape string with escaped aliases \{alias}
                            options[fieldName] = options[fieldName].replace(/[^\\]{(.+?)}/g, function (match, escapedText) {
                                console.log(escapedText);
                                var aliase = aliases[escapedText];
                                return aliase !== undefined ? aliase : '';
                            });
                        }
                    }
            }
        }
    }
}

function generateContext(context, options) {
    "use strict";

    context.options = options;
    context.config = context.config || loadingConfigFile(options);
    context.db = context.db || initDB(context);
    return context;
}
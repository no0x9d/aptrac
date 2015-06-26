var preHandleOptions = require('./prehandleOptions'),
    config = require('../../config');

module.exports = function handleSetUnset(options, method) {
    "use strict";
    preHandleOptions(options);
    var default_args = ["project", "note", "task", "db", "alias"];

    var values = copyOptions(options, {}, default_args);
    method(values);
    outputConfigToConsole(config)
};

function outputConfigToConsole(config) {
    var output = {};
    config.sources.forEach(function (source) {
        Object.merge(output, source, true);
    });
    console.log(output);
}

function copyOptions(options, copyBase, args) {
    "use strict";

    args = args || [];
    args.forEach(function (option) {
        if (options[option])
            copyBase[option] = options[option];
    });

    return copyBase;
}
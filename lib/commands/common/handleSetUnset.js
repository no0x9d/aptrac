var preHandleOptions = require('./prehandleOptions');

module.exports = function handleSetUnset(options, method) {
    "use strict";
    var context = preHandleOptions(options);
    var default_args = ["project", "note", "task", "db", "alias", "workHours"];

    var values = Object.select(context.options, default_args);
    method.call(context.config, values);
    outputConfigToConsole(context.config)
};

function outputConfigToConsole(config) {
    var output = {};
    config.sources.forEach(function (source) {
        Object.merge(output, source, true);
    });
    console.log(output);
}
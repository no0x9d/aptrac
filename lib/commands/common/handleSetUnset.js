var preHandleOptions = require('./prehandleOptions');

module.exports = function handleSetUnset(options, method, output) {
    "use strict";
    var context = preHandleOptions(options);
    var default_args = ["project", "note", "task", "db", "alias", "workHours"];

    var values = Object.select(context.options, default_args);
    method.call(context.config, values);
    output(null, context)
};
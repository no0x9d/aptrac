var initDB = require('./init-db');

var copyOptions = function (options, copyBase) {
    "use strict";
    copyBase.project = options.project;
    copyBase.note = options.note;
    copyBase.task = options.task;
    copyBase.start = options.start;
    copyBase.end = options.end;
    return copyBase;
};

function generateArgument(options, cb) {
    "use strict";

    var args = {};
    var changes = copyOptions(options, {});

    args.db = initDB(options);
    args.options = options;
    args.changes = changes;
    // callback compatible
    if (cb)
        cb(null, args);
    return args;
}

module.exports = generateArgument;
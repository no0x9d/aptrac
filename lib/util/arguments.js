var initDB = require('./init-db'),
    config = require('../config');

var default_args = ["project", "note", "task", "start", "end"];

var copyOptions = function (options, copyBase, args) {
    "use strict";

    args = args || default_args;
    args.forEach(function(option){
        if(options[option])
            copyBase[option] = options[option];
        else if( config[option])
            copyBase[option] = config[option];
    });

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
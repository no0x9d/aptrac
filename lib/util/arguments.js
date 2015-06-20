var initDB = require('./init-db');

var composeDateTime = function (date, time) {
    var temp = date.clone();
    temp.minutes(time.minutes());
    temp.hour(time.hours());
    return temp;
};

var copyOptions = function (options, copyBase) {
    "use strict";
    copyBase.project = options.project;
    copyBase.note = options.note;
    copyBase.task = options.task;
    return copyBase;
};

function generateArgument(options, cb) {
    "use strict";

    var args = {};
    var taskSettings = copyOptions(options, {});

    var datetime;
    if (options.time && !options.date) {
        datetime = options.time;
    } else if (!options.time && options.date) {
        datetime = options.date;
    } else if (options.time && options.date) {
        datetime = composeDateTime(options.date, options.time);
    }

    if (datetime) {
        taskSettings.start = datetime;
    }

    //todo endtime

    args.db = initDB(options);
    args.options = options;
    args.blub = taskSettings;
    // callback compatible
    if (cb)
        cb(null, args);
    return args;
}

module.exports = generateArgument;
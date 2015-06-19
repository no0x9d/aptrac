var create = require('./create');
var edit = require('./edit');
var end = require('./end');
var moment = require('moment');

var composeDateTime = function (date, time) {
    var temp = date.clone();
    temp.minutes(time.minutes());
    temp.hour(time.hours());
    return temp;
};

module.exports = function startTask(db, options, done) {
    "use strict";

    var date, time, datetime;

    date = time = moment();

    // handle default options
    if (options.time)
        time = moment(options.time, 'HH:mm');
    if (options.date)
        date = moment(options.time, 'DD.MM.YY');


    datetime = composeDateTime(date, time);
    options.startTime = datetime;


    // seatch for running tasks and quit them
    db.findOne({end: {$exists: false}}, function stopRunningTasks(err, obj) {
        if (!err && obj) {
            end(db, obj._id, options);
        }
    });


    //create new task
    create(db, options, function (id) {
        // set options
        edit(db, id, options);7
    });
} ;
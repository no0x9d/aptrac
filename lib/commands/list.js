var deserialize      = require('../util/deserialize'),
    end              = require('../actions/end'),
    moment           = require('moment'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function listTasks(options, output) {
    "use strict";
    var context = preHandleOptions(options);

    // handle option flags and set 'from' & 'to'
    if (options.yesterday) {
        options.from = moment().subtract(1, 'day').startOf('day');
        options.to = moment().subtract(1, 'day').endOf('day');
    }
    if (options.week) {
        options.from = moment().startOf('week');
        options.to = moment().endOf('week');
    }
    if (options.month) {
        options.from = moment().startOf('month');
        options.to = moment().endOf('month');
    }

    // build query
    var query;
    if (options.all) {
        query = {start: {$exists: true}};
    } else {
        query = {$and: [{start: {$gt: options.from.toDate()}}, {start: {$lt: options.to.toDate()}}]}
    }

    var db = context.db;
    db.find(query)
        .sort({start: 1})
        .exec(function (err, tasks) {
            if (err) {
                return output(err);
            }

            tasks = tasks.map(function (task) {
                return deserialize(task);
            });

            // output
            output(null, context, tasks);
        });
};


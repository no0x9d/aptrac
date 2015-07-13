var deserialize      = require('../util/deserialize'),
    end              = require('../actions/end'),
    moment           = require('moment'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function listTasks(options, output) {
    "use strict";
    var context = preHandleOptions(options);
    var from, to;

    // handle option flags and set 'from' & 'to'
    if (options.yesterday) {
        from = moment().subtract(1, 'day').startOf('day');
        to = moment().subtract(1, 'day').endOf('day');
    }
    if (options.week) {
        from = moment().startOf('week');
        to = moment().endOf('week');
    }
    if (options.month) {
        from = moment().startOf('month');
        to = moment().endOf('month');
    }

    // build query
    var query;
    if (options.all) {
        query = {start: {$exists: true}};
    } else {
        from = from || options.from || moment().startOf('day');
        to = to || options.to || moment().endOf('day');
        query = {$and: [{start: {$gt: from.toDate()}}, {start: {$lt: to.toDate()}}]}
    }

    if (options.search) {
        var regex = new RegExp(options.search);
        if (!query.$and) {
            query = {$and: [query]};
        }
        query.$and.push({$or: [{note: {$regex: regex}}, {task: {$regex: regex}}, {project: {$regex: regex}}]});
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


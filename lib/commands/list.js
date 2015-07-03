var args             = require('../util/arguments'),
    deserialize      = require('../util/deserialize'),
    end              = require('../actions/end'),
    init             = require('../util/init-db'),
    moment           = require('moment'),
    preHandleOptions = require('./common/prehandleOptions'),
    columnify        = require('columnify'),
    chalk            = require('chalk'),
    config           = require('../config'),
    outputDateHeader = require('./common/outputDateHeader');

module.exports = function (options) {
    "use strict";
    preHandleOptions(options);

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

    var db = init(options);
    db.find(query)
        .sort({start: 1})
        .exec(function (err, tasks) {
            if (err) {
                console.log("could not load tasks");
                console.log(err);
                return;
            }

            tasks.forEach(function (task) {
                deserialize(task);
            });


            var groupBy = 'day';
            if (options.groupWeek) {
                groupBy = 'week'
            }

            var groupedTasks = tasks.groupBy(function (task) {
                var day = task.start.clone();
                return day.startOf(groupBy);
            });


            // output
            outputDays(groupedTasks, options);
        });
};

function addOptionalFields(taskItem, fields, options) {
    "use strict";
    ["project", "task", "note"].forEach(function (o) {
        if (fields[o] || !(options && options.hideEmpty)) {
            taskItem[o] = fields[o];
        }
    });
}

function outputDays(groupedByDay, options) {
    for (var day in groupedByDay) {
        var duration = moment.duration(0);
        var tasks = groupedByDay[day];

        var outputTasks = [];
        console.log();
        outputDateHeader(moment(new Date(day)), options);
        if (options && options.condense) {

            var groupedbyTask = tasks.groupBy(function (task) {
                return (task.task || '')
                    + (task.project || '')
                    + (task.note || '');
            });

            for (var groupedTask in groupedbyTask) {
                var condensedDuration = moment.duration(0);
                groupedbyTask[groupedTask].forEach(function (task) {
                    condensedDuration.add(task.duration);
                    duration.add(task.duration);
                });
                var groupedTaskRepresentant = groupedbyTask[groupedTask][0];
                var taskItem = {
                    duration: condensedDuration.format('hh:mm', {trim: false})
                };
                addOptionalFields(taskItem, groupedTaskRepresentant, options);
                outputTasks.push(taskItem);
            }
        }
        else {
            tasks.forEach(function (task) {
                duration.add(task.duration);
                var taskItem = {
                    id: task._id,
                    start: task.start.format('HH:mm'),
                    end: task.end ? task.end.format('HH:mm') : '',
                    duration: task.duration.format('hh:mm', {trim: false})
                };
                addOptionalFields(taskItem, task, options);

                outputTasks.push(taskItem);
            });
        }
        console.log(columnify(outputTasks, {
            columnSplitter: ' | ',
            config: {
                duration: {
                    align: 'center'
                }
            }
        }));
        console.log('---------------------------');
        var workHoursPerDay = config.get('workHours');
        if (workHoursPerDay > 0) {
            var rest = duration.clone().subtract(moment.duration(workHoursPerDay, 'hours'));
            var restColor = rest.asMilliseconds() < 0 ? chalk.red : chalk.green;
            console.log("duration [h]: %s (%s)", duration.format("HH:mm", {trim: false}), restColor(rest.format("HH:mm", {trim: false})))
        } else {
            console.log("duration [h]: %s", duration.format("HH:mm", {trim: false}))
        }
    }
}

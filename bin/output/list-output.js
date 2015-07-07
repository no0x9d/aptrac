var columnify        = require('columnify'),
    moment           = require('moment'),
    chalk            = require('chalk'),
    outputDateHeader = require('./outputDateHeader');
function addOptionalFields(taskItem, fields, options) {
    "use strict";
    ["project", "task", "note"].forEach(function (o) {
        if (fields[o] || !(options && options.hideEmpty)) {
            taskItem[o] = fields[o];
        }
    });
}

module.exports = function groupAndOutputTasks(context, tasks) {
    var options = context.options;
    var groupBy = 'day';
    if (options.groupWeek) {
        groupBy = 'week'
    }

    var groupedTasks = tasks.groupBy(function (task) {
        var day = task.start.clone();
        return day.startOf(groupBy);
    });

    outputDays(context, groupedTasks)
};

function outputDays(context, groupedByDay) {
    var options = context.options;
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
        var workHoursPerDay = context.config.get('workHours');
        if (workHoursPerDay > 0) {
            var rest = duration.clone().subtract(moment.duration(workHoursPerDay, 'hours'));
            var restColor = rest.asMilliseconds() < 0 ? chalk.red : chalk.green;
            console.log("duration [h]: %s (%s)", duration.format("HH:mm", {trim: false}), restColor(rest.format("HH:mm", {trim: false})))
        } else {
            console.log("duration [h]: %s", duration.format("HH:mm", {trim: false}))
        }
    }
}
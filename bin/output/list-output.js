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

module.exports = function groupAndOutputTasks(err, context, tasks) {
    if (err) {
        return console.log(err);
    }

    var options = context.options;
    var groupedTasks = groupTasks(options, tasks);
    if (options.accounting) {
        displayTasksForAccounting(context, groupedTasks);
    } else {

        outputDays(context, groupedTasks)
    }
};

function displayTasksForAccounting(context, groupedTasks) {
    var options = context.options;

    for (var group in groupedTasks) {
        if (!groupedTasks.hasOwnProperty(group)) continue;

        var tasksInGroup = groupedTasks[group];
        var groupedByProject = tasksInGroup.groupBy(function (task) {
            return task.project || '';
        });

        var outputTasks = [];
        for (var project in groupedByProject) {
            if (!groupedByProject.hasOwnProperty(project)) continue;
            var condensedDuration = moment.duration(0);
            groupedByProject[project].forEach(function (task) {
                condensedDuration.add(task.duration);
            });

            outputTasks.push({project: project, duration: condensedDuration})
        }

        function formatOutputDurations(outputTasks, sumDuration) {
            outputTasks.forEach(function (entry) {
                sumDuration && sumDuration.add(entry.duration);
                entry.duration = entry.duration.format('hh:mm', {trim: false})
            });
        }

        if (outputTasks.length > 1){
            var sumDuration = moment.duration(0);
            formatOutputDurations(outputTasks, sumDuration);
            outputTasks.push({duration: chalk.cyan(sumDuration.format('hh:mm', {trim: false}))});
        } else{
            formatOutputDurations(outputTasks);
        }

        console.log();
        outputDateHeader(moment(new Date(group)), options);
        console.log(columnify(outputTasks, {
            showHeaders: false,
            columnSplitter: '\t\t',
            config: {
                duration: {
                    align: 'center'
                }
            }
        }));
    }
}

function groupTasks(options, tasks) {
    var groupBy = 'day';
    if (options.groupWeek) {
        groupBy = 'week'
    }
    if (options.groupMonth) {
        groupBy = 'month'
    }
    if (options.groupYear) {
        groupBy = 'year'
    }
    return tasks.groupBy(function (task) {
        var day = task.start.clone();
        return day.startOf(groupBy);
    });
}

function outputDays(context, groupedTasks) {
    var options = context.options;
    for (var group in groupedTasks) {
        if (!groupedTasks.hasOwnProperty(group)) continue;

        var duration = moment.duration(0);
        var tasks = groupedTasks[group];

        var outputTasks = [];

        if (options && options.condense) {

            var groupedbyTask = tasks.groupBy(function (task) {
                return (task.task || '')
                    + (task.project || '')
                    + (task.note || '');
            });

            for (var groupedTask in groupedbyTask) {
                if (!groupedbyTask.hasOwnProperty(groupedTask)) continue;
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
            var lastEnd;
            tasks.forEach(function (task) {
                duration.add(task.duration);
                var taskItem = {
                    id: task._id,
                    start: task.start.format('HH:mm'),
                    end: task.end ? task.end.format('HH:mm') : '',
                    duration: task.duration.format('hh:mm', {trim: false})
                };
                addOptionalFields(taskItem, task, options);
                if(lastEnd && task.start.diff(lastEnd, 'minutes') > 1 && task.start.isSame(lastEnd, 'day')){
                    outputTasks.push({duration: moment.duration(task.start.diff(lastEnd)).format('HH:mm', {trim: false}) });
                }
                lastEnd = task.end;

                outputTasks.push(taskItem);
            });
        }
        console.log();
        outputDateHeader(moment(new Date(group)), options);
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
var chalk            = require('chalk'),
    columnify        = require('columnify'),
    outputDateHeader = require('./outputDateHeader'),
    schema           = require('../schema/schema');

module.exports = function doneOutput(err, context, tasks) {
    if (err) {
        return console.log(chalk.red(err));
    }
    else if (tasks && tasks.length > 0) {
        tasks.forEach(function (task) {
            outputTaskToConsole(task);
        })
    }
    else if (context.task) {
        outputTaskToConsole(context.task);
    }
    else
        console.log("No task found");
};

function outputTaskToConsole(task) {
    outputDateHeader(task.start);

    var columnDefinitions = { //FIXME: should take all fields from schema definition and do formatting
        id: task._id,
        start: task.start.format('HH:mm'),
        end: task.end ? task.end.format('HH:mm') : '',
        duration: task.duration.format('hh:mm', {trim: false})
    };

    for (var fieldName in schema) {
        if (schema.hasOwnProperty(fieldName)) {
            columnDefinitions[schema[fieldName].label] = task[fieldName];
        }
    }

    console.log(columnify([columnDefinitions], {
        columnSplitter: ' | ',
        config: {
            duration: {
                align: 'center'
            }
        }
    }));
}
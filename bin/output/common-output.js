var chalk            = require('chalk'),
    columnify        = require('columnify'),
    outputDateHeader = require('./../../lib/commands/common/outputDateHeader');

module.exports = function doneOutput(err, context, tasks) {
    if (err) console.log(chalk.red(err));
    else if (tasks && tasks.length > 0) {
        tasks.forEach(function (task) {
            outputTaskToConsole(task);
        })
    }
    else if (context.task) {
        console.log(context.task);
        outputTaskToConsole(context.task);
    }
    else
        console.log("No task found");
};

function outputTaskToConsole(task) {
    outputDateHeader(task.start);

    console.log(columnify([{
        id: task._id,
        start: task.start.format('HH:mm'),
        end: task.end ? task.end.format('HH:mm') : '',
        duration: task.duration.format('hh:mm', {trim: false}),
        project: task.project,
        task: task.task,
        note: task.note
    }], {
        columnSplitter: ' | ',
        config: {
            duration: {
                align: 'center'
            }
        }
    }));
}
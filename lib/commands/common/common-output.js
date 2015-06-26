var chalk     = require('chalk'),
    columnify = require('columnify'),
    outputDateHeader = require('./outputDateHeader');

module.exports = function doneOutput(err, args) {
    if (err) console.log(chalk.red(err));
    else if (args.task)
        outputTaskToConsole(args.task);
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
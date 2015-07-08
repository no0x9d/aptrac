var baseCommand = require('./common/baseCommand'),
    create      = require('../actions/create'),
    edit        = require('../actions/edit'),
    end         = require('../actions/end'),
    find        = require('../actions/find'),
    findById    = require('../actions/findById'),
    findLast    = require('../actions/findLast');

module.exports = function rerun(options, doneOutput) {

    var findMethod;
    if (options.id) {
        findMethod = findById;
    } else{
        findMethod = findLast;
    }

    var actions = [
        findMethod,
        // update changes from found task
        function saveLoadedFields(context, task, done) {
            context.changes = {
                task: task.task,
                project: task.project,
                note: task.note,
                start: options.start
            };
            done(null, context)
        },
        end,
        create,
        edit,
        find
    ];
    baseCommand(options, actions, doneOutput)
};
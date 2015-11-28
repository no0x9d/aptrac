var baseCommand = require('./common/baseCommand'),
    create      = require('../actions/create'),
    edit        = require('../actions/edit'),
    end         = require('../actions/end'),
    findOne     = require('../actions/findOne'),
    findById    = require('../actions/findById'),
    findLast    = require('../actions/findLast');

module.exports = function rerun(options, doneOutput) {

    var findMethod;
    if (options.id || (options.isContext && options.options.id)) {
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
                start: context.options.start
            };
            done(null, context)
        },
        end,
        create,
        edit,
        findOne
    ];
    baseCommand.call(this, options, actions, doneOutput)
};
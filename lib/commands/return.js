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
        function saveLoadedFields(args, done) {
            args.changes = {
                task: args.task.task,
                project: args.task.project,
                note: args.task.note,
                start: args.options.start
            };
            done(null, args)
        },
        end,
        create,
        edit,
        find
    ];
    baseCommand(options, actions, doneOutput)
};
var baseCommand = require('./common/baseCommand'),
    create      = require('../actions/create'),
    edit        = require('../actions/edit'),
    end         = require('../actions/end'),
    find        = require('../actions/find'),
    findById    = require('../actions/findById'),
    findLast    = require('../actions/findLast'),
    doneOutput  = require('./common/common-output');

module.exports = function rerun(options) {

    var findMethod = findLast;
    if (options.id) {
        findMethod = findById;
    }

    var actions = [
        findMethod,
        // update changes from found task
        function saveLoadedFields(args, done) {
            args.changes.task = args.task.task;
            args.changes.project = args.task.project;
            args.changes.note = args.task.note;
            args.changes.start = options.start;
            done(null, args)
        },
        end,
        create,
        edit,
        find
    ];
    baseCommand(options, actions, doneOutput)
};
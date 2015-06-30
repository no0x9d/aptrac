var async            = require('async'),
    args             = require('../util/arguments'),
    create           = require('../actions/create'),
    edit             = require('../actions/edit'),
    end              = require('../actions/end'),
    findCurrent      = require('../actions/findCurrent'),
    findLast         = require('../actions/findLast'),
    doneOutput       = require('./common/common-output'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function rerun(options) {
    preHandleOptions(options);

    async.waterfall([
        args.bind(this, false, options),
        findLast,
        // update changes from found task
        function (args, done) {
            args.changes.task = args.task.task;
            args.changes.project = args.task.project;
            args.changes.note = args.task.note;
            args.changes.start = options.start;
            done(null, args)
        },
        findCurrent,
        end,
        create,
        edit,
        findCurrent
    ], doneOutput)
};
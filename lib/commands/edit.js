var async            = require('async'),
    args             = require('../util/arguments'),
    edit             = require('../actions/edit'),
    findCurrent      = require('../actions/findCurrent'),
    findById         = require('../actions/findById'),
    doneOutput       = require('./common/common-output'),
    preHandleOptions = require('./common/prehandleOptions'),
    ifAsync          = require('if-async');

module.exports = function (task, options) {
    preHandleOptions(options, task);

    function findTaskWithIdOrCurrent() {
        return ifAsync(function (args, cb) {
            cb(Object.isNaN(options.id) ? "malformated id" : null, options.id)
        })
            .then(findById)
            .else(findCurrent);
    }

    async.waterfall([
        args.bind(this, options, false),
        findTaskWithIdOrCurrent(),
        edit,
        findTaskWithIdOrCurrent()
    ], doneOutput);
};
var async       = require('async'),
    args        = require('../util/arguments'),
    edit        = require('../actions/edit'),
    end         = require('../actions/end'),
    findCurrent = require('../actions/findCurrent'),
    findLast    = require('../actions/findLast'),
    doneOutput       = require('./common/common-output'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function (task, options) {
    "use strict";
    preHandleOptions(options, task);

    async.waterfall([
        args.bind(this, options, false),
        findCurrent,
        edit,
        findCurrent,
        end,
        findLast
    ], doneOutput);
};
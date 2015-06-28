var async            = require('async'),
    args             = require('../util/arguments'),
    findCurrent      = require('../actions/findCurrent'),
    doneOutput       = require('./common/common-output'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function now(options) {
    "use strict";
    preHandleOptions(options);

    async.waterfall([
        args.bind(this, options, false),
        findCurrent
    ], doneOutput);
};
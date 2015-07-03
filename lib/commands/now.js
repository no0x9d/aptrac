var async            = require('async'),
    args             = require('../util/arguments'),
    findCurrent      = require('../actions/findCurrent'),
    doneOutput       = require('./common/common-output'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function now(options) {
    "use strict";
    var context = preHandleOptions(options);

    async.waterfall([
        args.bind(this, context, false),
        findCurrent
    ], doneOutput);
};
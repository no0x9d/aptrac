var async            = require('async'),
    args             = require('../util/arguments'),
    findCurrent      = require('../actions/findCurrent'),
    doneOutput       = require('./common/common-output'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function now() {
    "use strict";
    preHandleOptions(this);

    async.waterfall([
        args.bind(this, this, false),
        findCurrent
    ], doneOutput);
};
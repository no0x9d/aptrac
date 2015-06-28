var async            = require('async'),
    args             = require('../util/arguments'),
    create           = require('../actions/create'),
    edit             = require('../actions/edit'),
    end              = require('../actions/end'),
    findCurrent      = require('../actions/findCurrent'),
    doneOutput       = require('./common/common-output'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function (options) {
    "use strict";
    preHandleOptions(options);

    async.waterfall([
        args.bind(this, options, true),
        findCurrent,
        end,
        create,
        edit,
        findCurrent
    ], doneOutput);
};
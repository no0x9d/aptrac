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
    var context = preHandleOptions(options);

    async.waterfall([
        args.bind(this, context, true),
        findCurrent,
        end,
        create,
        edit,
        findCurrent
    ], doneOutput);
};
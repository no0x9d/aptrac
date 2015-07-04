var async            = require('async'),
    args             = require('../util/arguments'),
    queryBuilder     = require('./common/queryBuilder'),
    edit             = require('../actions/edit'),
    end              = require('../actions/end'),
    findLast         = require('../actions/findLast'),
    doneOutput       = require('./common/common-output'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function (options) {
    "use strict";
    var context = preHandleOptions(options);

    async.waterfall([
        args.bind(this, context, false),
        queryBuilder(context, "findCurrent"),
        edit,
        function(context, query, done){done(null, context)}, // map arguments for next function call
        end,
        findLast
    ], doneOutput);
};
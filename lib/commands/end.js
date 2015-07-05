var baseCommand  = require('./common/baseCommand'),
    queryBuilder = require('./common/queryBuilder'),
    edit         = require('../actions/edit'),
    end          = require('../actions/end'),
    findLast     = require('../actions/findLast'),
    doneOutput   = require('./common/common-output');

module.exports = function (options) {
    "use strict";

    var actions = [
        queryBuilder("findCurrent"),
        edit,
        function mapArguments(context, query, done) { // map arguments for next function call
            done(null, context)
        },
        end,
        findLast
    ];
    baseCommand(options, actions, doneOutput);
};
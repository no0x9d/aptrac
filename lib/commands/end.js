var baseCommand     = require('./common/baseCommand'),
    queryBuilder    = require('./common/queryBuilder'),
    edit            = require('../actions/edit'),
    end             = require('../actions/end'),
    findLast        = require('../actions/findLast'),
    generateChanges = require('../actions/generateChanges');

module.exports = function (options, doneOutput) {
    "use strict";

    var actions = [
        generateChanges.fill(undefined, false),
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
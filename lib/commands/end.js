var baseCommand     = require('./common/baseCommand'),
    queryBuilder    = require('./common/queryBuilder'),
    edit            = require('../actions/edit'),
    end             = require('../actions/end'),
    findOne         = require('../actions/findOne'),
    generateChanges = require('../actions/generateChanges');

module.exports = function (options, doneOutput) {
    "use strict";

    var task;

    var actions = [
        generateChanges.fill(undefined, false),
        queryBuilder("findCurrent"),
        findOne,
        function checkForRunningTask(context, t, done) {
            if (t == null) {
                return done(new Error('no running task to end'), context)
            } else {
                task = t;
                done(null, context, task);
            }
        },
        edit,
        function mapArguments(context, query, done) { // map arguments for next function call
            done(null, context)
        },
        end,
        function queryForEndedTask(context, done){
            done(null, context, {_id: task._id})
        },
        findOne
    ];
    baseCommand(options, actions, doneOutput);
};
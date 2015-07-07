var baseCommand = require('./common/baseCommand'),
    findCurrent = require('../actions/findCurrent');

module.exports = function now(options, doneOutput) {
    "use strict";
    var actions = [
        findCurrent
    ];

    baseCommand(options, actions, doneOutput);
};
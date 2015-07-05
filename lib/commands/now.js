var baseCommand = require('./common/baseCommand'),
    findCurrent = require('../actions/findCurrent'),
    doneOutput  = require('./common/common-output');

module.exports = function now(options) {
    "use strict";
    var actions = [
        findCurrent
    ];

    baseCommand(options, actions, doneOutput);
};
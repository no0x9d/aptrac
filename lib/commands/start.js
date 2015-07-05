var baseCommand     = require('./common/baseCommand'),
    create          = require('../actions/create'),
    edit            = require('../actions/edit'),
    end             = require('../actions/end'),
    find            = require('../actions/find'),
    generateChanges = require('../actions/generateChanges'),
    doneOutput      = require('./common/common-output');

module.exports = function start(options) {
    "use strict";
    var actions = [
        generateChanges.fill(undefined, true),
        end,
        create,
        edit,
        find
    ];

    baseCommand(options, actions, doneOutput, true);
};
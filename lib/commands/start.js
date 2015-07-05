var baseCommand = require('./common/baseCommand'),
    create      = require('../actions/create'),
    edit        = require('../actions/edit'),
    end         = require('../actions/end'),
    find        = require('../actions/find'),
    doneOutput  = require('./common/common-output');

module.exports = function (options) {
    "use strict";
    var actions = [
        end,
        create,
        edit,
        find
    ];

    baseCommand(options, actions, doneOutput, true);
};
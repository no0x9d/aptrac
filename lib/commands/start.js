var baseCommand     = require('./common/baseCommand'),
    create          = require('../actions/create'),
    edit            = require('../actions/edit'),
    end             = require('../actions/end'),
    findOne         = require('../actions/findOne'),
    generateChanges = require('../actions/generateChanges');

module.exports = function start(options, doneOutput) {
    "use strict";
    if (!options.start && !(options.options && options.options.start)) {
        return doneOutput(Error("no start date provided"));
    }

    var actions = [
        generateChanges.fill(undefined, true),
        end,
        create,
        edit,
        findOne
    ];

    baseCommand.call(this, options, actions, doneOutput, true);
};
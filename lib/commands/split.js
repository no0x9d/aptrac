var baseCommand     = require('./common/baseCommand'),
    edit            = require('../actions/edit'),
    find            = require('../actions/find'),
    findOne         = require('../actions/findOne'),
    generateChanges = require('../actions/generateChanges'),
    split           = require('../actions/split'),
    queryBuilder    = require('./common/queryBuilder');

module.exports = function (options, doneOutput) {

    var query = options.id || (options.options && options.options.id) ? queryBuilder('findById') : queryBuilder('findCurrent');

    var actions = [
        generateChanges.fill(undefined, false),
        query,
        findOne,
        split,
        find
    ];

    baseCommand.call(this, options, actions, doneOutput);
};
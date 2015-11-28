var baseCommand     = require('./common/baseCommand'),
    edit            = require('../actions/edit'),
    find            = require('../actions/find'),
    generateChanges = require('../actions/generateChanges'),
    queryBuilder    = require('./common/queryBuilder');

module.exports = function (options, doneOutput) {

    var query = options.id || (options.options && options.options.id) ? queryBuilder('findById') : queryBuilder('findCurrent');

    var actions = [
        generateChanges.fill(undefined, false),
        query,
        edit,
        find
    ];

    baseCommand.call(this, options, actions, doneOutput);
};
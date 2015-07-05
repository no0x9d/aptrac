var baseCommand     = require('./common/baseCommand'),
    edit            = require('../actions/edit'),
    find            = require('../actions/find'),
    generateChanges = require('../actions/generateChanges'),
    doneOutput      = require('./common/common-output');

module.exports = function (options) {
    // TODO validate for each element in id array
    if (Object.isNaN(options.id)) {
        console.log("malformated id");
        process.exit(1);
    }

    var actions = [
        generateChanges.fill(undefined, false),
        function buildQuery(context, done) {
            var query = {end: {$exists: false}};
            if (options.id) {

                var queries = options.id.map(function (i) {
                    return {_id: i}
                });
                query = {$or: queries};
            }

            done(null, context, query)
        },
        edit,
        find
    ];

    baseCommand(options, actions, doneOutput);
};
var async            = require('async'),
    args             = require('../util/arguments'),
    edit             = require('../actions/edit'),
    find             = require('../actions/find'),
    doneOutput       = require('./common/common-output'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function (options) {
    var context = preHandleOptions(options);

    // TODO validate for each element in id array
    if (Object.isNaN(options.id)) {
        console.log("malformated id");
        process.exit(1);
    }

    async.waterfall([
        args.bind(this, context, false),
        function (context, done) {
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
    ], doneOutput);
};
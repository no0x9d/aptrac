var async            = require('async'),
    args             = require('../util/arguments'),
    edit             = require('../actions/edit'),
    findCurrent      = require('../actions/findCurrent'),
    findById         = require('../actions/findById'),
    doneOutput       = require('./common/common-output'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function (options) {
    var context = preHandleOptions(options);

    if (Object.isNaN(options.id)) {
        console.log("malformated id");
        process.exit(1);
    }

    var query = findCurrent;
    if (options.id) {
        query = findById;
    }

    async.waterfall([
        args.bind(this, context, false),
        query,
        edit,
        query
    ], doneOutput);
};
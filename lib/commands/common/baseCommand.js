var async            = require('async'),
    args             = require('../../util/arguments'),
    preHandleOptions = require('./prehandleOptions');

module.exports = function baseCommand(options, asyncActions, callback, useDefaults) {
    "use strict";
    var context = preHandleOptions(options);

    // add our args function bound to the context as first action to
    // get our context in the async waterfall
    asyncActions.unshift(args.bind(this, context, useDefaults));

    async.waterfall(asyncActions, callback);
};
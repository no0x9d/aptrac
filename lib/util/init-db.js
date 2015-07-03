var Datastore = require('nedb');

module.exports = function (context) {
    "use strict";

    var filename = context.options.db || context.config.get('db');

    return new Datastore({ filename: filename, autoload: true});
};
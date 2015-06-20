var Datastore = require('nedb');
var config = require('../../config/index');

module.exports = function (options) {
    "use strict";

    var filename = options.db || config.db;

    return new Datastore({ filename: filename, autoload: true});
};
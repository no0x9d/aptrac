var create = require('./create');
var edit = require('./edit');
var end = require('./end');

module.exports = function startTask(err, args, done) {
    "use strict";
    if(err) done(err);

    var db = args.db;
    var options = args.options;

} ;
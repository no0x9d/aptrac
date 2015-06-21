var deserialize = require('../util/deserialize');
var _ = require('lodash');

module.exports = function (args, done) {
    "use strict";

    var db = args.db,
        changes = _.clone(args.changes),
        task = args.task;

    if (task) {

        if (changes.start) {
            // TODO check for conflicts
            changes.start = changes.start.toDate();
        }
        if (changes.end) {
            // TODO check for conflicts
            changes.end = changes.end.toDate();
        }

        db.update({_id: task._id}, {$set: changes}, function (err) {
            done(err, args);
        })
    }
};
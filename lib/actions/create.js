var getCurrentId = require('../util/id-helper');
module.exports = function (args, done) {
    "use strict";

    var db = args.db;

    getCurrentId(db, function (err, currentId) {
        if (err) done(err);
        // create new task
        // todo move create in edit with upsert, but must handle old tasks in args from 'end'
        db.insert({_id: currentId + 1}, function (err, newObj) {
            if (err) done(err);

            args.task = newObj;
            done(null, args);
        });
    });

};
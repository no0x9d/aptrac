module.exports = function (args, done) {
    "use strict";

    var db = args.db;

    // create new task
    // todo move create in edit with upsert
    db.insert({}, function (err, newObj) {
        if (err) done(err);

        args.task = newObj;
        done(null, args);
    });
};
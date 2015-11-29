var getCurrentId = require('../util/id-helper');
module.exports = function (args, done) {
    "use strict";

    var db = args.db;

    getCurrentId(db, function (err, currentId) {
        if (err) done(err);
        // create new task
        db.insert({_id: currentId + 1}, function (err, newObj) {
            if (err) done(err);

            args.task = newObj;
            done(null, args, {_id: currentId + 1});
        });
    });

};
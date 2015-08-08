var find = require('./find');
var async = require('async');

module.exports = function (args, query, done) {
    "use strict";

    if (!done && Object.isFunction(query)) {
        done = query;
        return done(Error("no query for items to edit specified"));
    }
    var db      = args.db,
        changes = Object.clone(args.changes);

    if (query) {

        find(args, query, function (err, context, tasks) {
            if (err) return done(err);

            if (tasks.length === 0) {
                //done(Error('no tasks found to edit'))
            }

            async.series([
                function (done) {
                    if (changes.start) {
                        var startMoment = changes.start;
                        changes.start = changes.start.toDate();

                        // TODO check for conflicts
                    }
                    done();
                },
                function (done) {
                    if (changes.end) {
                        var endMoment = changes.end;
                        changes.end = changes.end.toDate();

                        // TODO check for conflicts
                    }
                    done();
                }
            ], function (err, results) {

            });

            db.update(query, {$set: changes}, {multi: true}, function (err) {
                done(err, args, query);
            })

        });

    }

};
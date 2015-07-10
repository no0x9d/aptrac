module.exports = function (args, query, done) {
    "use strict";

    if (!done && Object.isFunction(query)) {
        done = query;
        return done(Error("no query for items to edit specified"));
    }
    var db      = args.db,
        changes = Object.clone(args.changes);

    if (query) {

        if (changes.start) {
            // TODO check for conflicts
            changes.start = changes.start.toDate();
        }
        if (changes.end) {
            // TODO check for conflicts
            changes.end = changes.end.toDate();
        }

        db.update(query, {$set: changes}, { multi: true }, function (err) {
            done(err, args, query);
        })
    }

};
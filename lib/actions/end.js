module.exports = function endTask(context, done) {
    "use strict";

    var db      = context.db,
        options = context.changes;

    var endTime = options.end || options.start;

    if (!endTime) {
        return done(Error("can't end task. no end time given"));
    }

    db.update({end: {$exists: false}}, {$set: {end: endTime.toDate()}}, function (err) {
        if (err) done(err);

        done(null, context);
    });
};
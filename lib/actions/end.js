module.exports = function endTask(args, done) {
    "use strict";

    var db = args.db,
        options = args.blub;

    if(!args.task)
        return done(null, args);

    var endTime = options.end || options.start;

    if (!endTime) {
        return done("can't end task. no end time given");
    }

    var id = args.task._id;
    db.update({_id: id}, {$set: {end: endTime.toDate()}}, function (err) {
        if (err) done(err);

        done(null, args);
    });
};
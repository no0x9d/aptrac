var deserialize = require('../util/deserialize');

module.exports = function findLast(args, done) {
    var db = args.db;

    // seatch for latest not running tasks
    db.find({start: {$exists: true}, end: {$exists: true}})
        .sort({start: -1})
        .limit(1).
        exec(function (err, tasks) {
            if (err) return done(err);

            if (tasks.length !== 1)
                return done(new Error("did not found task to return to"));

            var task = tasks[0];
            task = deserialize(task);

            args.task = task;
            done(null, args, task)
        });
};
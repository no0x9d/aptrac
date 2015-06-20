module.exports = function findCurrentTask(args, done) {
    var db = args.db;

    // seatch for running tasks and quit them
    db.findOne({end: {$exists: false}}, function stopRunningTasks(err, obj) {
        if (err) done(err);

        args.task = obj;
        done(null, args)
    });
};
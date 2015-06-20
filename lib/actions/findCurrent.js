var deserialize = require('../util/deserialize');

module.exports = function findCurrentTask(args, done) {
    var db = args.db;

    // seatch for running tasks
    db.findOne({end: {$exists: false}}, function stopRunningTasks(err, obj) {
        if (err) done(err);

        //task must not be null
        deserialize(obj);

        args.task = obj;
        done(null, args)
    });
};
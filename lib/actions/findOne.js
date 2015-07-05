var deserialize = require('../util/deserialize');

module.exports = function findCurrentTask(args, search, done) {
    var db = args.db;

    // seatch for tasks with given search parameters
    db.findOne(search, function (err, obj) {
        if (err) done(err);

        //task must not be null
        var task = deserialize(obj);

        args.task = task;
        done(null, args)
    });
};
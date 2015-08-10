var getCurrentId = require('../util/id-helper');

module.exports = function split(context, task, done) {
    var db = context.db;
    var options = context.options;

    if(!task){
        return done(Error("no task to split found"));
    }
    if(!options.at || options.at.isBefore(task.start) || (task.end && options.at.isAfter(task.end)) ){
        return done(Error("time to split at must be within the chosen task "));
    }

    var newTask = Object.clone(context.changes);
    newTask.end = task && task.end ? task.end.toDate(): undefined;
    newTask.start = options.at.toDate();

    db.update({_id: task._id}, {$set: {end: options.at.toDate()}}, function (err) {
        if (err) {
            return done(err);
        }

        getCurrentId(db, function (err, id) {
            if (err) {
                return done(err);
            }
            newTask._id = id + 1;

            db.insert(newTask, function (err, doc) {
                if (err) {
                    return done(err);
                }
                done(null, context, {_id: doc._id});

            })
        })
    });
};

var find = require('./find');
var moment = require('moment');

function OverlappingTaskError(message, task, conflictingTasks) {
    this.message = message;
    this.task = task;
    this.conflictingTasks = conflictingTasks;
}
OverlappingTaskError.prototype = Object.create(Error.prototype);
OverlappingTaskError.prototype.name = "OverlappingTaskError";

module.exports = function (context, query, done) {
    "use strict";

    if (!done && Object.isFunction(query)) {
        done = query;
        return done(Error("no query for items to edit specified"));
    }
    var db      = context.db,
        options = context.options,
        changes = Object.clone(context.changes);

    if (query) {

        find(context, query, function (err, context, tasks) {
            if (err) return done(err);

            if (tasks.length === 0) {
                return done(null, context, query);
            }


            if (changes.start || changes.end) {
                if (tasks.length > 1) {
                    return done(Error("changing start or end is not allowed on multiple activities"))
                }

                var task = tasks[0];
                var startMoment;
                var endMoment;
                if (changes.start) {
                    startMoment = changes.start;
                    changes.start = changes.start.toDate();
                }
                if (changes.end) {
                    endMoment = changes.end;
                    changes.end = changes.end.toDate();
                }

                startMoment = startMoment || task.start;
                endMoment = endMoment || task.end || moment();

                if(startMoment.isAfter(endMoment)){
                    return done(Error("start date is after end date"));
                }

                var queryStart = {
                    $and: [
                        {start: {$lt: startMoment.toDate()}},
                        {end: {$gt: startMoment.toDate()}}
                    ]
                };
                var queryEnd = {
                    $and: [
                        {start: {$lt: endMoment.toDate()}},
                        {end: {$gt: endMoment.toDate()}}
                    ]
                };
                var queryMiddle = {
                    $and: [
                        {start: {$gte: startMoment.toDate()}},
                        {end: {$lte: endMoment.toDate()}}
                    ]
                };
                var conflictQuery = {
                    $or: [
                        queryStart,
                        queryMiddle,
                        queryEnd
                    ]
                };
                find(context, conflictQuery, function (err, context, tasks) {
                    if (err) {
                        return done(err);
                    }

                    tasks = tasks.filter(function (t) {
                        return t._id !== task._id;
                    });

                    var completeOverlap = tasks.filter(function (t) {
                        return t.start.isBefore(startMoment) && t.end.isAfter(endMoment)
                            || t.start.isAfter(startMoment) && t.end.isBefore(endMoment)
                    });

                    var startOverlap = tasks.filter(function (t) {
                        return t.start.isBefore(startMoment) && t.end.isAfter(startMoment);
                    });
                    var endOverlap = tasks.filter(function (t) {
                        return t.end.isBefore(endMoment) && t.end.isAfter(endMoment);
                    });
                    var conflictingTasks = completeOverlap.union(startOverlap).union(endOverlap);

                    if (completeOverlap.length > 0 || startOverlap.length > 1 || endOverlap.length > 1) {
                        return done(new OverlappingTaskError("Fatal error while editing task! Can't apply changes", task, conflictingTasks))
                    }

                    if ((startOverlap.length === 1 || endOverlap.length === 1)) {
                        if(!options.recursiveUpdate) {
                            return done(new OverlappingTaskError("Error while editing task! Please update conflicting tasks first or use the --recursive-update (-U) flag.", task, conflictingTasks))
                        }else{
                            if(startOverlap.length === 1){
                                db.update({_id: startOverlap[0]._id}, {$set: {end: startMoment.toDate()}})
                            }
                            if(endOverlap.length === 1){
                                db.update({_id: endOverlap[0]._id}, {$set: {start: endMoment.toDate()}})
                            }
                        }
                    }

                    db.update(query, {$set: changes}, {multi: true}, function (err) {
                        done(err, context, query);
                    })
                })

            } else {
                db.update(query, {$set: changes}, {multi: true}, function (err) {
                    done(err, context, query);
                })
            }
        });

    }

};
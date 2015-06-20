module.exports = function (args, done) {
    "use strict";

    var db = args.db,
        options = args.blub,
        task = args.task;

        if(task){
            if(options.task){
                task.task = options.task;
            }
            if(options.project){
                task.project = options.project;
            }
            if(options.note){
                task.note = options.note;
            }
            if(options.start){
                // TODO check for conflicts
                task.start = options.start.toDate();
            }
            if(options.end) {
                // TODO check for conflicts
                task.end = options.end.toDate();
            }


            db.update({_id: task._id}, task, function (err) {
                if(err) done(err);
                done(null, args);
            })
        }
};
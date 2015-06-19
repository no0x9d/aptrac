module.exports = function (db, id, options) {
    "use strict";
    db.findOne({_id: id}, function(err, obj){
        if(!err && obj){
            if(options.task){
                obj.task = options.task;
            }
            if(options.project){
                obj.project = options.project;
            }
            if(options.note){
                obj.note = options.note;
            }
            if(options.startTime){
                // TODO check for conflicts
                obj.start = options.startTime.toDate();
            }
            if(options.endTime) {
                // TODO check for conflicts
                obj.end = options.endTime.toDate();
            }


            db.update({_id: id}, obj, function (err) {
                if(!err){
                    console.log("updated entry: ", obj);
                }
            })
        }
    })
};
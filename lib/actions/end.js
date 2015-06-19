module.exports = function endTask(db, id, options, done){
    "use strict";

    var endTime = options.endTime || options.startTime;
    if(! endTime) {
        console.log("no end time given");
        return;
    }

    db.update({_id: id}, {$set: {end: endTime.toDate()}}, function(err){
        if(typeof done === 'function')
            done();
    });
};
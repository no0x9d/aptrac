module.exports = function getCurrentId(db, done) {
    "use strict";
    db.find({})
        .sort({_id: -1})
        .limit(1).
        exec(function (err, tasks) {
            if (err) return done(err);

            if( tasks.length === 0){
                return done(null, 0);
            }
            if (tasks.length !== 1)
                return done("did not found task to return to");

            var id = tasks[0]._id;
            // having old random ids. so we need a fresh start
            if(!Object.isNumber(id)){
                done("You are using non numerical id's from an older version. Please use a new database.")
            }
            done(null, id)
        });
};
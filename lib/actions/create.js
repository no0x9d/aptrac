module.exports = function (db, options, done) {
    "use strict";

    // create new task
    db.insert({}, function (err, newObj) {
        if (!err) {
            if (typeof done === 'function')
                done(newObj._id);
        }
    });
};
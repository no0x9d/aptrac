var deserialize = require('../util/deserialize');

module.exports = function findCurrentTask(context, query, done) {
    var db = context.db;
    // seatch for tasks with given query parameters
    db.find(query, function (err, tasks) {
        if (err) done(err);

        tasks.forEach(function (task) {
            deserialize(task)
        });
        done(null, context, tasks)
    });
};
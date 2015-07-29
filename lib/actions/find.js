var deserialize = require('../util/deserialize');

module.exports = function findTasks(context, query, done) {
    var db = context.db;
    // search for tasks with given query parameters
    db.find(query, function (err, tasks) {
        if (err) done(err);
        tasks = tasks.map(function (task) {
            return deserialize(task);
        });
        done(null, context, tasks)
    });
};
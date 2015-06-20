var moment = require('moment');
module.exports = function deserializeTask(task) {
    var x;
    for (x in task) {
        if (task.hasOwnProperty(x)) {
            if (task[x] instanceof Date)
                task[x] = moment(task[x])
        }
    }
};
var moment = require('moment');
module.exports = function deserializeTask(task) {
    if(!task) return;

    var x;
    for (x in task) {
        if (task.hasOwnProperty(x)) {
            if (task[x] instanceof Date)
                task[x] = moment(task[x])
        }
    }
    Object.defineProperty(task, "duration", {get: function () {
        var end = this.end || moment();
        return end.diff(this.start);
    }})
};
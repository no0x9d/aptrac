var chalk = require('chalk'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function kill(options) {
    if (Object.isNaN(options.id))
        console.log(chalk.red("malformated id"));

    var context = preHandleOptions(options);

    var db = context.db;
    db.remove({_id: options.id}, {}, function (err, numRemoved) {
        if (err) console.log(chalk.red(err));
        if (numRemoved === 1)
            console.log("task with #%s removed", options.id)
    })
};
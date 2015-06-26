var chalk = require('chalk'),
    init = require('../util/init-db'),
    preHandleOptions = require('./common/prehandleOptions');

module.exports = function kill() {
    var options = this;
    if (Object.isNaN(options.id))
        console.log(chalk.red("malformated id"));

    preHandleOptions(options);

    var db = init(options);
    db.remove({_id: options.id}, {}, function (err, numRemoved) {
        if (err) console.log(chalk.red(err));
        if (numRemoved === 1)
            console.log("task with #%s removed", options.id)
    })
};
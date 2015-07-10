var preHandleOptions = require('./common/prehandleOptions');

module.exports = function kill(options, callback) {
    var context = preHandleOptions(options);
    options = context.options;

    if (Object.isNaN(options.id))
        callback(Error("malformated id"));

    var db = context.db;

    db.remove({_id: options.id}, {}, function (err, numRemoved) {
        callback(err, context, numRemoved);
    })
};
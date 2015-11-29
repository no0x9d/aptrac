module.exports = function (err, context, numRemoved) {
    if (err) console.log(err);
    if (numRemoved === 1)
        console.log("task with #%s removed", context.options.id)
};
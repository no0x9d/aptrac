module.exports = function outputConfigToConsole(err, context) {
    if (err) {
        return console.log(err);
    }
    var output = {};
    context.config.sources.forEach(function (source) {
        Object.merge(output, source, true);
    });
    console.log(output);
};
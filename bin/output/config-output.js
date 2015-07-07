module.exports = function outputConfigToConsole(config) {
    var output = {};
    config.sources.forEach(function (source) {
        Object.merge(output, source, true);
    });
    console.log(output);
};
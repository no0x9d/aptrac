var chalk   = require('chalk'),
    commander = require('commander'),
    config = require('../../config'),
    path = require('path');

module.exports = function preHandleOptions(options, task) {
    if (!(options instanceof commander.Command)) {
        console.log(chalk.red("There was a problem parsing the arguments. Please read the help with aptrac [command] -h"));
        process.exit(1);
    }
    if (task)
        options.task = task;
    if (options.config) {
        var configPath = path.join(config.get('home'), options.config + ".cfg");
        config.addSource(configPath);
    }
    handleAliases(options);
};

function handleAliases(options) {
    var aliases = config.get('alias');

    if (!aliases) return;

    options.options.forEach(function (option) {
        if (option.required !== 0 || option.optional !== 0) {
            var name = option.name();
            var optionValue = options[name];
            if (optionValue) {
                if (Object.isString(optionValue))
                    if (optionValue.startsWith('\\')) {
                        options[name] = optionValue.slice(1);
                    }
                    else {
                        var alias = aliases[optionValue];
                        if (alias) {
                            options[name] = alias;
                        }
                    }
            }
        }
    })
}
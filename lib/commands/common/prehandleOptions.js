var config = require('../../config'),
    path   = require('path');

module.exports = function preHandleOptions(options) {
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
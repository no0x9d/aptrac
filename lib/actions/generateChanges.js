var default_args = ["project", "note", "task", "start", "end"];

var copyOptions = function (context, copyBase, args, useDefaults) {
    "use strict";

    var options = context.options,
        config  = context.config;

    args = args || default_args;
    args.forEach(function (option) {
        if (options[option])
            copyBase[option] = options[option];
        else if (useDefaults && config.get(option))
            copyBase[option] = config.get(option);
    });

    return copyBase;
};

function generateChanges(context, useDefaults, done) {
    context.changes = copyOptions(context, {}, default_args, useDefaults);
    done(null, context);
}

module.exports = generateChanges;
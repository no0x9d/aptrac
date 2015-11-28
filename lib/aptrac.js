require('sugar');
require('moment-duration-format');

var startCommand  = require('./commands/start'),
    editCommand   = require('./commands/edit'),
    endCommand    = require('./commands/end'),
    killCommand   = require('./commands/kill'),
    returnCommand = require('./commands/return'),
    listCommand   = require('./commands/list'),
    nowCommand    = require('./commands/now'),
    setCommand    = require('./commands/set'),
    splitCommand  = require('./commands/split'),
    unsetCommand  = require('./commands/unset'),
    model         = require('./model'),
    Config        = require('./config'),
    initDb        = require('./util/init-db'),
    path          = require('path');

function addConfigFile(config, options) {
    if (options && options.config) {
        var configPath = path.join(config.get('home'), options.config + ".cfg");
        config.addSource(configPath);
    }
}

function Aptrac(options) {
    "use strict";

    this.start = startCommand;
    this.edit = editCommand;
    this.end = endCommand;
    this.kill = killCommand;
    this.return = returnCommand;
    this.list = listCommand;
    this.now = nowCommand;
    this.set = setCommand;
    this.split = splitCommand;
    this.unset = unsetCommand;

    this.schema = model.schema;

    this.config = new Config();
    addConfigFile(this.config, options);

    this.db = initDb(options, this.config);
}

module.exports = Aptrac;
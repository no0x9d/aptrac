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

    this.schema = model.schema;

    this.config = new Config();
    addConfigFile(this.config, options);

    this.db = initDb(options, this.config);
}

Aptrac.prototype.start = startCommand;
Aptrac.prototype.edit = editCommand;
Aptrac.prototype.end = endCommand;
Aptrac.prototype.kill = killCommand;
Aptrac.prototype.return = returnCommand;
Aptrac.prototype.list = listCommand;
Aptrac.prototype.now = nowCommand;
Aptrac.prototype.set = setCommand;
Aptrac.prototype.split = splitCommand;
Aptrac.prototype.unset = unsetCommand;

module.exports = Aptrac;
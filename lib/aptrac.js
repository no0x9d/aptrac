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
    unsetCommand  = require('./commands/unset');

function Aptrac() {
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
}

module.exports = new Aptrac();
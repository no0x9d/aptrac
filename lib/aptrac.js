require('sugar');

var startCommand  = require('./commands/start'),
    editCommand   = require('./commands/edit'),
    endCommand    = require('./commands/end'),
    killCommand   = require('./commands/kill'),
    returnCommand = require('./commands/return'),
    listCommand   = require('./commands/list'),
    nowCommand    = require('./commands/now'),
    setCommand    = require('./commands/set'),
    unsetCommand  = require('./commands/unset');

function Aptrac (){
    this.start = startCommand;
    this.edit = editCommand;
    this.end = endCommand;
    this.kill = killCommand;
    this.return = returnCommand;
    this.list = listCommand;
    this.now = nowCommand;
    this.set = setCommand;
    this.unset = unsetCommand;
}

module.exports = new Aptrac();
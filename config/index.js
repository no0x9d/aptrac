var osenv = require('osenv');
var path = require('path');

var home = path.join(osenv.home(), ".aptrac");
var db = path.join(home, 'tasks.db');


module.exports = {
    home: home,
    db: db
};
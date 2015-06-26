var chalk = require('chalk');

module.exports = function outputDateHeader(moment) {
    console.log(chalk.blue(moment.format("dddd, D.MM.YYYY")));
};
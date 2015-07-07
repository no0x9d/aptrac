var chalk = require('chalk');

module.exports = function outputDateHeader(moment, options) {
    if (options && options.groupWeek) {
        console.log(chalk.blue(moment.format("[Week] w")));
    } else {
        console.log(chalk.blue(moment.format("dddd, D.MM.YYYY")));
    }
};
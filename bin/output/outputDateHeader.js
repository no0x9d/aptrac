var chalk = require('chalk');

module.exports = function outputDateHeader(moment, options) {
    if (options && options.groupWeek) {
        console.log(chalk.blue(moment.format("[Week] w")));
    }else if (options && options.groupMonth) {
        console.log(chalk.blue(moment.format("MMMM YYYY")));
    }else if (options && options.groupYear) {
        console.log(chalk.blue(moment.format("YYYY")));
    } else {
        console.log(chalk.blue(moment.format("dddd, D.MM.YYYY")));
    }
};
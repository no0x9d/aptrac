var findOne = require('./findOne');

module.exports = function findCurrentTask(args, done) {
    var search = {end: {$exists: false}};

    findOne(args, search, done);
};
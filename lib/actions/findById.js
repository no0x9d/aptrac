var findOne = require('./findOne');

module.exports = function findById(args, done) {
    var search = {_id: args.options.id};

    findOne(args, search, done);
};
module.exports = function queryBuilder(queryType) {
    return function (context, done) {
        var query;
        if (queryType === 'findCurrent') {
            query = {end: {$exists: false}};
        } else if (queryType === 'findById') {
            query = {_id: context.options.id};
        }
        done(null, context, query)
    }
};
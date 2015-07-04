module.exports = function queryBuilder(context, queryType) {
    var query;
    if (queryType === 'findCurrent'){
        query = {end: {$exists: false}};
    } else if(queryType === 'findById'){
        query = {_id: context.options.id};
    }
    return function (context, done) {
        done(null, context, query)
    }
};
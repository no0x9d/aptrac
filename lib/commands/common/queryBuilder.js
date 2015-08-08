function queryById(id) {
    var query;
    if (id) {
        if (Object.isArray(id)) {
            var queries = id.map(function (i) {
                return {_id: i}
            });
            query = {$or: queries};
        } else {
            query = {_id: id};
        }
    }
    return query;
}

function queryCurrent(){
    return {end: {$exists: false}};
}

function queryBuilder(queryType) {
    return function (context, done) {
        var query;
        if (queryType === 'findCurrent') {
            query = queryCurrent();
        } else if (queryType === 'findById') {
            var id = context.options.id;
            query = queryById(id);
        }
        done(null, context, query)
    }
}

module.exports = queryBuilder;
module.exports.queryById = queryById;
module.exports.queryCurrent = queryCurrent;
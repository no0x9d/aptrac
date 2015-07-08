module.exports = function queryBuilder(queryType) {
    return function (context, done) {
        var query;
        if (queryType === 'findCurrent') {
            query = {end: {$exists: false}};
        } else if (queryType === 'findById') {
            var id = context.options.id;
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
        }
        done(null, context, query)
    }
};
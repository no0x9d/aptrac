var expect = require('chai').expect;
var moment = require('moment');

var Aptrac = require('../../lib/aptrac');

describe('kill command', function () {
    it('should delete a task is id is a single value', function (done) {
        var id = 123;
        var now = moment();
        var options = {
            db: null,
            id: id
        };
        var aptrac = new Aptrac(options);
        var db = aptrac.db;
        db.insert({_id: id, start: now.toDate()}, function (err, task) {
            if (err) done(err);

            expect(task.start).to.equal(now.toDate());
            expect(task._id).to.equal(id);

            aptrac.kill(options, function (err, context, numRemoved) {
                if (err) done(err);
                expect(numRemoved).to.equal(1);
                done(err)
            })
        })
    });

    it('should throw an error if id is not a number', function (done) {
        var options = {
            id: "abcd",
            db: null
        };
        var aptrac = new Aptrac(options);

        aptrac.kill(options, function (err) {
            expect(err).to.exist;
            done()
        })
    })
});
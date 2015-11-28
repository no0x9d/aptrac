var expect = require('chai').expect;
var moment = require('moment');

var Aptrac = require('../../lib/aptrac');

describe('now command', function () {
    it('should return undefined if no task is running', function (done) {
        var options = {
            db: null
        };
        var aptrac = new Aptrac(options);

        aptrac.now(options, function (err, context, task) {
            expect(task).to.not.exist;
            done(err)
        })
    });

    it('should return the current running task', function (done) {
        var now = moment();
        var options = {db: null};
        var aptrac = new Aptrac(options);
        var db = aptrac.db;
        db.insert({start: now.toDate()}, function (err, task) {
            if(err) done(err);

            expect(task.start).to.equal(now.toDate());

            aptrac.now(options, function (err, context, task) {
                expect(task).to.exist;
                expect(task.start.isSame(now)).to.be.true;
                done(err)
            })

        });

    })
});
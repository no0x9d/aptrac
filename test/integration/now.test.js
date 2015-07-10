var expect = require('chai').expect;
var Datastore = require('nedb');
var moment = require('moment');

var aptrac = require('../../lib/aptrac');

describe('now command', function () {
    it('should return undefined if no task is running', function (done) {
        var options = {
            db: null
        };

        aptrac.now(options, function (err, context, task) {
            expect(task).to.not.exist;
            done(err)
        })
    });

    it('should return the current running task', function (done) {
        var now = moment();
        var db = new Datastore();
        db.insert({start: now.toDate()}, function (err, task) {
            if(err) done(err);

            expect(task.start).to.equal(now.toDate());

            var context = {
                isContext: true,
                options: {
                    db: null
                },
                db: db
            };

            aptrac.now(context, function (err, context, task) {
                expect(task).to.exist;
                expect(task.start.isSame(now)).to.be.true;
                done(err)
            })

        });

    })
});
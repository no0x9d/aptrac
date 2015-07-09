var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;
var Datastore = require('nedb');

chai.should();

describe('end command', function () {


    var aptrac = require('../../lib/aptrac');

    it('should end a current running task', function (done) {

        var db = new Datastore();
        var start = new Date();
        var end = moment();

        var context = {
            isContext: true,
            db: db,
            options: {
                end: end,
                db: null
            }
        };

        db.insert({_id: 1, start: start}, function (err, newObj) {
            if (err) done(err);

            expect(newObj.start).to.eql(start);

            aptrac.end(context, function (err, context, task) {
                expect(task.end.isSame(end)).to.be.true;
                expect(task._id).to.equal(1);
                expect(task.start.isSame(start)).to.be.true;
                done(err)
            })
        });

    });

    it('should return error if no task is running', function (done) {
        var options = {
            end: moment(),
            db: null
        };
        aptrac.end(options, function (err, context, task) {
            expect(err).to.not.equal.null;
            expect(task).to.equal.null;
            done()
        })
    })
});
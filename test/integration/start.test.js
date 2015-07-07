var aptrac = require('../../lib/aptrac');
var moment = require('moment');
var chai = require('chai');
var expect = chai.expect;

chai.should();

describe('start command', function () {
    it('should create a new entry in db', function (done) {
        var now = moment();
        var name = 'mocha test';

        var options = {
            db: null,
            start: now,
            task: name
        };

        aptrac.start(options, function (err, context, tasks) {
            expect(err).to.be.null;
            var task = tasks[0];
            expect(now.isSame(task.start)).to.be.true;
            expect(task._id).to.equal(1);
            expect(task.task).to.equal(name);
            done()
        });
    });
    it('should should throw if no start date is provided', function (done) {
        var options = {
            db: null,
            start: undefined,
            task: 'mocha test'
        };

        aptrac.start(options, function (err, context, tasks) {
            expect(err).to.not.be.null;
            done()
        });
    });
});
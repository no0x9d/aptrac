var expect = require('chai').expect;
var moment = require('moment');

var Aptrac = require('../../lib/aptrac');

describe('edit command', function () {

    it('should edit a current running task', function (done) {

        var db;
        var start = new Date();
        var project = "Test Project";

        var options = {
            project: project,
            db: null
        };
        var aptrac = new Aptrac(options);
        db = aptrac.db;

        db.insert({_id: 1, start: start}, function (err, newObj) {
            if (err) done(err);

            expect(newObj.start).to.eql(start);
            expect(newObj._id).to.eql(1);

            aptrac.edit(options, function (err, context, tasks) {
                var task = tasks[0];
                expect(task._id).to.equal(1);
                expect(task.start.isSame(start)).to.be.true;
                expect(task.project).to.equal(project);
                done(err)
            })
        });

    });

    it('should edit a specific task when id is given', function (done) {

        var db;
        var start = new Date();
        var project = "Test Project";
        var options = {
            project: project,
            id: 1,
            db: null
        };

        var aptrac = new Aptrac(options);
        db = aptrac.db;

        db.insert({_id: 1, start: start, end: start}, function (err, newObj) {
            if (err) done(err);

            expect(newObj.start).to.eql(start);
            expect(newObj.end).to.eql(start);
            expect(newObj._id).to.eql(1);

            db.insert({_id: 2, start: start}, function (err, newObj) {
                if (err) done(err);

                expect(newObj.start).to.eql(start);
                expect(newObj._id).to.eql(2);

                aptrac.edit(options, function (err, context, tasks) {
                    var task = tasks[0];
                    expect(task._id).to.equal(1);
                    expect(task.start.isSame(start)).to.be.true;
                    expect(task.project).to.equal(project);
                    done(err)
                })
            });

        });

    });

    it('should throw an activity overlap error if changing start time create overlap', function (done) {

        var db;
        var startMoment = moment({year: 2010, month: 3, day: 5, hour: 15, minute: 10});
        var startOne = startMoment.toDate();
        var startTwo = startMoment.clone().hour(17).toDate();
        var endTwo = startMoment.clone().hour(18).toDate();
        var options = {
            id: 2,
            start: startMoment.clone().hour(16),
            db: null
        };

        var aptrac = new Aptrac(options);
        db = aptrac.db;

        db.insert({_id: 1, start: startOne, end: startTwo}, function (err, newObj) {
            if (err) done(err);

            expect(newObj.start).to.eql(startOne);
            expect(newObj.end).to.eql(startTwo);
            expect(newObj._id).to.eql(1);

            db.insert({_id: 2, start: startTwo, end: endTwo}, function (err, newObj) {
                if (err) done(err);

                expect(newObj.start).to.eql(startTwo);
                expect(newObj._id).to.eql(2);

                aptrac.edit(options, function (err, context, tasks) {
                    expect(err).to.exist;
                    done()
                })
            });

        });

    });

    it('should return error if no task is running', function (done) {
        var options = {db: null};
        var aptrac = new Aptrac(options);

        aptrac.edit(options, function (err, context, task) {
            expect(err).to.not.equal.null;
            expect(task).to.equal.null;
            done()
        })
    })
})
;
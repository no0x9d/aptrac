var expect = require('chai').expect;
var Datastore = require('nedb');

var aptrac = require('../../lib/aptrac');

describe('test command', function () {

    it('should edit a current running task', function (done) {

        var db = new Datastore();
        var start = new Date();
        var project = "Test Project";

        var context = {
            isContext: true,
            db: db,
            options: {
                project: project
            }
        };

        db.insert({_id: 1, start: start}, function (err, newObj) {
            if (err) done(err);

            expect(newObj.start).to.eql(start);
            expect(newObj._id).to.eql(1);

            aptrac.edit(context, function (err, context, tasks) {
                var task = tasks[0];
                expect(task._id).to.equal(1);
                expect(task.start.isSame(start)).to.be.true;
                expect(task.project).to.equal(project);
                done(err)
            })
        });

    });

    it('should edit a specific task when id is given', function (done) {

        var db = new Datastore();
        var start = new Date();
        var project = "Test Project";

        var context = {
            isContext: true,
            db: db,
            options: {
                project: project,
                id: 1
            }
        };

        db.insert({_id: 1, start: start, end: start}, function (err, newObj) {
            if (err) done(err);

            expect(newObj.start).to.eql(start);
            expect(newObj.end).to.eql(start);
            expect(newObj._id).to.eql(1);

            db.insert({_id: 2, start: start}, function (err, newObj) {
                if (err) done(err);

                expect(newObj.start).to.eql(start);
                expect(newObj._id).to.eql(2);

                aptrac.edit(context, function (err, context, tasks) {
                    var task = tasks[0];
                    expect(task._id).to.equal(1);
                    expect(task.start.isSame(start)).to.be.true;
                    expect(task.project).to.equal(project);
                    done(err)
                })
            });

        });

    });

    it('should return error if no task is running', function (done) {
        var options = {
            db: null
        };
        aptrac.edit(options, function (err, context, task) {
            expect(err).to.not.equal.null;
            expect(task).to.equal.null;
            done()
        })
    })
});
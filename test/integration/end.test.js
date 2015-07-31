var expect = require('chai').expect;
var moment = require('moment');
var Datastore = require('nedb');

var aptrac = require('../../lib/aptrac');

describe('end command', function () {
    it('should end a current running task', function (done) {

        var db = new Datastore();
        var start = new Date();
        var end = moment();
        var project = "new project";

        var context = {
            isContext: true,
            db: db,
            options: {
                end: end,
                project: project,
                db: null
            }
        };

        db.insert({_id: 1, start: start}, function (err, newObj) {
            if (err) done(err);

            expect(newObj.start).to.eql(start);

            aptrac.end(context, function (err, context, task) {
                if(err) return done(err);
                expect(task.end.isSame(end)).to.be.true;
                expect(task._id).to.equal(1);
                expect(task.start.isSame(start)).to.be.true;
                expect(task.project).equal(project);
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
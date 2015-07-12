var expect = require('chai').expect;
var Datastore = require('nedb');
var moment = require('moment');

var aptrac = require('../../lib/aptrac');

describe('return command', function () {
    it('should not return if not ended task is present', function (done) {
        var options = {
            db: null
        };
        aptrac.return(options, function (err, context, task) {
            expect(task).to.not.exist;
            expect(err).to.exist;
            done()
        })
    });

    it('should start a new task with all properties from the last ended task', function (done) {
        var now = moment();
        var db = new Datastore();

        var endedTask = {
            _id: 1,
            start: moment().subtract(3, 'hours').toDate(),
            end: moment().subtract(2, 'hours').toDate(),
            task: "testing",
            project: "aptrac",
            note: "nothing"
        };

        db.insert(endedTask, function (err, task) {
            if (err) done(err);

            expect(task.start).to.equal(endedTask.start);
            expect(task.end).to.equal(endedTask.end);

            var context = {
                isContext: true,
                options: {
                    start: now,
                    db: null
                },
                db: db
            };

            aptrac.return(context, function(err, context, task){
                if(err) done(err);

                expect(now.isSame(task.start)).to.be.true;
                expect(task.end).to.not.exist;
                expect(task.task).to.equal(endedTask.task);
                expect(task.project).to.equal(endedTask.project);
                expect(task.note).to.equal(endedTask.note);

                done(err)
            })
        })
    })
});
var expect = require('chai').expect;
var Datastore = require('nedb');
var moment = require('moment');

var aptrac = require('../../lib/aptrac');

describe('kill command', function () {
   it('should delete a task is id is a single value', function (done) {
       var id = 123;
       var now = moment();
       var db = new Datastore();
       db.insert({_id: id, start: now.toDate()}, function (err, task) {
           if (err) done(err);

           expect(task.start).to.equal(now.toDate());
           expect(task._id).to.equal(id);

           var context = {
               isContext: true,
               options: {
                   db: null,
                   id: id
               },
               db: db
           };

           aptrac.kill(context, function (err, context, numRemoved) {
               if(err) done(err);
               expect(numRemoved).to.equal(1);
               done(err)
           })
       })
   });

    it('should throw an error if id is not a number', function (done) {
        var options = {
            id: "abcd"
        };

        aptrac.kill(options, function (err) {
            expect(err).to.exist;
            done()
        })
    })
});
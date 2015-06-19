"use strict";

var program = require('commander');
var init = require('./lib/init-db');
var start = require('./lib/actions/start');
var edit = require('./lib/actions/edit');

program
    .version('1.0.0');

program
    .command('start [task]')
    .alias('s')
    .description('starts a new task')
    .option("-t, --time <time>", "sets the start time (default: now)")
    .option("-d, --date <date>", "sets the start date (default: today)")
    .option("-n, --note <note>", "personal notes")
    .option("-p, --project <project>", "project for task")
    .option("--db <db>", "database connection")
    .action(function (task, options) {
        options.task = task;
        var db = init(options);
        start(db, options);
    });

program
    .command('edit [task]')
    .alias('ed')
    .description('edits the current active task')
    .option("-t, --time <time>", "sets the start time (default: now)")
    .option("-T, --end-time <time>", "sets the end time (default: now)")
    .option("-d, --date <date>", "sets the date (default: today)")
    .option("-n, --note <note>", "personal notes")
    .option("-p, --project <project>", "project for task")
    .option("--db <db>", "database connection")
    .action(function (task, options) {
        console.log("task:" ,task);
        var db = init(options);
        db.findOne({ end: { $exists: false } }, function(err, obj){
            if(err) {
                console.log("could not find object to edit");
            }
            edit(db, obj._id, options);
        });
    });

program
    .command('end [task]')
    .alias('en')
    .description('set the state of the current active task to end')
    .option('-r, --return', "start a follow up task with the same settings as the previous one")
    .option("-t, --time <time>", "sets the start time (default: now)")
    .option("-d, --date <date>", "sets the start date (default: today)")
    .option("-n, --note <note>", "personal notes")
    .option("-p, --project <project>", "project for task")
    .option("--db <db>", "database connection")
    .action(function (task, options) {
        "use strict";
    });

program
    .command('return')
    .alias('r')
    .description('returns to the previous active task')
    .action(function (options) {
        
    });

program
    .command('list')
    .alias('l')
    .action(function (options) {
        "use strict";

        var db = init(options);
        db.find({}, function (err, objs){
            if(err) {
                console.log("could not load tasks");
                return;
            }
            objs.forEach(function (obj) {
                console.log(obj);
            })
        });
    });

program.parse(process.argv);
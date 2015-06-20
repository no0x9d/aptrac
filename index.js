"use strict";

var program = require('commander');
var init = require('./lib/util/init-db');
var edit = require('./lib/actions/edit');
var end = require('./lib/actions/end');
var create = require('./lib/actions/create');
var findCurrent = require('./lib/actions/findCurrent');
var moment = require('moment');
var a = require('./lib/util/arguments');
var async = require('async');

function parseTime(dateTime) {
    return moment(dateTime, 'HH:mm');
}

function parseDate(dateString) {
    return moment(dateString, 'DD.MM.YY');
}

program
    .version('1.0.0');

program
    .command('start [task]')
    .alias('s')
    .description('starts a new task')
    .option("-t, --time <time>", "sets the start time (default: now)", parseTime, moment())
    .option("-d, --date <date>", "sets the start date (default: today)", parseDate, moment())
    .option("-n, --note <note>", "personal notes")
    .option("-p, --project <project>", "project for task")
    .option("--db <db>", "database connection")
    .action(function (task, options) {
        options.task = task;
        async.waterfall([
            a.bind(this, options),
            findCurrent,
            end,
            create,
            edit
        ], function (err, args) {
            if (err) console.log(err);
            else
                console.log(args.task);
        });
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
        options.task = task;
        async.waterfall([
            a.bind(this, options),
            findCurrent,
            edit
        ], function (err, args) {
            if (err) console.log(err);
            else
                console.log(args.task);
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
        options.task = task;
        async.waterfall([
            a.bind(this, options),
            findCurrent,
            edit,
            end
        ], function (err, args) {
            if (err) console.log(err);
            else
                console.log(args.task);
        });
    });

program
    .command('return')
    .alias('r')
    .description('returns to the previous active task')
    .action(function (options) {
        async.waterfall([
                a.bind(this, options),
                function (args, done) {
                    var db = args.db;
                    db.find({end: {$exists: true}})
                        .sort({start: -1})
                        .limit(1).
                        exec(function (err, tasks) {
                            if (tasks.length !== 1)
                                return done("did not found task to return to");

                            var task = tasks[0];
                            args.rerun = task;
                            done(null, task);
                        })
                },
                findCurrent,
                end,
                create,
                //todo set edit options from rerunned task
                function (args, done){
                    args.blub = args.rerun;
                    done(null, args)
                },
                edit
            ], function (err, task) {
                if (err) console.log(err);
                else
                    console.log(task);
            }
        )
    });

program
    .command('list')
    .alias('l')
    .action(function (options) {
        "use strict";

        var db = init(options);
        db.find({}, function (err, objs) {
            if (err) {
                console.log("could not load tasks");
                return;
            }
            objs.forEach(function (obj) {
                console.log(obj);
            })
        });
    });

program.parse(process.argv);
# aptrac

#### A javascript work time tracker for your console.
Because it's specialized to track what you do at work, the application is opinionated in two ways.

1. Only one task can be running at any time. When you start a new task, the running task is ended with the starting time of the new task
For now this limitation is not hard enforced, so that it's possible to have concurrent running tasks by manually editing the start and end times. This may however change!
2. It's technically possible that a task can span multiple days, but the default output assumes that a task is not longer than 24 hours.

All task entries have this fields

* id *(required)*
* start *(required)*
* end
* project
* task
* note

The id is set automatically and only needed for editing or deleting tasks. The start field is required, but always defaults to *now* if not set.

## how to get it

Clone this repository, or download it and install it globally. You need node.js and npm installed to use aptrac.

```sh
$ git clone https://github.com/no0x9d/aptrac.git
$ cd aptrac
$ npm install -g
```

## how to use it

Installing aptrac adds the application as `aptrac` and `a` to your path.
For detailed usage consult the application help with `aptrac -h` or `aptrac [command] -h`

### commands
> Nearly all commands and options can be abbreviated to one or two letters.
> The only exceptions are the `set` and `unset` commands and the `--db` option.
> For more clarity this documentation uses the full versions for both commands and options.

* **start (s)** starts a new task
* **edit (ed)** edits the current running task
* **end (en)** ends the current running task
* **return (r)** starts a new task with the values from the last ended task
* **split (sp)** splits a task in two at a given time.
* **list (l)** displays a set of tasks (default: today's tasks)
* **now (n)** displays the current running task
* **kill (k)** deletes a task
* **set** sets default values to use
* **unset** resets values to their default

## working with time

aptrac accepts for all time parameters these formats `HH:mm`, `DD.MM HH:mm`, `DD.MM.YY HH:mm`, `DD.MM`, `DD.MM.YY`.

If none of these formats matches, the date parser of Sugar is used, which allows parsing of natural language time strings like `"5 minutes ago"` or `"monday at 11:30"`.
For more information read the Sugar API (http://sugarjs.com/dates)

## configuration
For all not time based options a default value can be set in a configuration file which are used when a new task is started.

aptrac supports multiple configuration file, where you can group a set of default values, so you don't have so set more than one option flag. If a option is set in the configuration and also with an option flag, the value from the option is used.

All config files are in the aptrac home directory and are referenced by name only. To create a new config set the `--config` option on the `aptrac set` command with a new name and the config is created.

### Aliases
> Note that only String based options can be replaced by aliases. No default values for Date and Number are supported for now.

You can set aliases for often used option parameters, which are automatic replaced (see also advanced use cases).

```sh
$ aptrac set --alias t=Test
```
Now it can be used in every option field that requires a string.
```
$ aptrac start t
Thursday, 25.06.2015
ID | START | END   | DURATION | PROJECT | TASK  | NOTE
1  | 09:29 |       |  00:00   |         | Test  |
```

If you want to use a string as option parameter which is set as an alias, you have to escape the option with a leading backslash (\\).

```
$ aptrac start \t
Thursday, 25.06.2015
ID | START | END   | DURATION | PROJECT | TASK  | NOTE
1  | 09:29 |       |  00:00   |         | t     |
```

To use a alias inside a longer option string, put it in curly braces ({}). Ti input a text with a pair of curly braces inside escape the opening brace with a backslash (\\).

```
$ aptrac start "an longer {t}"
Thursday, 25.06.2015
ID | START | END   | DURATION | PROJECT | TASK           | NOTE
1  | 09:29 |       |  00:00   |         | an longer Test |
```

## advanced use case

Imagine I have a main project for "ACME Corp." and a side project for "SomeBigCompany" and I also want to use aptrac for my private tracking on the same machine.

To minimize the input I have to do, I first I set the default project to "ACME Corp.", make an alias for "SomeBigCompany" and a own configuration for my private uses.
```sh
$ aptrac set --project "ACME Corp." --alias S=SomeBigCompany
```

If I now start a task with

```sh
$ aptrac start "doing somthing important"
Thursday, 25.06.2015
ID | START | END   | DURATION | PROJECT    | TASK                      | NOTE
1  | 09:29 |       |  00:00   | ACME Corp. | doing somthing important  |

```

It's project is automatically set to "ACME Corp.". To start a task for "SomeBigCompany" I can use

```sh
$ aptrac start --project S "equally important"
Thursday, 25.06.2015
ID | START | END   | DURATION | PROJECT        | TASK              | NOTE
2  | 10:30 |       |  00:00   | SomeBigCompany | equally important |
```

To create a new configuration named `p`, to bundle different settings, I can use the config flag

```
$ aptrac set --project aptrac --db path/to/private.db --config p
```

When I want to start a private task, I set the config flag to my config `p` with

```sh
$ aptrac start --config p "working on aptrac documentation"
Thursday, 25.06.2015
ID | START | END   | DURATION | PROJECT | TASK                            | NOTE
1  | 18:10 |       |  00:00   | aptrac  | working on aptrac documentation |
```
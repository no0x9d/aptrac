# aptrac

A javascript work time tracker for your console.
Because it's specialized to track what you do at work, the application is opinionated in two ways.

1. Only one task can be running at any time. When you start a new task, the running task is ended with the starting time of the new task
2. It's technically possible that a task can span multiple days, but the default output assumes that a task is not longer than 24 hours.

## how to get it

Clone this repository and install it globally.

```sh
$ git clone https://github.com/no0x9d/aptrac.git
$ npm install -g
```

## how to use it

Installing aptrac adds the application as `aptrac` and `a` to your path.
For detailed usage consult the application help with `aptrac -h` or `aptrac [command] -h`

## working with time

aptrac accepts for all time parameters these formats `HH:mm`, `DD.MM HH:mm`, `DD.MM.YY HH:mm`, `DD.MM`, `DD.MM.YY`.

If none of these formats matches, the date parser of Sugar is used, which allows parsing of natural language time strings like `"5 minutes ago"` or `"monday at 11:30"`.
For more information read the Sugar API (http://sugarjs.com/dates)

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
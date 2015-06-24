# aptrac

A javascript work time tracker for your console.

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

If none of these formats matches, the date parser of Sugar is used, which allows parsing of natural language time strings like `'5 minutes ago'` or `'monday at 11:30'`.
For more information read the Sugar API (http://sugarjs.com/dates)

## advanced use case

Imagine I have a main project for "ACME Corp." and a side project for "SomeBigCompany" and I also want to use aptrac for my private tracking on the same machine.

To minimize the text I have to input I first I set the default project to "ACME Corp.", make an alias for "SomeBigCompany" and a own configuration for my private uses.
```sh
$ aptrac set --project "ACME Corp." --alias S=SomeBigCompany
```

If I now start a task with 

```sg
$ aptrac start "doing somthing important"
``` 

It's project is automatically set to "ACME Corp.". To start a task for "SomeBigCompany" I can use 

```
$ aptrac start --project S "equally important"
```

To create a new configuration named `p`, to bundle different settings, I can use the config flag

```
$ aptrac set --project aptrac --db path/to/private.db --config p
```

When I want to start a private task, I set the config flag to my config `p` with

```
$ aptrac start --config p "working on aptrac documentation"
```
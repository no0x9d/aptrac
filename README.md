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
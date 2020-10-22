# printaeu

console.log() + replace line + time stamp (even with ms) + colors + modifiers = print

### Install
`npm i printaeu`

### Usage
It's just a wrap for `console.log()`, **but with time stamp**. So it receive the same parameters of `console.log`.

```JavaScript
    const print = require('./printaeu');

    // All of them has time stamp
    print.log('Like console.log');  // [08:39] Like console.log
    print.inline.log('Replace previous line');
    print.inline.green('Replace previous line + green');    // print.inline has all available colors
    print.inline.bright.magenta('Replace previous line + bright + green');

    // Colors available
    print.red('Red');
    print.green('Green');
    print.magenta('Magenta');
    print.white('White');
    print.black('Black');
    print.blue('Blue');
    print.cyan('Cyan');
    print.yellow('Yellow');

```

### Parameters
+ **...args:** Just like console.log().

### Working
```Javascript
    const hey = 'HEY';
    print.log(hey, `${hey}`, 'YOU YOU');
    print.cyan("I don't like your girlfriend!");
    print.underscore.yellow('\u{26a0} NO WAY NO WAY');

    print.showMs();

    print.bright.green("\u{267b} I think you need a new one");
    print.reverse.log('HEY HEY YOU YOU');

    print.showMs(false);

    setTimeout(() => {print.inline.bright.red('I could be your girlfriend \u{2764} \u{2764} \u{2764}')}, 3000);
```

### Whole Lib

```JavaScript
    const print = require('./printaeu');

    // All of them has time stamp
    print.log('Like console.log');  // [08:39] Like console.log
    print.inline.log('Replace previous line');
    print.inline.green('Replace previous line + green');    // print.inline has all available colors
    print.inline.bright.magenta('Replace previous line + bright + green');

    // Colors available
    print.red('Red');
    print.green('Green');
    print.magenta('Magenta');
    print.white('White');
    print.black('Black');
    print.blue('Blue');
    print.cyan('Cyan');
    print.yellow('Yellow');

    // Bright colors
    print.bright.log('Like console.log but brighter');
    print.bright.red('Bright Red');     // print.bright has all available colors

    // Underscore + colors
    print.underscore.log('Like console.log but underscored');
    print.underscore.green('Bright Green');     // print.underscore has all available colors

    // Reversed background
    print.reverse.log('Like console.log but with background reversed');
    print.reverse.green('Bright Green');     // print.reverse has all available colors

    // Reversed background
    print.dim.log('Like console.log but dim');
    print.dim.green('Bright Green');     // print.dim has all colors above

    // More
    print.showMs(false);    // Switch milliseconds display
    try {
        print.socket(socket);   // Every print.log(data) it executes socket.emit('console', [timeStamp] data);
    } catch(error) {
        print.track(error);     // Print the error in a more readable way
    }
```
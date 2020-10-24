# printaeu

Time stamp is a must. Period.

console.log() + replace line + time stamp (even with ms) + colors + modifiers = print

### Install
`npm i printaeu`

### Usage
It's just a wrap for `console.log()`, **but with time stamp**. So it receives the same parameters of `console.log`.

```JavaScript
const print = require('./printaeu');

// All of them has time stamp
print.log('Like console.log');  // [08:39] Like console.log
print.inline.log('Replace previous line');
print.inline.green('Replace previous line + green');    // print.inline has all available colors
print.inline.bright.magenta('Replace previous line + bright + green');

// Clear console
print.clear();

// Colors available
print.red('Red');
print.green('Green');
print.magenta('Magenta');
print.white('White');
print.black('Black');
print.blue('Blue');
print.cyan('Cyan');
print.gray('Gray');
print.pink('Pink');
print.orange('Orange');

```

### Parameters
+ **...args:** Just like console.log().

### Show milliseconds
`print.showMs()` turn it on.
`print.showMs(false)` turn it off.

### Clear
`print.clear()` clear the terminal.
`print.clearLine(lines = 0)` clear some line. No args clears the current line.
`print.goBacknLines(lines)` move the cursor N lines from the current position. Negative goes down.

### Track errors
I don't commit errors, but when you do it's better to know where this come from.

```Javascript
const print = require('./printaeu');

function foo () {
    print.green(thisVarDoesntExist);
}

try {
    foo();
} catch(e) {
    print.red('omg wheres this error come from? help me print');
    print.track(e); // Like stack error, but beautier
}
```

### Not sure?
Copy, paste and run.

```Javascript
const print = require('./printaeu');

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

### Socket
`print.socket(socket);` receives a `socket` from Socket.io lib. Then, every `print.log` call will fire `socket.emit('console', [timeStamp] + data)`.

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
print.gray('Gray');
print.pink('Pink');
print.orange('Orange');

// Bright or Bold colors
print.bright.log('Like console.log but brighter');
print.bold.log('Like console.log but bold');
print.bright.red('Bright Red');     // print.bright has all available colors
print.bold.red('Bold Red');     // print.bright has all available colors

// Italic colors
print.bright.log('Like console.log but *italic*');
print.italic.red('Italic Red');     // print.italic has all available colors

// Underscore + colors
print.underscore.log('Like console.log but underscored');
print.underscore.green('Underscore Green');     // print.underscore has all available colors

// Reversed background
print.reverse.log('Like console.log but with background reversed');
print.reverse.green('Reverse Green');     // print.reverse has all available colors

// Dim colors
print.dim.log('Like console.log but dim');
print.dim.green('Bright Green');     // print.dim has all colors above

// More
print.showMs(false);    // Switch milliseconds display
print.setBg.cyan('magenta');     // Switch the background color of all cyan prints (pink, orange and gray bg are not available)
print.clearBg.cyan();   // Set the default bg for all cyan prints
try {
    print.socket(socket);   // Every print.log(data) it executes socket.emit('console', [timeStamp] data);
} catch(error) {
    print.track(error);     // Print the error in a more readable way
}
```
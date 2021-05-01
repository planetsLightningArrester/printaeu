const { print } = require('../release/printaeu.min.js');
// const { print } = require('../src/printaeu');

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
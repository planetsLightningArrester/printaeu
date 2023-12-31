const { print, warning, recycle, heart } = require('../dist/printaeu.js');
// const { print } = require('../src/printaeu');

const hey = 'HEY';
print.log(hey, `${hey}`, 'YOU YOU');
print.cyan("I don't like your girlfriend!");

print.showDate();
print.underscore.yellow(warning, 'NO WAY NO WAY');
print.showDate(false);

print.showMs();

print.bright.green(`${recycle} I think you need a new one`);
print.reverse.log('HEY HEY YOU YOU');

print.showMs(false);

setTimeout(() => {print.inline.bright.red('I could be your girlfriend ' + heart + heart + heart)}, 3000);
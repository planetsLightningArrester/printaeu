const { print } = require('../release/printaeu.min.js');
// const { print } = require('../src/printaeu');

const warningSign = '\u{26a0}',
      recycleBin  = '\u{267b}',
      heart       = '\u{2764}';

const hey = 'HEY';
print.log(hey, `${hey}`, 'YOU YOU');
print.cyan("I don't like your girlfriend!");

print.showDate();
print.underscore.yellow(warningSign, 'NO WAY NO WAY');
print.showDate(false);

print.showMs();

print.bright.green(`${recycleBin} I think you need a new one`);
print.reverse.log('HEY HEY YOU YOU');

print.showMs(false);

setTimeout(() => {print.inline.bright.red('I could be your girlfriend ' + heart + heart + heart)}, 3000);
import { print } from '../printaeu';

const jestConsole = console;

beforeEach(() => {
  global.console = require('console');
});

afterEach(() => {
  global.console = jestConsole;
});

test('check errors thrown', () => {

  print.clear();

  print.black('black');
  print.inline.red('inline red');
  print.green('green');
  print.yellow('yellow');
  print.blue('blue');
  print.magenta('magenta');
  print.cyan('cyan');
  print.white('white');
  print.gray('gray');
  print.grey('grey');
  print.pink('pink');
  print.orange('orange');

  print.bright.black('bright black');
  print.bright.red('bright red');
  print.bright.green('bright green');
  print.bright.yellow('bright yellow');
  print.bright.blue('bright blue');
  print.bright.magenta('bright magenta');
  print.bright.cyan('bright cyan');
  print.bright.white('bright white');
  print.bright.gray('bright gray');
  print.bright.grey('bright grey');
  print.bright.pink('bright pink');
  print.bright.orange('bright orange');

  print.bold.black('bold black');
  print.bold.red('bold red');
  print.bold.green('bold green');
  print.bold.yellow('bold yellow');
  print.bold.blue('bold blue');
  print.bold.magenta('bold magenta');
  print.bold.cyan('bold cyan');
  print.bold.white('bold white');
  print.bold.gray('bold gray');
  print.bold.grey('bold grey');
  print.bold.pink('bold pink');
  print.bold.orange('bold orange');

  print.dim.black('dim black');
  print.dim.red('dim red');
  print.dim.green('dim green');
  print.dim.yellow('dim yellow');
  print.dim.blue('dim blue');
  print.dim.magenta('dim magenta');
  print.dim.cyan('dim cyan');
  print.dim.white('dim white');
  print.dim.gray('dim gray');
  print.dim.grey('dim grey');
  print.dim.pink('dim pink');
  print.dim.orange('dim orange');

  print.italic.black('italic black');
  print.italic.red('italic red');
  print.italic.green('italic green');
  print.italic.yellow('italic yellow');
  print.italic.blue('italic blue');
  print.italic.magenta('italic magenta');
  print.italic.cyan('italic cyan');
  print.italic.white('italic white');
  print.italic.gray('italic gray');
  print.italic.grey('italic grey');
  print.italic.pink('italic pink');
  print.italic.orange('italic orange');

  print.reverse.black('reverse black');
  print.reverse.red('reverse red');
  print.reverse.green('reverse green');
  print.reverse.yellow('reverse yellow');
  print.reverse.blue('reverse blue');
  print.reverse.magenta('reverse magenta');
  print.reverse.cyan('reverse cyan');
  print.reverse.white('reverse white');
  print.reverse.gray('reverse gray');
  print.reverse.grey('reverse grey');
  print.reverse.pink('reverse pink');
  print.reverse.orange('reverse orange');

  print.inline.dim.black('inline black');
  print.inline.dim.red('inline red');
  print.inline.dim.green('inline green');
  print.inline.dim.yellow('inline yellow');
  print.inline.dim.blue('inline blue');
  print.inline.dim.magenta('inline magenta');
  print.inline.dim.cyan('inline cyan');
  print.inline.dim.white('inline white');
  print.inline.dim.gray('inline gray');
  print.inline.dim.grey('inline grey');
  print.inline.dim.pink('inline pink');
  print.inline.dim.orange('inline orange');

  print.showMs();

  print.black('black');
  print.inline.red('inline red');
  print.green('green');
  print.yellow('yellow');
  print.blue('blue');
  print.magenta('magenta');
  print.cyan('cyan');
  print.white('white');
  print.gray('gray');
  print.grey('grey');
  print.pink('pink');
  print.orange('orange');

  print.bright.black('bright black');
  print.bright.red('bright red');
  print.bright.green('bright green');
  print.bright.yellow('bright yellow');
  print.bright.blue('bright blue');
  print.bright.magenta('bright magenta');
  print.bright.cyan('bright cyan');
  print.bright.white('bright white');
  print.bright.gray('bright gray');
  print.bright.grey('bright grey');
  print.bright.pink('bright pink');
  print.bright.orange('bright orange');

  print.bold.black('bold black');
  print.bold.red('bold red');
  print.bold.green('bold green');
  print.bold.yellow('bold yellow');
  print.bold.blue('bold blue');
  print.bold.magenta('bold magenta');
  print.bold.cyan('bold cyan');
  print.bold.white('bold white');
  print.bold.gray('bold gray');
  print.bold.grey('bold grey');
  print.bold.pink('bold pink');
  print.bold.orange('bold orange');

  print.dim.black('dim black');
  print.dim.red('dim red');
  print.dim.green('dim green');
  print.dim.yellow('dim yellow');
  print.dim.blue('dim blue');
  print.dim.magenta('dim magenta');
  print.dim.cyan('dim cyan');
  print.dim.white('dim white');
  print.dim.gray('dim gray');
  print.dim.grey('dim grey');
  print.dim.pink('dim pink');
  print.dim.orange('dim orange');

  print.italic.black('italic black');
  print.italic.red('italic red');
  print.italic.green('italic green');
  print.italic.yellow('italic yellow');
  print.italic.blue('italic blue');
  print.italic.magenta('italic magenta');
  print.italic.cyan('italic cyan');
  print.italic.white('italic white');
  print.italic.gray('italic gray');
  print.italic.grey('italic grey');
  print.italic.pink('italic pink');
  print.italic.orange('italic orange');

  print.reverse.black('reverse black');
  print.reverse.red('reverse red');
  print.reverse.green('reverse green');
  print.reverse.yellow('reverse yellow');
  print.reverse.blue('reverse blue');
  print.reverse.magenta('reverse magenta');
  print.reverse.cyan('reverse cyan');
  print.reverse.white('reverse white');
  print.reverse.gray('reverse gray');
  print.reverse.grey('reverse grey');
  print.reverse.pink('reverse pink');
  print.reverse.orange('reverse orange');

  print.inline.dim.black('inline black');
  print.inline.dim.red('inline red');
  print.inline.dim.green('inline green');
  print.inline.dim.yellow('inline yellow');
  print.inline.dim.blue('inline blue');
  print.inline.dim.magenta('inline magenta');
  print.inline.dim.cyan('inline cyan');
  print.inline.dim.white('inline white');
  print.inline.dim.gray('inline gray');
  print.inline.dim.grey('inline grey');
  print.inline.dim.pink('inline pink');
  print.inline.dim.orange('inline orange');
  print.setBG.cyan('magenta');

  print.showDate();

  print.black('black');
  print.inline.red('inline red');
  print.green('green');
  print.yellow('yellow');
  print.blue('blue');
  print.magenta('magenta');
  print.cyan('cyan');
  print.white('white');
  print.gray('gray');
  print.grey('grey');
  print.pink('pink');
  print.orange('orange');

  print.bright.black('bright black');
  print.bright.red('bright red');
  print.bright.green('bright green');
  print.bright.yellow('bright yellow');
  print.bright.blue('bright blue');
  print.bright.magenta('bright magenta');
  print.bright.cyan('bright cyan');
  print.bright.white('bright white');
  print.bright.gray('bright gray');
  print.bright.grey('bright grey');
  print.bright.pink('bright pink');
  print.bright.orange('bright orange');

  print.bold.black('bold black');
  print.bold.red('bold red');
  print.bold.green('bold green');
  print.bold.yellow('bold yellow');
  print.bold.blue('bold blue');
  print.bold.magenta('bold magenta');
  print.bold.cyan('bold cyan');
  print.bold.white('bold white');
  print.bold.gray('bold gray');
  print.bold.grey('bold grey');
  print.bold.pink('bold pink');
  print.bold.orange('bold orange');

  print.dim.black('dim black');
  print.dim.red('dim red');
  print.dim.green('dim green');
  print.dim.yellow('dim yellow');
  print.dim.blue('dim blue');
  print.dim.magenta('dim magenta');
  print.dim.cyan('dim cyan');
  print.dim.white('dim white');
  print.dim.gray('dim gray');
  print.dim.grey('dim grey');
  print.dim.pink('dim pink');
  print.dim.orange('dim orange');

  print.italic.black('italic black');
  print.italic.red('italic red');
  print.italic.green('italic green');
  print.italic.yellow('italic yellow');
  print.italic.blue('italic blue');
  print.italic.magenta('italic magenta');
  print.italic.cyan('italic cyan');
  print.italic.white('italic white');
  print.italic.gray('italic gray');
  print.italic.grey('italic grey');
  print.italic.pink('italic pink');
  print.italic.orange('italic orange');

  print.reverse.black('reverse black');
  print.reverse.red('reverse red');
  print.reverse.green('reverse green');
  print.reverse.yellow('reverse yellow');
  print.reverse.blue('reverse blue');
  print.reverse.magenta('reverse magenta');
  print.reverse.cyan('reverse cyan');
  print.reverse.white('reverse white');
  print.reverse.gray('reverse gray');
  print.reverse.grey('reverse grey');
  print.reverse.pink('reverse pink');
  print.reverse.orange('reverse orange');

  print.inline.dim.black('inline black');
  print.inline.dim.red('inline red');
  print.inline.dim.green('inline green');
  print.inline.dim.yellow('inline yellow');
  print.inline.dim.blue('inline blue');
  print.inline.dim.magenta('inline magenta');
  print.inline.dim.cyan('inline cyan');
  print.inline.dim.white('inline white');
  print.inline.dim.gray('inline gray');
  print.inline.dim.grey('inline grey');
  print.inline.dim.pink('inline pink');
  print.inline.dim.orange('inline orange');
  print.setBG.cyan('magenta');

  print.showMs(false);

  print.black('black');
  print.inline.red('inline red');
  print.green('green');
  print.yellow('yellow');
  print.blue('blue');
  print.magenta('magenta');
  print.cyan('cyan');
  print.white('white');
  print.gray('gray');
  print.grey('grey');
  print.pink('pink');
  print.orange('orange');

  print.bright.black('bright black');
  print.bright.red('bright red');
  print.bright.green('bright green');
  print.bright.yellow('bright yellow');
  print.bright.blue('bright blue');
  print.bright.magenta('bright magenta');
  print.bright.cyan('bright cyan');
  print.bright.white('bright white');
  print.bright.gray('bright gray');
  print.bright.grey('bright grey');
  print.bright.pink('bright pink');
  print.bright.orange('bright orange');

  print.bold.black('bold black');
  print.bold.red('bold red');
  print.bold.green('bold green');
  print.bold.yellow('bold yellow');
  print.bold.blue('bold blue');
  print.bold.magenta('bold magenta');
  print.bold.cyan('bold cyan');
  print.bold.white('bold white');
  print.bold.gray('bold gray');
  print.bold.grey('bold grey');
  print.bold.pink('bold pink');
  print.bold.orange('bold orange');

  print.dim.black('dim black');
  print.dim.red('dim red');
  print.dim.green('dim green');
  print.dim.yellow('dim yellow');
  print.dim.blue('dim blue');
  print.dim.magenta('dim magenta');
  print.dim.cyan('dim cyan');
  print.dim.white('dim white');
  print.dim.gray('dim gray');
  print.dim.grey('dim grey');
  print.dim.pink('dim pink');
  print.dim.orange('dim orange');

  print.italic.black('italic black');
  print.italic.red('italic red');
  print.italic.green('italic green');
  print.italic.yellow('italic yellow');
  print.italic.blue('italic blue');
  print.italic.magenta('italic magenta');
  print.italic.cyan('italic cyan');
  print.italic.white('italic white');
  print.italic.gray('italic gray');
  print.italic.grey('italic grey');
  print.italic.pink('italic pink');
  print.italic.orange('italic orange');

  print.reverse.black('reverse black');
  print.reverse.red('reverse red');
  print.reverse.green('reverse green');
  print.reverse.yellow('reverse yellow');
  print.reverse.blue('reverse blue');
  print.reverse.magenta('reverse magenta');
  print.reverse.cyan('reverse cyan');
  print.reverse.white('reverse white');
  print.reverse.gray('reverse gray');
  print.reverse.grey('reverse grey');
  print.reverse.pink('reverse pink');
  print.reverse.orange('reverse orange');

  print.inline.dim.black('inline black');
  print.inline.dim.red('inline red');
  print.inline.dim.green('inline green');
  print.inline.dim.yellow('inline yellow');
  print.inline.dim.blue('inline blue');
  print.inline.dim.magenta('inline magenta');
  print.inline.dim.cyan('inline cyan');
  print.inline.dim.white('inline white');
  print.inline.dim.gray('inline gray');
  print.inline.dim.grey('inline grey');
  print.inline.dim.pink('inline pink');
  print.inline.dim.orange('inline orange');
  print.setBG.cyan('magenta');

  print.cyan('hiiiiiii')
  print.cyan('hiiiiiii2')
  print.bold.cyan('hiiiiiii2')

  // print.toLog('ola', './teste.txt');
  // print.toLog('nova linha');
  // print.toLog('nova linha');
  // print.toLog({locura: 'dado'});
});
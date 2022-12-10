import { Print, color, bold } from "../printaeu";

const jestConsole = console;

beforeEach(() => {
  global.console = require('console');
});

afterEach(() => {
  global.console = jestConsole;
});

test('custom printers', () => {
  const warn = Print.create();
  warn.preAppend(`${color.reset}[${color.cyan}DB${color.reset}] [${color.yellow}WARN${color.reset}] `);
  warn.setColorfulTimeStamp(false);
  const info = Print.create();
  info.preAppend(`${color.reset}[${color.cyan}DB${color.reset}] [${color.cyan}INFO${color.reset}] `);
  info.setColorfulTimeStamp(true);

  warn.red('test');
  info.inline.log('test');
})

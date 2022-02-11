
import { print, bold as b, italic as i, dim as d, underline as u, reverse as r } from '../printaeu'

const jestConsole = console;

beforeEach(() => {
  global.console = require('console');
});

afterEach(() => {
  global.console = jestConsole;
});

test('external modifiers', () => {
  print.setColorfulTimeStamp(false);
  print.showMs()
  print.green(`No way I'm gonna do ${b.on}this!!!`);
  print.gray(`${i.on}Believe me, you'll!${i.off} - he said. ${i.on}Check ${u.on}this${u.off} out`);
  print.underline.green(`${b.on}How?${d.off} - I thought`);
  print.log(`${b.on}Shot ${r.on}reverse${r.off} shot`);
})

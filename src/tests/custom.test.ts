import { Print, color, bold } from "../printaeu";
import fs from 'fs';
import path from 'path';

const jestConsole = console;
const tempPath = path.join(__dirname, 'tmp');

beforeEach(() => {
  global.console = require('console');
  try {
    fs.mkdirSync(path.join(tempPath));
  } catch (error) { }
});

afterEach(() => {
  global.console = jestConsole;
  fs.rmSync(tempPath, { recursive: true });
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

test('custom printers with file logs', () => {
  const info = Print.create();
  info.preAppend(`${color.reset}[${color.cyan}DB${color.reset}] [${color.cyan}INFO${color.reset}] `);
  info.setColorfulTimeStamp(true);
  const infoLogPath = path.join(tempPath, 'info.log');
  info.logToFile(infoLogPath);
  const content1 = 'data';
  const content2 = 'test';
  const content3 = "shouldn't log"

  info.red(content1)
  info.inline.log(content2);

  expect(fs.existsSync(infoLogPath)).toBeTruthy()
  expect(fs.readFileSync(infoLogPath, 'utf8')).toMatch(content1);
  expect(fs.readFileSync(infoLogPath, 'utf8')).toMatch(content2);

  info.logToFile(infoLogPath, false);
  info.log(content3);
  expect(fs.readFileSync(infoLogPath, 'utf8')).not.toMatch(content3);

})

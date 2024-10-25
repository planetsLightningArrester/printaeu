import { color, Print } from "../printaeu.ts";
import * as path from "jsr:@std/path";
import { assertSpyCalls, restore, spy } from "@std/testing/mock";
import { assertMatch, assertNotMatch } from "@std/assert";

Deno.test(function CustomPrinters() {
  restore(); // Clear spies
  const logSpy = spy(console, "log");

  const warn = Print.create();
  warn.preAppend(`${color.reset}[${color.cyan}DB${color.reset}] [${color.yellow}WARN${color.reset}] `);
  warn.setColorfulTimeStamp(false);
  const info = Print.create();
  info.preAppend(`${color.reset}[${color.cyan}DB${color.reset}] [${color.cyan}INFO${color.reset}] `);
  info.setColorfulTimeStamp(true);

  warn.red("test");
  info.inline.log("test");
  assertSpyCalls(logSpy, 2);
});

Deno.test(function CustomPrintersWithFileLogs() {
  const info = Print.create();
  info.preAppend(`${color.reset}[${color.cyan}DB${color.reset}] [${color.cyan}INFO${color.reset}] `);
  info.setColorfulTimeStamp(true);
  const tempDir = Deno.makeTempDirSync();
  const infoLogPath = path.join(tempDir, "info.log");
  info.logToFile(infoLogPath);
  const content1 = "data";
  const content2 = "test";
  const content3 = "shouldn't log";

  info.red(content1);
  info.inline.log(content2);

  Deno.lstatSync(infoLogPath);
  assertMatch(new TextDecoder("utf-8").decode(Deno.readFileSync(infoLogPath)), new RegExp(content1));

  info.logToFile(infoLogPath, false);
  info.log(content3);
  assertNotMatch(new TextDecoder("utf-8").decode(Deno.readFileSync(infoLogPath)), new RegExp(content3));
  // TODO: This is kinda bad. Only clean if succeeded. Not critical though since it's using /tmp
  Deno.removeSync(tempDir, { recursive: true });
});

const { Print, print } = require('../dist/printaeu.js');
print.logToFile("/tmp/app.log");

const error = Print.create();
error.logToFile("/tmp/app.err");

try {
  foo();
} catch (e) {
  print.red('error data will be printed');
  print.logToFile("/tmp/app.log", false); // stop logging
  error.track(e); // Like stack error, but beautier
  print.log('Error printed') // won't be to the log file
}

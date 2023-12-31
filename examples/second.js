const { print } = require('../dist/printaeu.js');
// const { print } = require('../src/printaeu');

function foo () {
    print.green(thisVarDoesntExist);
}

try {
    foo();
} catch(e) {
    print.red('omg where does this error come from? help me print');
    print.track(e); // Like stack error, but beautier
}
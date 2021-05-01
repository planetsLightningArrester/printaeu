const fs = require('fs');
const path = require('path');

// Removes comments that are not preceded by https:// and new lines
let min = new RegExp('((?<!https:)//.*?[\\n\\r])|\n|\t|\r', 'g');

// Minifies the main file
let main = fs.readFileSync(path.join(__dirname, '..', 'src', 'printaeu.js'), 'utf-8');
main = main.replace(min, '');
fs.writeFileSync(path.join(__dirname, '..', 'release', 'printaeu.min.js'), main);

// Minifies the package.json
let package = fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8');
package = package.replace(min, '');
fs.writeFileSync(path.join(__dirname, '..', 'release', 'package.json'), package);

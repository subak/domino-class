function define(callback) {
  module.exports = callback();
}
var fs = require('fs'),
  callback = eval(fs.readFileSync("./lib/class.js", 'utf8'));

var Class = module.exports;

function Hoge() {}

Class.extends(Hoge);


debugger

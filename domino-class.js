function define(callback) {
  module.exports = callback();
}
var fs = require('fs'),
  callback = eval(fs.readFileSync(__dirname + "/lib/class.js", 'utf8'));

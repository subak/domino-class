function define(modules, callback) {
  var Class = require("./domino-class");
  module.exports = callback(Class);
}
var fs = require('fs'),
  callback = eval(fs.readFileSync(__dirname + "/lib/error.js", 'utf8'));

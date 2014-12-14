var fs    = require('fs');
var path  = require('path');
var tasks = fs.readdirSync(path.join(__dirname, 'tasks'));
var _     = require('lodash');

var config = {
  root: path.dirname(__dirname)
};
_.extend(config, {
  config: path.join(config.root, 'config'),
  out: path.join(config.root, 'dist')
});

tasks.forEach(function (task) {
  require(path.join(__dirname, './tasks', task))(config);
});

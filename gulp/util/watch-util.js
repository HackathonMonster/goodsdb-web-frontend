var path = require('path');
var _    = require('lodash');
var fs   = require('fs');

module.exports = {
  triggerChanges: function (gaze, file, include) {
    include = include || function (f) {
      return f[0] === '_';
    };

    var basename = path.basename(file);
    if (include(basename)) {
      var files = _.flatten(_.values(gaze.watched()));
      _.each(files, function (f) {
        if (fs.lstatSync(f).isDirectory()) {
          return;
        }
        if (!include(path.basename(f))) {
          gaze.emit('changed', f);
        }
      });
    }
  }
};

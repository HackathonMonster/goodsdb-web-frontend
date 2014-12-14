var gulp        = require('gulp');
var path        = require('path');
var browserSync = require('browser-sync');

module.exports = function (config) {
  gulp.task('browser-sync', function() {
    browserSync({
      port: 9000,
      server: {
        baseDir: config.out
      }
    });
  });
};

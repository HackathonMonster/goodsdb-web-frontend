var gulp        = require('gulp');
var runSequence = require('run-sequence');

require('./gulp');

gulp.task('default', function (callback) {
  runSequence(
    ['copy', 'jade-dev', 'stylus-dev','webpack-dev'],
    ['browser-sync'],
    callback
  );
});

gulp.task('build', ['copy', 'jade', 'stylus', 'webpack']);

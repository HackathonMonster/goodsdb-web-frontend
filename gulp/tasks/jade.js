var path       = require('path');
var gulp       = require('gulp');
var gulpIgnore = require('gulp-ignore');
var reload     = require('browser-sync').reload;
var watch      = require('gulp-watch');
var jade       = require('gulp-jade');
var _          = require('lodash');

var watchUtil  = require('../util/watch-util');

module.exports = function (config) {
  var jadeConfig = {
  };

  var templates = path.join(config.root, 'app', 'views', '**/*.jade');

  gulp.task('jade', function () {
    var conf = _.extend({}, jadeConfig, {
      compileDebug: false
    });
    gulp.src([templates, '!**/_*.jade', '!**/layout.jade'])
      .pipe(jade(conf))
      .pipe(gulp.dest(config.out));
  });

  gulp.task('jade-dev', function () {
    var conf = _.extend({}, jadeConfig, {
      pretty: true,
      compileDebug: true
    });

    var watchStream = watch(templates);
    watchStream._gaze.on('all', function (event, file) {
      watchUtil.triggerChanges(watchStream._gaze, file, function (file) {
        return file[0] === '_' || file.indexOf('layout') === 0;
      });
    });

    gulp.src(templates)
      .pipe(watchStream)
      .pipe(gulpIgnore.exclude(['**/_*.jade', '**/layout.jade']))
      .pipe(jade(conf))
      .pipe(gulp.dest(config.out))
      .pipe(reload({stream: true}));
  });
};

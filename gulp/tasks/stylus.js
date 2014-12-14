var path       = require('path');
var gulp       = require('gulp');
var gulpIgnore = require('gulp-ignore');
var livereload = require('gulp-livereload');
var reload     = require('browser-sync').reload;
var watch      = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var stylus     = require('gulp-stylus');
var _          = require('lodash');
var nib        = require('nib');

var watchUtil  = require('../util/watch-util');

module.exports = function (config) {
  var stylusConfig = {
    use: nib()
  };

  var stylesheets = path.join(config.root, 'app', 'assets', 'stylesheets');
  var main = path.join(stylesheets, 'main.styl');
  var dest = path.join(config.out, 'css');

  gulp.task('stylus', function () {
    var conf = _.extend(stylusConfig, {
      compress: true
    });
    gulp.src(main)
      .pipe(stylus(conf))
      .pipe(gulp.dest(dest));
  });

  gulp.task('stylus-dev', function () {
    var conf = _.extend({}, stylusConfig, {
      sourcemap: {
        inline: true,
        sourceRoot: config.root,
        basePath: 'css'
      }
    });

    var watchStream = watch(path.join(stylesheets, '**/*.styl'));
    watchStream._gaze.on('all', function (event, file) {
      watchUtil.triggerChanges(watchStream._gaze, file);
    });

    gulp.src(main)
      .pipe(watchStream)
      .pipe(gulpIgnore.exclude('**/_*.styl'))
      .pipe(stylus(conf))
      .pipe(gulp.dest(dest))
      .pipe(reload({stream: true}));
  });
};

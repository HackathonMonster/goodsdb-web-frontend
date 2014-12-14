var path     = require('path');
var gulp     = require('gulp');
var webpack  = require('webpack');
var watch    = require('gulp-watch');
var reload   = require('browser-sync').reload;
var gWebpack = require('gulp-webpack');
var _        = require('lodash');

module.exports = function (config) {
  var webpackConfig = require(path.join(config.config, 'webpack.config.js'));

  gulp.task('webpack', function () {
    var conf = _.extend({}, webpackConfig, {
      plugins: webpackConfig.plugins.concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
      )
    });
    gulp.src(conf.entry)
      .pipe(gWebpack(conf))
      .pipe(gulp.dest(conf.output.path));
  });


  gulp.task('webpack:compile-reload', ['webpack:build-dev'], function () {
    reload();
  });

  gulp.task('webpack-dev', ['webpack:build-dev'], function() {
    gulp.watch(path.join(config.root, 'app/assets/scripts/**/*.{js,jade}'), ['webpack:compile-reload']);
  });

  var devConf = _.merge({}, webpackConfig, {
    output: {
      path: path.join(config.root, 'dist/js'),
      filename: 'bundle.js'
    },
    devtool: 'sourcemap',
    debug: true
  });

  gulp.task('webpack:build-dev', function (callback) {
    gulp.src(devConf.entry)
      .pipe(gWebpack(devConf))
      .pipe(gulp.dest(devConf.output.path))
      .on('end', callback);
  });
};

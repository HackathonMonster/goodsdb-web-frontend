var gulp       = require('gulp');
var path       = require('path');

module.exports = function (config) {
  var assets = path.join(config.root, 'app', 'assets');

  gulp.task('copy', ['copy:assets', 'copy:html', 'copy:stylesheets', 'copy:components']);

  gulp.task('copy:stylesheets', function () {
    gulp.src([path.join(assets, 'stylesheets', '**/*.css'), '!**/_*.css'])
      .pipe(gulp.dest(path.join(config.out, 'css')));
  });

  gulp.task('copy:components', function () {
    gulp.src(path.join(config.root, '.components', '**/*'))
      .pipe(gulp.dest(path.join(config.out, 'components')));
  });

  gulp.task('copy:assets', function () {
    gulp.src([
      path.join(assets, '**/*'),
      '!**/{stylesheets,scripts}/**'
    ])
      .pipe(gulp.dest(config.out));
  });

  gulp.task('copy:html', function () {
    gulp.src(path.join(config.root, 'app', 'views', '**/*.html', '!**/_*.html'))
      .pipe(gulp.dest(config.out));
  });
};

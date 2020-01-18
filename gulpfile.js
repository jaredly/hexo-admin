
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');
var rename = require('gulp-rename');

function demo() {
  var b = browserify({
    entries: './docs/demo/run.js',
    debug: true,
    transform: [[reactify, {es6: true, everything: true}]]
  });

  return b.bundle()
    .pipe(source('./docs/demo/run.js'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./docs/demo/admin/'));
};

function javascript() {
  var b = browserify({
    entries: './client/run.js',
    debug: true,
    transform: [[reactify, {es6: true, everything: true}]]
  });

  return b.bundle()
    .pipe(source('./client/run.js'))
    .pipe(buffer())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./www/'));
};

var gulpLess = require('gulp-less');

function less() {
  return gulp.src('./client/less/index.less')
    .pipe(gulpLess({}))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./www'))
};

async function build() { return gulp.parallel(less, javascript); }

function watch () {
  gulp.watch('client/**/*.js', gulp.series(javascript));
  gulp.watch('client/**/*.less', gulp.series(less));
};

gulp.task('demo', demo);
gulp.task('build', build);
gulp.task('watch', watch);
gulp.task('default', gulp.series('build'));


var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
// var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');
var rename = require('gulp-rename');

gulp.task('demo', function () {
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
});

gulp.task('javascript', function () {
  var b = browserify({
    entries: './client/run.js',
    debug: true,
    transform: [[reactify, {es6: true, everything: true}]]
  });

  return b.bundle()
    .pipe(source('./client/run.js'))
    .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
    // .pipe(uglify())
    // .on('error', gutil.log)
    // .pipe(sourcemaps.write('./'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./www/'));
});

var less = require('gulp-less');

gulp.task('less', function () {
  return gulp.src('./client/less/index.less')
    .pipe(less({
      // paths: [path.join(__dirname, 
    }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./www'))
});

gulp.task('build', ['less', 'javascript']);

gulp.task('watch', function () {
  gulp.watch('client/**/*.js', ['javascript']);
  gulp.watch('client/**/*.less', ['less']);
});

gulp.task('default', ['build', 'watch']);

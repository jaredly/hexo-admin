var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify'); 
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('browserify', function() {
  return browserify('./client/run.js')
        .transform(reactify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./www/'));
});

gulp.task('less', function () {
  return gulp.src('./client/less/index.less')
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./www'));
});
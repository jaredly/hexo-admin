var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
var babelify = require("babelify");

gulp.task('default', ['browserify', 'less'], function() {
});

gulp.task('browserify', function() {
  return browserify({entries: './client/run.js', extensions: ['.js'], debug: true})
        .transform(babelify, { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./www'));
});

gulp.task('less', function () {
  return gulp.src('./client/less/index.less')
        .pipe(less({
          paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./www'));
});
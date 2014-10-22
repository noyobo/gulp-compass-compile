'use strict';

var gulp = require('gulp')
var jshint = require('gulp-jshint')
var stylish = require('jshint-stylish')
var del = require('del')
var cssmin = require('gulp-cssmin')
var rename = require('gulp-rename')

var gulpCompass = require('./index')

gulp.task('clean', function(){
  del('./build')
})

gulp.task('lint', function(){
  return gulp
    .src(['./lib/*.js', './cli.js', 'index.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
})

gulp.task('sass', ['clean'] ,function(){
  return gulp
    .src(['src/**/*.scss', '!src/**/_*.scss'])
    .pipe(gulpCompass())
    .pipe(cssmin())
    .pipe(rename({
      suffix: "-min"
    }))
    .pipe(gulp.dest('./build'))
})


gulp.task('watch', function(){
  gulp.watch(['src/**/*.scss', '!src/**/_*.scss'],['sass'])
})

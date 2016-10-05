/**
 * Created by marc.wissler on 08.09.16.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var cached = require('gulp-cached');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');

var merge = require('merge-stream');
var config = require('./../config');

gulp.task('sass', function () {
  var modules = config.moduleDirs;

  var stream = merge();

  modules.forEach(function(module){
    stream.add(
      gulp.src(config.srcDir + module + '/css/*_main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', notify.onError(function (error) {
          return 'Error: ' + error.message;
        }))
        .pipe(cached('scss'))
        .pipe(autoprefixer('last 2 version'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.srcDir + module + '/css'))
    );
  });

  return stream;
});
/**
 * Created by marc.wissler on 08.09.16.
 */

var gulp = require('gulp');
var cached = require('gulp-cached');
var eslint = require('gulp-eslint');

var merge = require('merge-stream');
var config = require('./../config');

// lint javascript
gulp.task('eslint', function() {
  var modules = config.moduleDirs;

  var stream = merge();

  modules.forEach(function(module){
    stream.add(
      gulp.src([
        config.srcDir + module + '/js/*.js'
      ])
        .pipe(cached('eslint'))
        .pipe(eslint({
          quiet: true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
    );
  });

  return stream;
});
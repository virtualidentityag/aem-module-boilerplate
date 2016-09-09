/**
 * Created by marc.wissler on 08.09.16.
 */

var gulp = require('gulp');
var rename = require('gulp-rename');
var fileInclude = require('gulp-file-include');

var merge = require('merge-stream');
var config = require('./../config');

// build html pages from templates/partials
gulp.task('fileinclude', function() {

  var modules = config.moduleDirs;
  var languages = config.languages;

  var stream = merge();

  modules.forEach(function(module){
    languages.forEach(function (language) {
      stream.add(
        gulp.src(config.srcDir + module + config.templateDir + '/' + language + '/*.tpl.html')
          .pipe(rename({
            extname: ''
          }))
          .pipe(rename({
            extname: '.html'
          }))
          .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
          }))
          .pipe(gulp.dest(config.devDir + module + '/' + language + '/'))
      );
    });
  });

  return stream;
});
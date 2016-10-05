/**
 * Created by marc.wissler on 08.09.16.
 */
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');

var merge = require('merge-stream');
var config = require('./../config');


// copy misc folders
function copyRessourcesDist(src, dest){
  var modules = config.moduleDirs;
  var languages = config.languages;

  var stream = merge();

  modules.forEach(function(module){
    languages.forEach(function(language){
      stream.add(
        gulp.src( config.devDir + module + '/' + language + src )
          .pipe( gulp.dest( config.distDir + module + '/' + language + dest) )
      );
    });
  });

  return stream;
}

function copyRessourcesDev(src, dest){
  var modules = config.moduleDirs;
  var languages = config.languages;

  var stream = merge();

  modules.forEach(function(module){
    languages.forEach(function(language){
      stream.add(
        gulp.src( config.srcDir + module + src )
          .pipe( gulp.dest( config.devDir + module + '/' + language + dest) )
      );
    });
  });

  return stream;
}


gulp.task('copy:css:dev', ['sass'], function() {
  return copyRessourcesDev('/css/*_main.css', '/css/');
});

gulp.task('copy:css', ['sass'], function() {
  var modules = config.moduleDirs;
  var languages = config.languages;

  var stream = merge();

  modules.forEach(function(module){
    languages.forEach(function(language){
      stream.add(
        gulp.src( config.devDir + module + '/' + language + '/css/*_main.css' )
          .pipe(minifyCss())
          .pipe( gulp.dest( config.distDir + module + '/' + language + '/css/') )
      );
    });
  });

  return stream;
});

gulp.task('copy:assets:dev', function() {
  return copyRessourcesDev('/assets/**', '/assets/');
});

gulp.task('copy:assets', function() {
  return copyRessourcesDist('/assets/**', '/assets/');
});

gulp.task('copy:js:dev', function() {
  return copyRessourcesDev('/js/**', '/js/');
});

gulp.task('copy:js:uncompressed', function() {
  return copyRessourcesDist('/js/uncompressed/**', '/js/uncompressed/');
});

gulp.task('copy:preview', function() {
  return copyRessourcesDev('/_preview/**', '/_preview/');
});
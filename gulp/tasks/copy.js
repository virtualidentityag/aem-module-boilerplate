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

gulp.task('copy:fonts:dev', function() {
  return copyRessourcesDev('/fonts/**', '/fonts/');
});

gulp.task('copy:fonts', function() {
  return copyRessourcesDist('/fonts/**', '/fonts/');
});

gulp.task('copy:images:dev', function() {
  return copyRessourcesDev('/img/**', '/img/');
});

gulp.task('copy:images', function() {
  return copyRessourcesDist('/img/**', '/img/');
});

gulp.task('copy:js:dev', function() {
  return copyRessourcesDev('/js/*', '/js/');
});

gulp.task('copy:js', function() {
  return copyRessourcesDist('/js/*', '/js/');
});

gulp.task('copy:preview', function() {
  return copyRessourcesDev('/_preview/**', '/_preview/');
});
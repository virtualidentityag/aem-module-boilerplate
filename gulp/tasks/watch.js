/**
 * Created by marc.wissler on 08.09.16.
 */

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var config = require('./../config');

gulp.task('watch', ['build:dev'], function () {

  browserSync.init({
    server   : config.devDir,
    directory: true,
    ghostMode: false
  });

  var modules = config.moduleDirs;

  modules.forEach(function(module){
    gulp.watch([
      config.srcDir + module + '/css/**/*.scss'
    ], {interval: config.watchInterval}, ['watch:sass']);

    gulp.watch([
      config.srcDir + module + config.templateDir + '/**/*.tpl.html'
    ], {interval: config.watchInterval}, ['watch:templates']);


    gulp.watch([
      config.srcDir + module + '/js/**/*.js'
    ], {interval: config.watchInterval}, ['watch:js']);
  });
});

gulp.task('watch:sass', ['copy:css:dev'], function () {
  browserSync.reload();
});

gulp.task('watch:templates', ['fileinclude'], function () {
  browserSync.reload();
});

gulp.task('watch:js', ['copy:js:dev'], function () {
  browserSync.reload();
});
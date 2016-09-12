/**
 * Created by marc.wissler on 08.09.16.
 */

var gulp = require('gulp');
var runSequence = require('run-sequence');

// configure default task
gulp.task('default', ['eslint', 'watch']);


gulp.task('build:dev', ['clean:dev'], function(callback) {

  runSequence(
    'sass',
    'fileinclude',
    [
      'copy:css:dev',
      'copy:fonts:dev',
      'copy:images:dev',
      'copy:js:dev',
      'copy:preview'
    ],
    callback
  );
});

gulp.task('build', ['clean:dist'], function(callback) {

  runSequence(
    [
      'build:dev'
    ],
    [
      'usemin',
      'copy:css',
      'copy:fonts',
      'copy:images'
    ],
    callback
  );
});

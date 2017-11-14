/**
 * Created by marc.wissler on 08.09.16.
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');

// configure default task
gulp.task('default', ['eslint', 'watch']);


gulp.task('build:dev', ['clean:dev'], function(callback) {

  runSequence(
    'sass',
    'hb',
    [
      'copy:css:dev',
      'copy:assets:dev',
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
      'copy:assets',
      'copy:js:uncompressed'
    ],
    callback
  );
});

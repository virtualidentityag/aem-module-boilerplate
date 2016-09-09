/**
 * Created by marc.wissler on 08.09.16.
 */

var gulp = require('gulp');
var del = require('del');

gulp.task('clean:dev', function() {
  return del(['dev/**/*']);
});

gulp.task('clean:dist', function() {
  return del(['dist/**/*']);
});
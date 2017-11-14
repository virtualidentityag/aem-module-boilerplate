const gulp = require('gulp');
const del = require('del');
const config = require('./../config');

gulp.task('clean:dev', function() {
  return del([
      config.devDir + '/**/*'
  ]);
});

gulp.task('clean:dist', function() {
  return del([
      config.distDir + '/**/*'
  ]);
});

gulp.task('clean:resources:dev', function() {
    return del([
        config.devDir + '/*/resources/**'
    ]);
});

gulp.task('clean:resources:dist', function() {
    return del([
        config.distDir + '/*/resources/**'
    ]);
});
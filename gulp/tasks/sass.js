const gulp = require('gulp');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const config = require('./../config');
const sassHelper = require('../lib/sass-helper');

gulp.task('sass:dev', function () {
    sassHelper.sassTask(config.devDir, true);
});

gulp.task('sass:dist', function () {
    sassHelper.sassTask(config.distDir, false);
});

gulp.task('watch:sass', function () {
    watch(config.srcDir + '/components/*/resources/scss/**/*.scss', config.watch, function () {
        runSequence(
            ['sass:dev']
        );
    });
});
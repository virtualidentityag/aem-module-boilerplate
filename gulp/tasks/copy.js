const gulp = require('gulp');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const config = require('./../config');

const copyHelper = require('../lib/copy-helper');

gulp.task('copy:js:dev', function () {
    return copyHelper.copyTask('js', config.devDir);
});

gulp.task('copy:layouts:dev', function () {
    return copyHelper.copyLayoutTask();
});

gulp.task('watch:js', function () {
    watch(config.srcDir + '/components/*/resources/js/**/*.js', config.watch, function () {
        runSequence(
            ['copy:js:dev']
        );
    });
});

gulp.task('watch:layouts', function () {
    watch(config.srcDir + '/layouts/resources/**', config.watch, function () {
        runSequence(
            ['copy:layouts:dev']
        );
    });
});
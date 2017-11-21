const gulp = require('gulp');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const config = require('./../config');
const imageHelper = require('../lib/image-helper');

gulp.task('image:dev', function () {
    return imageHelper.imageTask(config.devDir);
});

gulp.task('image:dist', function () {
    return imageHelper.imageTask(config.distDir);
});

gulp.task('watch:image', function () {
    watch(config.srcDir + '/components/*/resources/img/**', config.watch, function () {
        runSequence(
            ['image:dev']
        );
    });
});

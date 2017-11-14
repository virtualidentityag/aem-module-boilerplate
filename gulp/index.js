
const gulp = require('gulp');
const runSequence = require('run-sequence');

// configure default task
gulp.task('default', ['eslint', 'watch']);


gulp.task('build:dev', ['clean:dev'], function (callback) {

    runSequence(
        [
            'sass',
            'hb'
        ],
        'copy:resources:dev',
        'clean:resources:dev',
        // [
        //   'copy:assets:dev',
        //   'copy:js:dev',
        //   'copy:preview'
        // ],
        callback
    );
});

gulp.task('build', ['clean:dist'], function (callback) {

    runSequence(
        [
            'sass:dist',
            'hb:dist',
        ],
        'copy:resources:dist',
        'clean:resources:dist',
        // [
        //     'usemin',
        //     'copy:css',
        //     'copy:assets',
        //     'copy:js:uncompressed'
        // ],
        callback
    );
});

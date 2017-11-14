
const gulp = require('gulp');
const runSequence = require('run-sequence');

// configure default task
gulp.task('default', ['eslint', 'watch']);


gulp.task('serve', function (callback) {

    runSequence(
        'clean:dev',
        [
            'sass',
            'hb',
            'copy:js'
        ],
        'image:resources:dev',
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

gulp.task('build', function (callback) {

    runSequence(
        'clean:dist',
        [
            'sass:dist',
            'hb:dist',
            'uglify:resources:dist'
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

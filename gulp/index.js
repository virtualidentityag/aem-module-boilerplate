
const gulp = require('gulp');
const runSequence = require('run-sequence');

require('events').EventEmitter.defaultMaxListeners = 0;


// configure default task
gulp.task('default', ['eslint', 'watch']);


gulp.task('build:dev', function (callback) {

    runSequence(
        'clean:dev',
        [
            'sass',
            'hb',
            'copy:js:dev'
        ],
        'image:resources:dev',
        [
            'copy:resources:dev',
            'copy:layouts:dev'
        ],
        'clean:resources:dev',
        // [
        //   'copy:assets:dev',
        //   'copy:js:dev',
        //   'copy:preview'
        // ],
        callback
    );
});

gulp.task('serve', function (callback) {

    runSequence(
        'build:dev',
        'connect',
        'livereload:init',
        'livereload',
        'connect:open',
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
        'image:resources:dist',
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

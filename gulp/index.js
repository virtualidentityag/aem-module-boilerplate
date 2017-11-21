
const gulp = require('gulp');
const runSequence = require('run-sequence');

require('events').EventEmitter.defaultMaxListeners = 0;

gulp.task('build:dev', function (callback) {

    runSequence(
        'clean:dev',
        [
            'sass',
            'hb',
            'copy:js:dev'
        ],
        'image:components:dev',
        [
            'copy:resources:dev',
            'copy:layouts:dev'
        ],
        'clean:resources:dev',
        callback
    );
});

gulp.task('serve', function (callback) {

    runSequence(
        [
            'watch:hb',
            'watch:js',
            'watch:layouts',
            'watch:image'
        ],
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
        'image:components:dist',
        'copy:resources:dist',
        'clean:resources:dist',
        callback
    );
});

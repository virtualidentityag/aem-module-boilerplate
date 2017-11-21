
const gulp = require('gulp');
const runSequence = require('run-sequence');

require('events').EventEmitter.defaultMaxListeners = 0;

gulp.task('build:dev', function (callback) {

    runSequence(
        'clean:dev',
        [
            'sass:dev',
            'hb',
            'copy:js:dev',
            'copy:layouts:dev',
            'image:components:dev'
        ],
        'move:resources:dev',
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
            'watch:image',
            'watch:sass'
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
        'move:resources:dist',
        'clean:resources:dist',
        callback
    );
});

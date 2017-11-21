const gulp = require('gulp');
const globule = require('globule');
const merge = require('merge-stream');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const config = require('./../config');

// copy resources folders
function moveRessources(baseDir) {

    const mergedStream = merge();
    const modulePaths = globule.find(baseDir + '/*');

    modulePaths.forEach((moduleDir) => {
        const stream = gulp.src(moduleDir + '/resources/**');

        globule.find([
            moduleDir + '/*',
            '!' + moduleDir + '/resources'
        ]).forEach((path) => {
            stream.pipe(gulp.dest(path + '/resources/'));
        });

        mergedStream.add(stream)
    });

    return mergedStream;
}

gulp.task('copy:js:dev', function () {
    return gulp.src(config.srcDir + '/components/*/resources/js/**/*.js')
        .pipe(gulp.dest(config.devDir));
});

gulp.task('copy:layouts:dev', function () {
    const mergedStream = merge();
    const modulePaths = globule.find([ config.devDir + '/*' ]);
    const stream = gulp.src(config.srcDir + '/layouts/resources/**');

    modulePaths.forEach((moduleDir) => {
        globule.find([
            moduleDir + '/*',
            '!' + moduleDir + '/resources'
        ]).forEach((path) => {
            stream.pipe(gulp.dest(path + '/layouts/resources/'));
        });

        mergedStream.add(stream)
    });

    return mergedStream;
});


// @TODO Remove old resources folders before copying
gulp.task('move:resources:dev', function () {
    return moveRessources(config.devDir);
});

gulp.task('move:resources:dist', function () {
    return moveRessources(config.distDir);
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
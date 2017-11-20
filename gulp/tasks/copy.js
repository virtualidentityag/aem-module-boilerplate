/**
 * Created by marc.wissler on 08.09.16.
 */
const gulp = require('gulp');
const globule = require('globule');
const merge = require('merge-stream');
const config = require('./../config');

// copy resources folders
function moveRessources(baseDir) {

    const mergedStream = merge();
    const modulePaths = globule.find([
        baseDir + '/*'
    ]);

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

gulp.task('copy:resources:dev', function () {
    return moveRessources(config.devDir);
});

gulp.task('copy:resources:dist', function () {
    return moveRessources(config.distDir);
});

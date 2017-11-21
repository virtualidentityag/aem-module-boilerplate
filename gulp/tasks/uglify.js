const gulp = require('gulp');
const size = require('gulp-size');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const config = require('./../config');

gulp.task('uglify:resources:dist', function () {
    const srcArray = [config.srcDir + '/components/*/resources/js/**/*.js'];

    config.uglify.ignoreList.forEach(function (path) {
        const fullPath = config.srcDir + path;
    	srcArray.push('!' + fullPath);
        gutil.log(gutil.colors.yellow('uglified ignore: ' + fullPath));
    });

    return gulp.src(srcArray)
        .pipe(uglify()).on('error', gutil.log)
        .pipe(size({
            title: 'uglified',
            showFiles: true
        }))
        .pipe(gulp.dest(config.distDir));
});

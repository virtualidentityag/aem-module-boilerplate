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

//
// gulp.task('uglify:components:dist', function () {
//
// 	if (config.global.tasks.uglify) {
//
// 		return mergeStream(config.global.resources.map( function(currentResource, index) {
//
//
// 			var srcArray = [config.global.dev + currentResource + config.global.components[index] + '/**/*.js'];
//
// 			config.uglify.ignoreList.forEach(function (path) {
// 				srcArray.push('!' + config.global.dev + currentComponent + path);
// 			});
//
// 			return gulp.src(srcArray)
// 				.pipe(config.uglify.sourcemaps ? sourcemaps.init() : gutil.noop())
// 				.pipe(uglify()).on('error', gutil.log)
// 				.pipe(size({
// 					title: 'uglified',
// 					showFiles: true
// 				}))
// 				.pipe(config.uglify.sourcemaps ? sourcemaps.write() : gutil.noop())
// 				.pipe(gulp.dest(config.global.dist + currentResource + config.global.components[index]));
// 		}));
//
// 	} else {
// 		gutil.log(gutil.colors.yellow('uglify disabled'));
// 	}
// });

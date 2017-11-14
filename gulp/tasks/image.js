const gulp = require('gulp');
// const gutil = require('gulp-util');
// const mergeStream = require('merge-stream');
const config = require('./../config');
const image = require('gulp-imagemin');
const imageOptimizers = [
	image.gifsicle(),
	image.jpegtran(),
	image.optipng(),
	image.svgo()
];

gulp.task('image:resources:dev', function () {

	// if (config.global.tasks.image) {
	// 	return mergeStream(config.global.resources.map( function(currentResource) {

    return gulp.src(config.srcDir + '/components/*/resources/img/**')
        .pipe(image(
            imageOptimizers,
            config.image
        ))
        .pipe(gulp.dest(config.devDir));

		// }));
    //
	// } else {
	// 	gutil.log(gutil.colors.yellow('image compressor disabled'));
	// }
});
//
// gulp.task('image:component:dist', function () {
//
// 	if (config.global.tasks.image) {
// 		return mergeStream(config.global.resources.map(function (currentResource) {
// 			return mergeStream(config.global.components.map(function (currentComponent) {
// 				return gulp.src(config.global.src + currentComponent + '/*/img/**')
// 					.pipe(image(
// 						imageOptimizers,
// 						config.image
// 					))
// 					.pipe(gulp.dest(config.global.dist + currentResource + currentComponent));
// 			}));
// 		}));
// 	}
// });

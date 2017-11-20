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

function minifyImages(destDir) {
    return gulp.src(config.srcDir + '/components/*/resources/img/**')
        .pipe(image(
            imageOptimizers,
            config.image
        ))
        .pipe(gulp.dest(destDir));
}

gulp.task('image:resources:dev', function () {
    return minifyImages(config.devDir);
});

gulp.task('image:resources:dist', function () {
    return minifyImages(config.distDir);
});



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

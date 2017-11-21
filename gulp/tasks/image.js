const gulp = require('gulp');
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

gulp.task('image:components:dev', function () {
    return minifyImages(config.devDir);
});

gulp.task('image:components:dist', function () {
    return minifyImages(config.distDir);
});

gulp.task('watch:image', function () {
    watch(config.srcDir + '/components/*/resources/img/**', config.watch, function () {
        runSequence(
            ['image:components:dev']
        );
    });
});

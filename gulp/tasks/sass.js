const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const config = require('./../config');

gulp.task('sass', function () {
    return gulp.src('src/components/*/resources/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.devDir));
});


gulp.task('sass:dist', function () {
    return gulp.src('src/components/*/resources/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(config.distDir));
});
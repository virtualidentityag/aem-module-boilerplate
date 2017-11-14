
const gulp = require('gulp');
const sass = require('gulp-sass');
// const cached = require('gulp-cached');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');

// const merge = require('merge-stream');
const config = require('./../config');

gulp.task('sass', function () {
  // const modules = config.moduleDirs;
  //
  // const stream = merge();
  //
  // modules.forEach(function(module){
  //   stream.add(
      return gulp.src('src/components/*/resources/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', notify.onError(function (error) {
            return 'Error: ' + error.message;
        })))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.devDir));

    // );
  // });

  // return stream;
});


gulp.task('sass:dist', function () {
    // var modules = config.moduleDirs;
    // var stream = merge();
    //
    // modules.forEach(function(module){
    //   stream.add(
    return gulp.src('src/components/*/resources/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(config.distDir));

    // );
    // });

    // return stream;
});
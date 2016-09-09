/**
 * Created by marc.wissler on 08.09.16.
 */

var gulp = require('gulp');
var usemin = require('gulp-usemin');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var replace = require('gulp-replace');

var merge = require('merge-stream');
var config = require('./../config');

// concat and minify js+css resources in build
gulp.task('usemin', function() {
  var stream = merge();

  var modules = config.moduleDirs;
  var languages = config.languages;


  return modules.forEach(function(module){
    languages.forEach(function(language){
      stream.add(
        gulp.src(config.devDir + module + '/' + language + '/module.html')
          .pipe(rename('index.html'))
          .pipe(usemin({
            jsVendor: [function() {
              return uglify({
                preserveComments: 'license'
              });
            }],
            jsApp: [ function() {
              return uglify();
            }]
          }))
          .pipe(gulp.dest(config.distDir + module + '/' + language))
          // when building for production
          // add "./application_root/." to every (css/js/images/...) ressource in html. e.g. <script src="./application_root/../application_root/../js/main.js"></script>
          .pipe(filter(['**/index.html'], {restore: true}))
          .pipe(replace('"./', '"./application_root/../'))
          .pipe(replace('[./', '[./application_root/../'))
          .pipe(gulp.dest(config.distDir + module + '/' + language))
      );
    });
  });

  return stream;
});
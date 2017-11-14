/**
 * Created by marc.wissler on 08.09.16.
 */
const gulp = require('gulp');
const globule = require('globule');
const merge = require('merge-stream');
const config = require('./../config');

// copy resources folders
function copyRessourcesDev(baseDir) {

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

//
// // copy misc folders
// function copyRessourcesDist(src, dest){
//   var modules = config.moduleDirs;
//   var languages = config.languages;
//
//   var stream = merge();
//
//   modules.forEach(function(module){
//     languages.forEach(function(language){
//       stream.add(
//         gulp.src( config.devDir + module + '/' + language + src )
//           .pipe( gulp.dest( config.distDir + module + '/' + language + dest) )
//       );
//     });
//   });
//
//   return stream;
// }
//
// function copyRessourcesDev(src, dest){
//   var modules = config.moduleDirs;
//   var languages = config.languages;
//
//   var stream = merge();
//
//   modules.forEach(function(module){
//     languages.forEach(function(language){
//       stream.add(
//         gulp.src( config.srcDir + module + src )
//           .pipe( gulp.dest( config.devDir + module + '/' + language + dest) )
//       );
//     });
//   });
//
//   return stream;
// }
//
//
// gulp.task('copy:css:dev', ['sass'], function() {
//   return copyRessourcesDev('/css/*_main.css', '/css/');
// });

gulp.task('copy:js', function () {
    // var modules = config.moduleDirs;
    // var languages = config.languages;
    //
    // var stream = merge();
    //
    // modules.forEach(function(module){
    //   languages.forEach(function(language){
    //     stream.add(
    return gulp.src(config.srcDir + '/components/*/resources/js/**/*.js')
        .pipe(gulp.dest(config.devDir));
    //     );
    //   });
    // });
    //
    // return stream;
});

gulp.task('copy:resources:dev', function () {
    return copyRessourcesDev(config.devDir);
});

gulp.task('copy:resources:dist', function () {
    return copyRessourcesDev(config.distDir);
});

// gulp.task('copy:assets', function() {
//   return copyRessourcesDist('/assets/**', '/assets/');
// });
//
// gulp.task('copy:js:dev', function() {
//   return copyRessourcesDev('/js/**', '/js/');
// });
//
// gulp.task('copy:js:uncompressed', function() {
//   return copyRessourcesDist('/js/uncompressed/**', '/js/uncompressed/');
// });
//
// gulp.task('copy:preview', function() {
//   return copyRessourcesDev('/_preview/**', '/_preview/');
// });
const config = require('./../config');
const gulp = require('gulp');
const path = require('path');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const notify = require("gulp-notify");
const hb = require('gulp-hb');

module.exports = {
    hbTask: (targetDirectory, isProduction) => {
        const hbStream = hb({ debug: false })
            .partials(path.join(config.cwd, 'src/layouts/*.hbs'))
            .partials(path.join(config.cwd, 'src/components/*/partials/**/*.hbs'));

        if(isProduction) {
            hbStream.data({ isProduction: true });
        }

        const stream = gulp
            .src(config.srcDir + '/components/*/variations/**/index.hbs')
            .pipe(hbStream)
            .on('error', notify.onError(function (error) {
                return {
                    title: 'hb',
                    message: error.message
                };
            }))
            .pipe(rename({extname: ".html"}))
            .pipe(rename((path) => {
                path.dirname = path.dirname.replace('/variations', '');
            }));

        if(isProduction) {
            config.replaceStrings.forEach((replaceObject) => {
                stream.pipe(replace(replaceObject.subStr, replaceObject.newSubStr))
            });
        }

        return stream.pipe(gulp.dest(targetDirectory));
    }
};
const gulp = require('gulp');
const path = require('path');
const merge = require('merge-stream');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const config = require('./../config');
const componentHelper = require('../lib/component-helper');

module.exports = {
    sassTask: (targetDirectory, addSourcemap) => {
        const mergedStream = merge();
        const componentNames = componentHelper.collectAllComponentNamesAsArray();
        const componentVariations = componentHelper.collectAllComponentVariations();

        const streamComponent = (componentName) => {
            const stream = gulp.src([
                `${config.srcDir}/components/${componentName}/resources/scss/**/*.scss`,
                `!${config.srcDir}/components/${componentName}/resources/scss/**/_*.scss`
            ]);

            if(addSourcemap) {
                stream.pipe(sourcemaps.init());
            }

            stream.pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer(config.autoprefixer));

            if(addSourcemap) {
                stream.pipe(sourcemaps.write());
            }

            if(componentVariations.hasOwnProperty(componentName)) {
                componentVariations[componentName].forEach((variation) => {

                    const targetPath = path.join(targetDirectory, componentName, variation, 'resources', 'css');
                    stream.pipe(gulp.dest(targetPath));
                });
            }

            mergedStream.add(stream);
        };

        componentNames.forEach((componentName) => {
            streamComponent(componentName);
        });

        return mergedStream;
    }
};
const gulp = require('gulp');
const path = require('path');
const merge = require('merge-stream');
const image = require('gulp-imagemin');
const imageOptimizers = [
    image.gifsicle(),
    image.jpegtran(),
    image.optipng(),
    image.svgo()
];

const componentHelper = require('../lib/component-helper');
const config = require('./../config');

module.exports = {
    imageTask: (targetDirectory) => {
        const mergedStream = merge();
        const componentNames = componentHelper.collectAllComponentNamesAsArray();
        const componentVariations = componentHelper.collectAllComponentVariations();

        const streamComponent = (componentName) => {
            const stream = gulp.src(`${config.srcDir}/components/${componentName}/resources/img/**`)
                .pipe(image(
                    imageOptimizers,
                    config.image
                ));

            if (componentVariations.hasOwnProperty(componentName)) {
                componentVariations[componentName].forEach((variation) => {

                    const targetPath = path.join(targetDirectory, componentName, variation, 'resources', 'img');
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
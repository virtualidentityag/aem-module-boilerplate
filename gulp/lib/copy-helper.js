const gulp = require('gulp');
const path = require('path');
const merge = require('merge-stream');

const componentHelper = require('../lib/component-helper');
const config = require('./../config');

module.exports = {
    copyTask: (sourceFolder, targetDirectory) => {
        const mergedStream = merge();
        const componentNames = componentHelper.collectAllComponentNamesAsArray();
        const componentVariations = componentHelper.collectAllComponentVariations();

        componentNames.forEach((componentName) => {
            const stream = gulp.src(`${config.srcDir}/components/${componentName}/resources/${sourceFolder}/**`);

            if (componentVariations.hasOwnProperty(componentName)) {
                componentVariations[componentName].forEach((variation) => {

                    const targetPath = path.join(targetDirectory, componentName, variation, 'resources', sourceFolder);
                    stream.pipe(gulp.dest(targetPath));
                });
            }

            mergedStream.add(stream);
        });

        return mergedStream;
    },

    copyLayoutTask: () => {
        const mergedStream = merge();
        const componentNames = componentHelper.collectAllComponentNamesAsArray();
        const componentVariations = componentHelper.collectAllComponentVariations();

        componentNames.forEach((componentName) => {
            const stream = gulp.src(`${config.srcDir}/layouts/resources/**`);

            if (componentVariations.hasOwnProperty(componentName)) {
                componentVariations[componentName].forEach((variation) => {

                    const targetPath = path.join(config.devDir, componentName, variation, 'layouts', 'resources');
                    stream.pipe(gulp.dest(targetPath));
                });
            }

            mergedStream.add(stream);
        });

        return mergedStream;
    }
};
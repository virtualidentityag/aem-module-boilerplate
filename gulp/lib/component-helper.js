const globule = require('globule');
const fs = require('fs');
const path = require('path');
const config = require('./../config');

module.exports = {
    collectAllComponentNamesAsArray: () => {
        const componentNames = [];
        globule.find(config.srcDir + '/components/*').forEach((componentPath) => {
            const parsedComponentPath = path.parse(componentPath);
            componentNames.push(parsedComponentPath.base);
        });

        return componentNames;
    },

    collectAllComponentVariations: () => {
        const componentNames = {};
        globule.find(config.srcDir + '/components/*').forEach((componentPath) => {

            if(!fs.lstatSync(componentPath).isDirectory()) {
                return;
            }

            const componentBase = path.basename(componentPath);
            const variations = [];

            globule.find(componentPath + '/variations/*').forEach((variationPath) => {

                if(!fs.lstatSync(variationPath).isDirectory()) {
                    return;
                }

                const variationBase = path.basename(variationPath);
                variations.push(variationBase);
            });

            componentNames[componentBase] = variations;
        });

        return componentNames;
    }
};
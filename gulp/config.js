/**
 * Created by marc.wissler on 08.09.16.
 */

module.exports = {
    // bowerDir: './bower_components',
    srcDir: './src',
    devDir: './dev',
    distDir: './dist',

    autoprefixer: ['last 3 versions', 'ie 9'],

    replaceStrings: [
        {
            subStr: '"./',
            newSubStr: '"./application_root/../'
        },
        {
            subStr: '[./',
            newSubStr: '[./application_root/../'
        }
    ]

    // templateDir: '/_templates',
    // moduleDirs: [
    //     '/example-aem-module'
    // ],
    // languages: [
    //     'en',
    //     'de'
    // ],
    // watchInterval: 500
};

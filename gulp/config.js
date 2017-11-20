const src = './src';
const dev = './dev';
const dist = './dist';
const cwd = process.cwd();
const os = require('os');
const isWin = /^win/.test(os.platform());

module.exports = {

    srcDir: src,
    devDir: dev,
    distDir: dist,
    cwd: cwd,

    autoprefixer: ['last 3 versions', 'ie 9'],

    connect: {
        port: 9001,
        globs: [
            dev + '/**'
        ]
    },

    image: {
        verbose: true
    },

    livereload: {
        port: 35730
    },

    replaceStrings: [
        {
            subStr: '"./',
            newSubStr: '"./application_root/../'
        },
        {
            subStr: '[./',
            newSubStr: '[./application_root/../'
        }
    ],

    uglify: {
        ignoreList: [ '/module-name/resources/js/file-to-ignore.js' ]
    },

    watch: {
        usePolling: isWin
    }
};

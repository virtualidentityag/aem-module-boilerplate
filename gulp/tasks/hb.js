const config = require('./../config');
const gulp = require('gulp');
// const fs = require('fs');
// const globule = require('globule');
const path = require('path');
// const replace = require('gulp-replace');
const rename = require('gulp-rename');
// const watch = require('gulp-watch');
// const runSequence = require('run-sequence');
const notify = require("gulp-notify");
// const handlebars = require('handlebars');
const hb = require('gulp-hb');
const cwd = process.cwd();
// const packageData = require(cwd + '/package.json');

// const hbsParser = require('./../lib/hbs-parser');
// const iconParser = require('./../lib/icon-parser');
// const jsonParser = require('./../lib/json-parser');



// .src('src/components/*/variations/**/index.hbs')
//
//     .partials('src/layouts/*.hbs')
//     .partials('src/components/*/partials/**/*.hbs')

gulp.task('hb', function () {

	//icon data
	// let iconNames = iconParser.getAllIconFileNamesLowerCase(config.global.src + '/_icons/*.svg');
	// let preData = {};
    //
	// preData[config.global.dataObject] = {
	// 	'icons': iconNames,
	// 	'package': packageData
	// };
    //
	// let hbsData = jsonParser.getAllJSONData(config.global.src + '/**/*.json', preData[config.global.dataObject]);

	// let hbStream = hbsParser.createHbsGulpStream(
	// 	[
	// 		config.global.src + '/**/*.hbs',
	// 		'!' + config.global.src + '/pages/**'
	// 	],
	// 	hbsData
	// );

    let hbStream = hb({ debug: true })
        .partials(path.join(cwd, 'src/layouts/*.hbs'))
        .partials(path.join(cwd, 'src/components/*/partials/**/*.hbs'));

    // .helpers(hbsHelpers);

    // if(dataObject) {
    //     hbStream.data(dataObject);
    // }
    //
    // if(dataGlob) {
    //     hbStream.data(dataGlob);
    // }

	/**
	 * reads from pages
	 * puts files to .tmp
	 */
	return gulp
		.src('src/components/*/variations/**/index.hbs')
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
            console.log(path);
        }))
		.pipe(gulp.dest(config.devDir));

});


// gulp.task('watch:static:hb', function () {
// 	let files = [config.global.src + '/partials/**/*.hbs'];
//
// 	config.global.components.forEach(function(currentComponent) {
// 		files.push(config.global.src + currentComponent +'/**/*.hbs');
// 	});
//
// 	watch(files, config.watch, function () {
// 		runSequence(
// 			['static:hb']
// 		);
// 	});
//
// });
//
//
// /**
//  * indexr creates the preview file index
//  */
// gulp.task('static:hb:indexr', function () {
//
// 	let dataObject = {
// 		package: packageData,
// 		templates: []
// 	};
//
// 	// read all files
// 	let filepaths = globule.find([
// 		config.global.src + '/pages/*.hbs'
// 	]);
//
// 	let lastCategory = '';
// 	for (let index in filepaths) {
// 		let content = fs.readFileSync(filepaths[index], 'utf8');
// 		let template = {};
//
// 		template.file = path.parse(filepaths[index]);
//
// 		// check current category
// 		let category = template.file.name.substring(2, template.file.name.indexOf('.'));
// 		if (lastCategory !== category) {
// 			lastCategory = category;
// 			template.category = category;
// 			template.priority = template.file.name.substring(0, 2);
// 		}
//
// 		//parse content data
// 		let data = hbsParser.parsePartialData(content, { template: template });
//
// 		dataObject.templates.push(data);
// 	}
//
// 	let hbStream = hbsParser.createHbsGulpStream(null, dataObject);
//
// 	gulp.src(config.global.src + '/index.html')
// 		.pipe(hbStream)
// 		.pipe(gulp.dest(config.global.dev));
//
// });
//
// gulp.task('watch:static:hb:indexr', function () {
//
// 	watch(config.global.src + '/pages/*.hbs', config.watch, function () {
// 		runSequence(
// 			['static:hb:indexr']
// 		);
// 	});
//
// });

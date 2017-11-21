const config = require('./../config');
const gulp = require('gulp');
const hb = require('gulp-hb');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const hbHelper = require('../lib/handlebars-helper');

gulp.task('hb', function () {
    return hbHelper.hbTask(config.devDir, false);
});

gulp.task('hb:dist', function () {
    return hbHelper.hbTask(config.distDir, true);
});

gulp.task('watch:hb', function () {
    watch([ config.srcDir + '/**/*.hbs' ], config.watch, function () {
        runSequence(
            ['hb']
        );
    });
});


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

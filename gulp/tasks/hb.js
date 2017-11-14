const config = require('./../config');
const gulp = require('gulp');
const path = require('path');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const notify = require("gulp-notify");
const hb = require('gulp-hb');
const cwd = process.cwd();

gulp.task('hb', function () {
    const hbStream = hb({ debug: false })
        .partials(path.join(cwd, 'src/layouts/*.hbs'))
        .partials(path.join(cwd, 'src/components/*/partials/**/*.hbs'));

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
        }))
		.pipe(gulp.dest(config.devDir));
});

gulp.task('hb:dist', function () {
    const hbStream = hb({ debug: false })
        .partials(path.join(cwd, 'src/layouts/*.hbs'))
        .partials(path.join(cwd, 'src/components/*/partials/**/*.hbs'))
        .data({ isProduction: true });

    let stream = gulp
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
        }));

    config.replaceStrings.forEach((replaceObject) => {
       stream.pipe(replace(replaceObject.subStr, replaceObject.newSubStr))
    });

    return stream.pipe(gulp.dest(config.distDir));
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

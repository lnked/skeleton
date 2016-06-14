'use strict';

const $		= require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp	= require('gulp');
const error	= require('../utils/error');

module.exports = function(config) {
	config = config || {};

	return function(callback) {
		
		let spriteData = gulp.src(config.src).pipe($.spritesmith({
			imgName: config.sprite.image,
			cssName: config.sprite.style
		}));

		// svg2png: require('gulp-svg2png'),

		// config.imgPath = imgPath + config.imgName;
		// config.retinaImgPath = imgPath + config.retinaImgName;
		// config.cssName = config.cssName.replace(/\.css$/, '.styl');
		// config.cssFormat = 'stylus';
		// config.cssTemplate = cssTemplate;
		// config.algorithm = 'binary-tree';
		// config.padding = 8;

	    spriteData.img.pipe(gulp.dest(config.app));
	    spriteData.css.pipe(gulp.dest(config.styles));

		// .pipe($.svgSprite({
		// 	mode: {
		// 		css: {
		// 			dest:		'.',
		// 			bust:		!global.is.build,
		// 			sprite:		'sprite.svg',
		// 			layout:		'vertical',
		// 			prefix:		'$',
		// 			dimensions: true,
		// 			render:     {
		// 				styl: {
		// 					dest: 'sprite.scss'
		// 				}
		// 			}
		// 		}
		// 	}
		// }))

		// .pipe($.if('*.scss', gulp.dest('tmp/styles'), gulp.dest(config.css)))

		// .pipe($.debug({'title': config.task}))

		// .pipe(gulp.dest(config.app))

		// .pipe($.notify({ message: config.task + ' complete', onLast: true }));

		callback();
	};
	
};

// gulp.task('svgSprite', function () {
// 	return gulp.src(paths.sprite.src)
// 		.pipe($.svgSprite({
// 			shape: {
// 				spacing: {
// 					padding: 5
// 				}
// 			},
// 			mode: {
// 				css: {
// 					dest: "./",
// 					layout: "diagonal",
// 					sprite: paths.sprite.svg,
// 					bust: false,
// 					render: {
// 						scss: {
// 							dest: "css/src/_sprite.scss",
// 							template: "build/tpl/sprite-template.scss"
// 						}
// 					}
// 				}
// 			},
// 			variables: {
// 				mapname: "icons"
// 			}
// 		}))
// 		.pipe(gulp.dest(basePaths.dest));
// });

// gulp.task('pngSprite', ['svgSprite'], function() {
// 	return gulp.src(basePaths.dest + paths.sprite.svg)
// 		.pipe($.svg2png())
// 		.pipe($.size({
// 			showFiles: true
// 		}))
// 		.pipe(gulp.dest(paths.images.dest));
// });

// gulp.task('sprite', ['pngSprite']);


// import gulp from 'gulp';
// import plumber from 'gulp-plumber';
// import spritesmith from 'gulp.spritesmith-multi';
// import checkIconsInDir from 'spritesmith-dir-checker';
// import merge from 'merge-stream';
// import path from 'path';
// import error from 'gulp-plumber-error-handler';

// const cwd = path.join(__dirname, '..');
// const spritesDirPath = 'app/sprites';
// const imgPath = '../images/sprites/';
// const tmplName = 'stylus_retina.template.handlebars';
// const tmplPath = '../node_modules/spritesmith-stylus-retina-template';
// const cssTemplate = path.join(__dirname, tmplPath, tmplName);

// gulp.task('sprites', () => {
// 	const canDoNext = checkIconsInDir(cwd, spritesDirPath);

// 	if (!canDoNext) {
// 		return;
// 	}

// 	const spriteData = gulp.src(['app/sprites/**/*.png', '!app/sprites/*.png'])
// 		.pipe(plumber({errorHandler: error(`Error in 'sprites' task`)}))
// 		.pipe(spritesmith({
// 			spritesmith(config) {
// 				config.imgPath = imgPath + config.imgName;
// 				config.retinaImgPath = imgPath + config.retinaImgName;
// 				config.cssName = config.cssName.replace(/\.css$/, '.styl');
// 				config.cssFormat = 'stylus';
// 				config.cssTemplate = cssTemplate;
// 				config.algorithm = 'binary-tree';
// 				config.padding = 8;

// 				return config;
// 			}
// 		}));

// 	const imgStream = spriteData.img.pipe(gulp.dest('dist/assets/images/sprites'));
// 	const styleStream = spriteData.css.pipe(gulp.dest('app/styles/sprites'));

// 	return merge(imgStream, styleStream);
// });

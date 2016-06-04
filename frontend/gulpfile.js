'use strict';

const gulp			= require('gulp');
const gutil			= require('gulp-util');
const standards		= require('gulp-webstandards');
const watch			= require('gulp-watch');
const gulpif		= require('gulp-if');

const tasks			= './gulp/tasks/';
const config		= require('./gulp/config.js');

const app 			= config.app;
const asp			= config.asp;
const src			= config.src;
const path			= config.path;

let is = {
	webp: false,
	babel: false,
	build: false,
	email: false,
	watch: false,
	uncss: false,
	prefix: false,
	server: false,
	webpack: false,
	typescript: false,
	coffee: false
};

if (typeof gutil.env !== 'undefined')
{
	let o, _env;

	for (let o in gutil.env)
	{
		_env = o;

		if (o == 'b') _env = 'build';
		if (o == 's') _env = 'server';

		if (typeof(is[_env]) !== 'undefined')
		{
			is[_env] = true;
		}
	}
}

function lazyRequireTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;

	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);
		return task(callback);
	});
}

lazyRequireTask('template', tasks + 'template', {
	src: path.assets.template,
	app: path.build.template,
	is:  is
});

lazyRequireTask('scripts', tasks + 'scripts', {
	src: src + 'scripts',
	dir: src + 'scripts',
	app: path.build.scripts,
	rm:  false,
	is:  is
});

lazyRequireTask('critical', tasks + 'critical', {
	src: path.build.template + '*.html',
	app: path.build.styles,
	critical: path.critical,
	is:  is
});

lazyRequireTask('sprite_build', tasks + 'sprite', {
	src: path.assets.sprite,
	app: path.build.images,
	styles: path.build.sprite,
	sprite: path.sprite,
	is:  is
});

lazyRequireTask('styles_build', tasks + 'styles', {
	src: path.assets.styles,
	app: path.build.styles,
	is:  is,
	prefix: 'celebro-'
});

lazyRequireTask('images', tasks + 'images', {
	src: path.assets.images,
	app: path.build.images,
	css: path.build.styles,
	is:  is
});

lazyRequireTask('svgstore', tasks + 'svgstore', {
	src: path.assets.svgstore,
	app: path.svgstore,
	is:  is
});

lazyRequireTask('tinypng', tasks + 'tinypng', {
	token: path.tinypng,
	src: path.assets.images + '.png',
	app: path.build.images,
	is:  is
});

lazyRequireTask('deploy', tasks + 'deploy', {
	app: app + '**/*'
});

lazyRequireTask('ftp', tasks + 'ftp', {
	app: app + '**/*',
	cfg: path.ftp,
	folder: path.ftp.uploadPath
});

lazyRequireTask('test', tasks + 'test', {
	test: path.testfile,
	app: app + '**/*'
});

lazyRequireTask('screenshot', tasks + 'screenshot', {
	url: config.server.proxy,
	app: app + 'tmp',
	size: path.screenshot
});

lazyRequireTask('webpack', tasks + 'webpack', {
	app: app,
	file: path.build.scripts + 'main.min.js',
	path: path.build.scripts
});

// ================ Copy ================ //

lazyRequireTask('extras', tasks + 'copy', {
	src: path.extras,
	app: app
});

lazyRequireTask('json', tasks + 'copy', {
	src: path.assets.json,
	app: path.build.json,
	is:  is
});

lazyRequireTask('favicon', tasks + 'copy', {
	src: path.assets.favicon,
	app: path.build.favicon,
	is:  is
});

lazyRequireTask('fonts', tasks + 'copy', {
	src: path.assets.fonts,
	app: path.build.fonts,
	is:  is
});


lazyRequireTask('lint', tasks + 'lint', {
	src: path.assets.styles,
	app: path.build.styles,
	is:  is
});

// ================ webserver ============== //

lazyRequireTask('webserver', tasks + 'webserver', {
	app: app,
	port: config.server.port,
	proxy: config.server.proxy,
	server: config.server.server
});

// ================ No Lazy ================ //

gulp.task('modernizr', function(callback){
	gulp.src(path.modernizr).pipe(gulp.dest(path.build.scripts));
	callback();
});

gulp.task('webstandards', function(){
	return gulp.src(app + '**/*').pipe(standards());
	callback();
});

gulp.task('isbuild', function(callback){
	is.build = true;
	callback();
});

gulp.task('watch', function(){
	is.watch = true;

	var x;
	for (x in path.watch)
	{
		(function(key){
			watch(path.watch[key], gulp.series(key));
		})(x);
	}
});

gulp.task('sprite', gulp.parallel('sprite_build', 'styles_build'));
gulp.task('styles', gulp.parallel('sprite_build', 'styles_build'));

gulp.task('build',
	gulp.series('isbuild',
		gulp.parallel('template', 'svgstore', 'sprite_build', 'styles_build', 'critical', 'scripts', 'images', 'favicon', 'fonts', 'json', 'extras')
	)
);

// gulp.task('default', gulp.series('watch'));

gulp.task('default',
	gulpif(
		is.build,
		
		gulpif(
			is.server,

			gulp.series(
				'build',
				
				gulp.parallel( 'watch', 'webserver' )
			),

			gulp.series( 'build', 'watch' )
		),

		gulpif(
			is.server,

			gulp.parallel( 'watch', 'webserver' ),

			gulp.series( 'watch' )
		)
	)
);
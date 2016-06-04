'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var _ = require('lodash');
var template = _.template;

function compile(options, data, render) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.PluginError('gulp-template', 'Streaming not supported'));
            return;
        }

        try {
            var tpl = template(file.contents.toString(), options);
            file.contents = new Buffer(render ? tpl(_.merge({}, file.data, data)) : tpl.toString());
            this.push(file);
        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-template', err, {fileName: file.path}));
        }

        cb();
    });
}

module.exports = function (data, options) {
    return compile(options, data, true);
};

module.exports.precompile = function (options) {
    return compile(options);
};



'use strict';

console.log('gulpfile');


const gulp = require('gulp');
const template = require('gulp-template');

gulp.task('default', () =>
    gulp.src('src/greeting.html')
        .pipe(template({name: 'Sindre'}))
        .pipe(gulp.dest('dist'))
);


const gulp = require('gulp');
const template = require('gulp-template');
const data = require('gulp-data');

gulp.task('default', () =>
    gulp.src('src/greeting.html')
        .pipe(data(() => ({name: 'Sindre'})))
        .pipe(template())
        .pipe(gulp.dest('dist'))
);






var util = require('util');
// var Orchestrator = require('orchestrator');
// var gutil = require('gulp-util');
// var deprecated = require('deprecated');
var vfs = require('vinyl-fs');

function Gulp() {
  Orchestrator.call(this);
}
util.inherits(Gulp, Orchestrator);

Gulp.prototype.task = Gulp.prototype.add;
Gulp.prototype.run = function() {
  // `run()` is deprecated as of 3.5 and will be removed in 4.0
  // Use task dependencies instead

  // Impose our opinion of "default" tasks onto orchestrator
  var tasks = arguments.length ? arguments : ['default'];

  this.start.apply(this, tasks);
};

Gulp.prototype.src = vfs.src;
Gulp.prototype.dest = vfs.dest;
Gulp.prototype.watch = function(glob, opt, fn) {
  if (typeof opt === 'function' || Array.isArray(opt)) {
    fn = opt;
    opt = null;
  }

  // Array of tasks given
  if (Array.isArray(fn)) {
    return vfs.watch(glob, opt, function() {
      this.start.apply(this, fn);
    }.bind(this));
  }

  return vfs.watch(glob, opt, fn);
};

// Let people use this class from our instance
Gulp.prototype.Gulp = Gulp;

// Deprecations
deprecated.field('gulp.env has been deprecated. ' +
  'Use your own CLI parser instead. ' +
  'We recommend using yargs or minimist.',
  console.warn,
  Gulp.prototype,
  'env',
  gutil.env
);

Gulp.prototype.run = deprecated.method('gulp.run() has been deprecated. ' +
  'Use task dependencies or gulp.watch task triggering instead.',
  console.warn,
  Gulp.prototype.run
);

var inst = new Gulp();
module.exports = inst;
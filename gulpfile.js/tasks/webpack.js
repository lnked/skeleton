'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');
const path  = require('path');
const clean = require('../utils/clean')
const error = require('../utils/error');
const getFiles      = require('../utils/files');
const getFolders    = require('../utils/folders');
const bowerFiles    = require('main-bower-files');
const brotli        = require('gulp-brotli');

const webpackStream = require('webpack-stream');
const webpackConfig = require('../webpack.config');

module.exports = function(config, bower) {
    config = config || {};

    const uglifyConfig = {
        ie8: false,
        mangle: true,
        toplevel: false,
        warnings: false,
        sourceMap: false,
        compress: {
            warnings: false,
            dead_code: true,
            drop_console: true,
            global_defs: {
                DEBUG: false
            }
        },
        output: {
            ast: true,
            code: true
        }
    };

    return function(callback) {

        let folders = getFolders(config.path);

        const rootPath = path.resolve(__dirname, '../..');

        const files = [];
        const entry = {};

        folders.map((folder) => {
            const inner = getFiles(path.resolve(rootPath, config.path, folder));

            inner.map((file) => {
                if (typeof(entry[folder]) === 'undefined')
                {
                    entry[folder] = [];
                }

                entry[folder].push(file.replace(path.resolve(rootPath, config.path), '.'));
            })

            files.push(
                path.join(config.path, folder, '/*.*'),
                path.join(config.path, folder, '/**/*.*')
            )
        });

        gulp.src(files)
            .pipe($.plumber({errorHandler: error}))
            .pipe($.debug({title: config.task}))

            .pipe(
                webpackStream(
                    webpackConfig.createConfig(
                        entry,
                        path.resolve(rootPath, config.app),
                        path.resolve(rootPath, config.path),
                        global.is.build
                    )
                )
            )
            .pipe($.rename({suffix: '.min'}))
            .pipe(gulp.dest(config.app))

            .pipe($.if(global.is.build, $.gzip()))
            .pipe($.if(global.is.build, brotli.compress({
                extension: 'brotli',
                skipLarger: true,
                mode: 0,
                quality: 11,
                lgblock: 0
            })))
            .pipe($.if(global.is.build, gulp.dest(config.app)))
            .pipe(gulp.dest(config.app))

            .pipe($.if(global.is.build, $.size({title: `[name].js.gz`})))
            .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

        callback();

    };

};

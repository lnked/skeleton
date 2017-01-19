'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');
const path  = require('path');
const clean = require('../utils/clean')
const error = require('../utils/error');
const named = require('vinyl-named');
const webpackStream  = require('webpack-stream');
const webpack = webpackStream.webpack;
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = function(config) {
    config = config || {};

    return function(callback) {

        let plugins = [];

        if (global.is.build) {
            plugins.push(
                new webpack.NoErrorsPlugin(),
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    },
                    mangle: false
                }),
                new webpack.optimize.OccurenceOrderPlugin()
            );
        } else {
            plugins.push(
                new DashboardPlugin()
            );
        }

        console.log(config);

        gulp.src(config.src)
            .pipe($.plumber({errorHandler: error}))
            .pipe($.debug({title: config.task}))
            .pipe(named())
            .pipe(webpackStream({
                watch: !global.is.build,
                devtool: !global.is.build ? 'eval-source-map' : null,
                module: {
                    // preLoaders: [
                    //     {
                    //         test: /\.(js|ts|jsx)$/,
                    //         loader: "eslint",
                    //         exclude: /node_modules/
                    //     }
                    // ],
                    loaders: [
                        {
                            test: /\.(js|ts|jsx)$/,
                            include: path.resolve(config.path),
                            loader: 'babel?presets[]=es2015',
                            exclude: /node_modules/
                        }
                    ]   
                },
                plugins: plugins
            }))
            .pipe(gulp.dest(config.app))
            .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

        callback();

    };

};
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

// const webpack = require('webpack');
// const path = require('path');
// const util = require('gulp-util');
// const config = require('./gulp/config');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// function createConfig(env) {
//   let isProduction,
//     webpackConfig;

//   if (env === undefined) {
//     env = process.env.NODE_ENV;
//   }

//   isProduction = env === 'production';

//   webpackConfig = {
//     context: path.join(__dirname, config.src.js),
//     entry: {
//       // vendor: ['jquery'],
//       app: './app.js',
//     },
//     output: {
//       path: path.join(__dirname, config.dest.js),
//       filename: '[name].js',
//       publicPath: 'js/',
//     },
//     devtool: isProduction ?
//       '#source-map' :
//       '#cheap-module-eval-source-map',
//     plugins: [
//       // new webpack.optimize.CommonsChunkPlugin({
//       //     name: 'vendor',
//       //     filename: '[name].js',
//       //     minChunks: Infinity
//       // }),
//       // new webpack.LoaderOptionsPlugin({
//       //   options: {
//       //     eslint: {
//       //       formatter: require('eslint-formatter-pretty')
//       //     }
//       //   }
//       // }),
//       new webpack.ProvidePlugin({
//         $: 'jquery',
//         jQuery: 'jquery',
//         'window.jQuery': 'jquery',
//       }),
//       new webpack.NoEmitOnErrorsPlugin(),

//       new BundleAnalyzerPlugin({
//         analyzerMode: 'static',
//         analyzerPort: 4000,
//         openAnalyzer: false,
//       }),
//     ],
//     resolve: {
//       extensions: ['.js'],
//       alias: {
//         TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
//         TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
//         TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
//         TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
//         ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
//         'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
//         'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
//       },
//     },
//     module: {
//       rules: [
//          {
//           test: /\.js$/,
//           loader: 'babel-loader',
//           exclude: [
//             path.resolve(__dirname, 'node_modules'),
//           ],
//         }],
//     },
//   };

//   if (isProduction) {
//     webpackConfig.plugins.push(
//       new webpack.LoaderOptionsPlugin({
//         minimize: true,
//       }),
//       new webpack.optimize.UglifyJsPlugin({
//         compress: {
//           warnings: false,
//         },
//       })
//     );
//   }

//   return webpackConfig;
// }

// module.exports = createConfig();
// module.exports.createConfig = createConfig;
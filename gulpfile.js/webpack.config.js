const webpack = require('webpack');
const path = require('path');
const util = require('gulp-util');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

function createConfig(name, entry, outputPath, dirname, isProduction)
{
    let env = 'development';
    let plugins = [];
    let webpackConfig;

    if (isProduction) {
        env = 'production';
    }

    plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js',
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': "jquery"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new webpack.NoEmitOnErrorsPlugin()
    );

    if (!isProduction)
    {
        plugins.push(
            new PrettierPlugin({
                printWidth: 80,
                tabWidth: 4
            }),
        )
    }

    if (isProduction)
    {
        plugins.push(
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    ecma: 8,
                    ie8: false,
                    mangle: true,
                    parse: {
                        html5_comments: false
                    },
                    compress: {
                        cascade: true,
                        booleans: true,
                        drop_console: true,
                        drop_debugger: true,
                        global_defs: {
                            DEBUG: false
                        }
                    },
                    output: {
                        comments: false,
                        beautify: false,
                        indent_level: 0
                    },
                    warnings: false
                },
                exclude: [/\.min\.js$/gi]
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                analyzerPort: 4000,
                openAnalyzer: false,
                reportFilename: [name, '.html'].join('')
            }),
            // new BrotliPlugin({
            //     asset: '[path].br[query]',
            //     test: /\.(js)$/,
            //     threshold: 10240,
            //     minRatio: 0.8
            // }),
            // new CompressionPlugin({
            //     asset: '[path].gz[query]',
            //     algorithm: 'gzip',
            //     test: /\.(js)$/,
            //     threshold: 10240,
            //     minRatio: 0.8
            // })
        );
    }

    webpackConfig = {

        context: dirname,

        devtool: isProduction ? '#source-map' : '#cheap-module-eval-source-map',

        entry: {
            'common': ['jquery'],
            [name]: entry
        },

        output: {
            path: outputPath,
            pathinfo: false,
            publicPath: '',
            filename: '[name].js',
            jsonpFunction: 'WJ',
            hotUpdateFunction: 'UF'
        },

        module: {
            rules: [
                // {
                //     enforce: 'pre',
                //     test: /\.jsx?$/,
                //     options: {
                //         fix: isProduction
                //     },
                //     loader: 'eslint-loader',
                //     exclude: /(node_modules|bower_components)/,
                // },
                {
                    test: /\.js[x]?$/,
                    exclude: /(node_modules|bower_components)/,
                    include: dirname,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: !isProduction
                            }
                        }
                    ]
                }
            ]
        },

        resolve: {
            extensions: ['.js'],
            alias: {
                "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
                "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
                "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
                "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
                "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
                "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
                "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
            }
        },

        watch: !isProduction,

        plugins: plugins
    };

    if (!isProduction)
    {
        webpackConfig.devServer = {
            compress: false,
            contentBase: outputPath,
            watchContentBase: true,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 100,
                poll: 300
            },
            overlay: {
                warnings: true,
                errors: true
            }
        };
    }

    return webpackConfig;
}

module.exports.default = null;
module.exports.createConfig = createConfig;

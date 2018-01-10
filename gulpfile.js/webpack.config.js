const webpack = require('webpack');
const path = require('path');
const util = require('gulp-util');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const statsConfig = {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    optimizationBailout: true,
    colors: {
        green: '\u001b[32m',
    }
};

function createConfig(entryPoint, outputPath, contextDirname, isProduction)
{
    let env = 'development';
    let plugins = [];
    let webpackConfig;

    if (isProduction) {
        env = 'production';
    }

    plugins.push(
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.js',
            minChunks(m) {
                return m.context && m.context.indexOf('node_modules') >= 0;
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'runtime',
        //     chunks: ['vendors'],
        //     minChunks: Infinity
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new webpack.NoEmitOnErrorsPlugin()
    );

    if (isProduction)
    {
        plugins.push(
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                options: {
                    eslint: {
                       formatter: require('eslint-formatter-pretty')
                    }
                }
            }),
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: !isProduction,
                uglifyOptions: {
                    ecma: 8,
                    ie8: false,
                    mangle: isProduction,
                    minimize: isProduction,
                    parse: {
                        html5_comments: false
                    },
                    compress: {
                        booleans: true,
                        drop_console: isProduction,
                        drop_debugger: true,
                        global_defs: {
                            DEBUG: !isProduction
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
            // new BundleAnalyzerPlugin({
            //     analyzerMode: 'static',
            //     analyzerPort: 4000,
            //     openAnalyzer: false,
            //     reportFilename: ['bundle', '.html'].join('')
            // })
        );
    }

    webpackConfig = {

        context: contextDirname,

        target: 'web',

        devtool: isProduction ? '#source-map' : '#cheap-module-eval-source-map',

        entry: entryPoint,

        output: {
            path: outputPath,
            pathinfo: false,
            publicPath: '',
            libraryTarget: 'umd',
            filename: '[name].js',
            jsonpFunction: 'WJ',
            hotUpdateFunction: 'UF'
        },

        externals: {
            "jQuery": "jQuery",
            "react": "React",
            "react-dom": "ReactDOM"
        },

        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js[x]?$/,
                    use: [
                        {
                            loader: 'eslint-loader',
                            options: {
                                fix: true,
                                cache: true
                                // ignorePattern: __dirname + '/src/js/lib/'
                            }
                        }
                    ],
                    include: contextDirname,
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.js[x]?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: !isProduction
                            }
                        }
                    ],
                    include: contextDirname,
                    exclude: /(node_modules|bower_components)/
                }
            ],
            noParse: [
                /[\/\\]react[\/\\]react\.js[\/\\]jquery[\/\\]zepto\.js$/
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

        plugins: plugins,

        stats: statsConfig
    };

    if (!isProduction)
    {
        webpackConfig.devServer = {
            stats: statsConfig,
            compress: false,
            contentBase: outputPath,
            watchContentBase: true,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 100,
                poll: false
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

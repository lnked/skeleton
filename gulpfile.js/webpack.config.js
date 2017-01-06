var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var args = require('yargs').argv;
var DashboardPlugin = require('webpack-dashboard/plugin');

// parameters
var isProd = args.prod;
var isMock = args.mock;

var base = './';
// use mock api or not
var entryJs = isMock ?
    base + 'source/test/e2e/mocks/index.js' :
    base + 'source/app/index.js';
var appName = isMock ? 'appTest' : 'app';
var appRevision = isProd ? process.env.CI_BUILD_REF_NAME: '';

var plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Rekapi: "rekapi/dist/rekapi",
        AnimationFrame: "animation-frame",
        Parse: "parse",
    }),
    new webpack.DefinePlugin({
        __PROD__: isProd,
        __MOCK__: isMock
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', isProd ? 'vendor.[hash].js' : 'vendor.js'),
    new ExtractTextPlugin(isProd ? '[name].[hash].css' : '[name].css'),
    new HtmlWebpackPlugin({
        template: 'jade!./source/app/index.jade',
        chunks: ['app', 'vendor'],
        favicon: 'source/app/assets/images/favicon_16.png',
        appName: appName
    }),
    new CopyWebpackPlugin([
        { from: 'node_modules/babel-core/browser-polyfill.min.js', to: 'polyfill.js'}
    ])
];

if (isProd) {
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

module.exports = {
    entry: {
        app: [
            entryJs
        ],
        vendor: [
            'angular',
            'angular-ui-router',
            'angular-animate',
            'angular-sanitize',
            'angular-mocks',
            'angular-loading-bar',
            'oclazyload',
            'angular-adaptive-detection',
            'approck-appear',
            'approck-animate',
            'approck-ui-router-extras',
            'slick-carousel',
            'angular-slick-carousel',
            'underscore',
            'lodash',
            'shifty',
            'spark-scroll',
            'ui-router-extras',
            'angulartics',
            'angulartics-google-analytics',
            'parse'
        ]
    },
    output: {
        path: base + 'dist',
        filename: isProd ? '[name].[hash].js' : '[name].js',
        chunkFilename: isProd ? '[name].[hash].chunk.js' : '[name].chunk.js'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "eslint",
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.jade$/,
                loader: 'jade',
                exclude: /index\.jade/
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('vue-style', 'css-loader?sourceMap&-autoprefixer!postcss!stylus')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('vue-style', 'css-loader?sourceMap&-autoprefixer')
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)(\?]?.*)?$/,
                // include: /source\app\assets\fonts/,
                loader: 'file?name=assets/fonts/[name].[ext]?[hash]'
                // loader: 'url-loader?name=assets/fonts/[name].[ext]?[hash]'
            },
            {
                test: /\.(png|jpg|svg)$/,
                // include: /source\app\assets\images/,
                loader: 'file?limit=8192&name=assets/images/[name].[hash].[ext]'
            },
            {
                test: /\.mp4$/,
                loader: 'file?&name=assets/videos/[name].[hash].[ext]'
            }
        ]
    },
    plugins: plugins,
    debug: !isProd,
    devtool: isProd ? null : 'eval-source-map',
    devServer: {
        contentBase: base + 'dist',
        historyApiFallback: true,
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        },
        host: '0.0.0.0',
        port: 3000
    },
    postcss: function () {
        return [autoprefixer({ browsers: ['last 4 versions'] })];
    }
};

'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');
const clean = require('../utils/clean')
const error = require('../utils/error');

module.exports = function(config) {
    config = config || {};
    
    let stylelintConfig = {
        "rules": {
            "color-no-invalid-hex": true,
            "declaration-colon-space-after": "always",
            "declaration-colon-space-before": "never",
            "function-comma-space-after": "always",
            "media-feature-colon-space-after": "always",
            "media-feature-colon-space-before": "never",
            "media-feature-name-no-vendor-prefix": true,
            "max-empty-lines": 5,
            "number-leading-zero": "never",
            "selector-list-comma-space-before": "never",
            "selector-no-id": true,
            "number-no-trailing-zeros": true,
            "property-no-vendor-prefix": true,
            "value-no-vendor-prefix": true
        }
    };

    let processors = {
        watch: [
            require('postcss-import-folder'),
            require('postcss-use')({ resolveFromFile: true, modules: '*' }),
            // require('postcss-partial-import'),
            // require('precss'),
            // require('postcss-scss'),
            // require('postcss-assets')({
            //     loadPaths: ['images/'],
            //     relative: '../images/'
            // }),
            // require('postcss-cssnext')({ 
            //     browsers: 'last 2 versions' 
            // }),
            // require('lost'), for grid
            // require('cssgrace'),
            // require('postcss-each'),
            // require('postcss-for'),
            // require('postcss-at-rules-variables'),
            // require('postcss-custom-properties'),
            // require('postcss-conditionals'),
            // require('postcss-mixins'),
            // require('postcss-extend'),
            // require('postcss-include'),
            // require('postcss-color-function'),
            // require('postcss-custom-media'),
            // require('postcss-media-minmax'),
            // require('postcss-custom-selectors'),
            // require('postcss-nested'),
            // require('postcss-simple-vars')({ silent: true }),
            // require('postcss-font-magician')({
            //     hosted: '../fonts',
            //     formats: 'local woff2 woff ttf eot svg'
            // }),
            // require('postcss-fixes'),
            // require('postcss-vmin'),
            // require('postcss-opacity'),
            // require('postcss-unnth'),
            // require('postcss-will-change'),
            // require('postcss-color-rgba-fallback'),
            // require('postcss-reporter')({ clearMessages: true })
        ],
        modules: [
            require('postcss-modules')({
                scopeBehaviour: 'global',
                getJSON: function(cssFileName, json) {
                  var path          = require('path');
                  var cssName       = path.basename(cssFileName, '.css');
                  var jsonFileName  = path.resolve(config.app + cssName + '.json');
                  fs.writeFileSync(jsonFileName, JSON.stringify(json));
                }
            })
        ],
        pretty: [
            require('postcss-sorting')({
                "sort-order": "default",
                "empty-lines-between-children-rules": 0,
                "empty-lines-between-media-rules": 0,
                "preserve-empty-lines-between-children-rules": false
            })
        ],
        lint: [
            require('stylelint')(stylelintConfig),
            require('postcss-reporter')({
                clearMessages: true,
                throwError: true
            })
        ],
        build: [
            require('postcss-emptymediaqueries'),
            require('css-mqpacker'),
            require('postcss-flexboxfixer'),
            require('postcss-gradientfixer'),
            require('autoprefixer')({
                browsers: ["last 2 version", "safari 5", "ie > 7", "opera 12.1", "ios 6", "android 2.3"],
                cascade: false
            }),
            require('cssnano')({
                'safe': true,
                'calc': false,
                'zindex': false,
                'autoprefixer': false,
                'normalizeCharset': true,
                'convertValues': { length: false },
                'colormin': true
            })
        ]
    };

    return function(callback) {

        gulp.src(config.src)
            .pipe($.plumber({errorHandler: error}))
            .pipe($.sourcemaps.init())

            .pipe($.postcss(processors.watch))

            .pipe($.if(
                global.is.modules,
                $.postcss(processors.modules)
            ))

            .pipe($.if(
                global.is.pretty,
                $.postcss(processors.pretty)
            ))

            .pipe($.if(
                global.is.lint,
                $.postcss(processors.lint)
            ))

            .pipe($.rename({suffix: '.min'}))

            .pipe($.if(
                global.is.build,
                $.postcss(processors.build)
            ))

            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(config.app))
            .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

        callback();

    };

};
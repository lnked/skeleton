'use strict';

const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');
const clean = require("../clean.js");
const error = require("../error.js");

module.exports = function(config) {
    config = config || {};
    
    return function(callback) {
        
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

        gulp.src(config.src)
            .pipe($.plumber({errorHandler: error}))
            .pipe($.sourcemaps.init())

            .pipe(
                $.postcss([
                    require('postcss-import-folder')({
                        encoding:  'utf8',
                        extname: 'css',
                        prefix: '_'
                    }),
                    // require('postcss-partial-import'),
                    /*
                    require('postcss-use')({ resolveFromFile: true, modules: '*' }),
                    require('precss'),
                    require('postcss-scss'),
                    require('postcss-assets')({
                        loadPaths: ['images/'],
                        relative: '../images/'
                    }),
                    require('postcss-cssnext')({ 
                        browsers: 'last 2 versions' 
                    }),
                    // require('lost'), for grid
                    require('cssgrace'),
                    require('postcss-each'),
                    require('postcss-for'),
                    require('postcss-at-rules-variables'),
                    require('postcss-custom-properties'),
                    require('postcss-conditionals'),
                    require('postcss-mixins'),
                    require('postcss-extend'),
                    require('postcss-include'),
                    require('postcss-color-function'),
                    require('postcss-custom-media'),
                    require('postcss-media-minmax'),
                    require('postcss-custom-selectors'),
                    require('postcss-nested'),
                    require('postcss-simple-vars')({ silent: true }),
                    require('postcss-font-magician')({
                        hosted: '../fonts',
                        formats: 'local woff2 woff ttf eot svg'
                    }),
                    require('postcss-fixes'),
                    require('postcss-vmin'),
                    require('postcss-opacity'),
                    require('postcss-unnth'),
                    require('postcss-will-change'),
                    require('postcss-color-rgba-fallback'),
                    require('postcss-reporter')({ clearMessages: true })
                    */
                ])
            )

            .pipe($.if(
                global.is.modules,
                $.postcss([
                    require('postcss-modules')({
                        scopeBehaviour: 'global',
                        getJSON: function(cssFileName, json) {
                          var path          = require('path');
                          var cssName       = path.basename(cssFileName, '.css');
                          var jsonFileName  = path.resolve(config.app + cssName + '.json');
                          fs.writeFileSync(jsonFileName, JSON.stringify(json));
                        }
                    })
                ])
            ))

            .pipe($.if(
                global.is.pretty,
                $.postcss([
                    require('postcss-sorting')({
                        "sort-order": "default",
                        "empty-lines-between-children-rules": 0,
                        "empty-lines-between-media-rules": 0,
                        "preserve-empty-lines-between-children-rules": false
                    })
                ])
            ))

            .pipe($.if(
                global.is.lint,
                $.postcss([
                    require('stylelint')(stylelintConfig),
                    require('postcss-reporter')({
                        clearMessages: true,
                        throwError: true
                    })
                ])
            ))

            .pipe($.rename({suffix: '.min'}))

            .pipe($.if(
                global.is.build,
                $.postcss([
                    require('postcss-emptymediaqueries'),
                    require('css-mqpacker'),
                    require('postcss-flexboxfixer'),
                    require('postcss-gradientfixer'),
                    require('autoprefixer')({
                        browsers: ["last 2 version", "safari 5", "ie > 7", "opera 12.1", "ios 6", "android 2.3"]
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
                ])
            ))

            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(config.app))
            .pipe($.if(global.is.notify, $.notify({ message: config.task + ' complete', onLast: true })));

        callback();

    };

};
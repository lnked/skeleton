const src = './frontend/';
const app = './public_html/';

module.exports.app  = app;

module.exports.src  = src;

module.exports.tasks = {
    'template': {
        src: [src + 'template/**/*.html', '!' + src + 'template/**/_*.*'],
        app: app
    },

    'scripts': {
        path: src + 'scripts',
        ignore: '!' + src + 'scripts/**/_*.*',
        app: app + 'js'
    },

    'styles': {},
    
    'images': {
        src: src + 'images/**/*.{gif,svg,png,jpg,jpeg,webp}',
        app: app + 'images'
    },

    'fonts': {
        src: src + 'fonts/**/*.{woff2,woff,ttf,eot,svg}',
        app: app + 'fonts'
    },
    
    'json': {
        src: src + 'json/**/*.*',
        app: app + 'json'
    },

    'favicon': {
        src: src + 'favicon/**/*.*',
        app: app + 'favicon'
    },
    
    'svgstore': {},

    'extras': {},
    
    'webserver': {},
    
    'screenshot': {},
    
    'watch': {
        tasks: {
            template:   [src + 'template/*.html', src + 'template/**/*.html', src + 'template/**/**/*.html', '!' + src + 'template/**/_*.*'],
            scripts:    [src + 'scripts/**/*.{js,coffee}', '!' + src + 'scripts/**/_*.*'],
            images:     [src + 'images/**/*.*'],
            favicon:    [src + 'favicon/**/*.*'],
            fonts:      [src + 'fonts/**/*.*'],
            json:       [src + 'json/**/*.json'],
            styles:     [src + 'styles/**/*.scss'],
            svgstore:   [src + 'svgstore/**/*.svg']
        }
    }
}
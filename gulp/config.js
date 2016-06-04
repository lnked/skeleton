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

    'fonts': {},
    
    'json': {},

    'favicon': {},
    
    'svgstore': {},

    'extras': {},
    
    'webserver': {},
    
    'screenshot': {},
    
    'watch': {}
}
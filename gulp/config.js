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
    
    'svgstore': {
        src: src + 'svgstore/**/*.svg',
        path: src + 'template/components/',
        file: src + 'template/components/_svgstore.html'
    },

    'extras': {},
    
    'webserver': {
        app: app,
        server: {
            port: 3004,
            // proxy: {
            //     target: "http://localhost:3004/",
            //     ws: true
            // },
            server: {
                baseDir: app,
                index: 'index.html'
            },
            browser: [
                "google chrome", // "firefox"
            ]
        }
    },
    
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
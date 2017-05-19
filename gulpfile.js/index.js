'use strict';

require("./utils/env.js");

const $             = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp          = require('gulp');
const task          = require("./utils/task.js");
const config        = require("./config.js");

let bower = [];

if (config.tasks.bower) {
    bower = config.tasks.bower;
}

for (let task_name in config.tasks) {
    task(task_name, config.tasks[task_name], bower);
}

gulp.task('build',
    gulp.series(
        'before_build', gulp.parallel('template', 'pug', 'styles', 'scripts', 'images', 'favicon', 'fonts', 'json', 'misc')
    )
);

gulp.task('default', gulp.parallel( 'watch', 'webserver' ));

/*
gulp.task('archive:src', zip.zipSrc);
gulp.task('archive:dist', zip.zipDist);
gulp.task('archive', gulp.series('archive:src', 'archive:dist'));

gulp.task('ssh:clean', ssh.clean);
gulp.task('ssh:upload', ssh.upload);
gulp.task('ssh:unzip', ssh.unzip);
gulp.task('ssh', gulp.series('ssh:clean', 'ssh:upload', 'ssh:unzip'));

gulp.task('w3c:html', w3cHTML);

gulp.task('default',
    gulp.series('bower', 'images', 'styles', 'scripts', 'templates', 'sprites')
);

gulp.task('dev',
    gulp.series('default', 'browsersync', 'watch')
);

gulp.task('minify',
    gulp.series('images:min', 'styles:min', 'scripts:min')
);

gulp.task('production',
    gulp.series('default', 'styles:rtl', 'minify')
);

gulp.task('deploy',
    gulp.series('production', 'archive', 'ssh')
);

gulp.task('validate',
    gulp.series('w3c:html')
);
*/
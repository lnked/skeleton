const $     = require('gulp-load-plugins')({ pattern: ['gulp-*', 'gulp.*', 'postcss-*'] });
const gulp  = require('gulp');

module.exports = function(err) {
    $.util.beep();
    $.util.log($.util.colors.cyan('FileName:'), $.util.colors.green(err.fileName));
    $.util.log($.util.colors.cyan('Plugin:'), $.util.colors.green(err.plugin));
    $.util.log($.util.colors.cyan('column:'), $.util.colors.red.bold(err.column));
    $.util.log($.util.colors.cyan('line:'), $.util.colors.red.bold(err.line));
    $.util.log($.util.colors.cyan('Error:'), $.util.colors.red.bold(err.message));
    $.util.log($.util.colors.cyan('lineNumber:'), $.util.colors.magenta(err.lineNumber));
};
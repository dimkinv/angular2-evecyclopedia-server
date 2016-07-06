"use strict";
var gulp = require('gulp');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
gulp.task('ts', function () {
    return gulp.src(['**/*.ts', '!node_modules/**'])
        .pipe(ts())
        .pipe(gulp.dest('./'));
});
gulp.task('nodemon', function () {
    nodemon({
        script: './bin/www',
        ext: 'js json',
        ignore: [
            'node_modules'
        ]
    });
});
gulp.task('watch', function () {
    gulp.watch(['**/*.ts', '!node_modules/**'], ['ts']);
});
gulp.task('default', ['ts', 'nodemon', 'watch']);

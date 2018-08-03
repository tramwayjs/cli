"use strict";

const gulp = require('gulp');
const babel = require('gulp-babel');

const DEV_DIRECTORY = 'dev/**/*.js';
const DIST_DIRECTORY = 'dist';

gulp.task('build', ['move-txt'], function() {
    return gulp
        .src(DEV_DIRECTORY)
        .pipe(babel())
        .pipe(gulp.dest(DIST_DIRECTORY));
});

gulp.task('watch', ['build'], function(){
    gulp.watch(DEV_DIRECTORY, ['build']);
});

gulp.task('distribute', ['move-txt'], function() {
    return gulp
        .src(DEV_DIRECTORY)
        .pipe(babel())
        .pipe(gulp.dest(DIST_DIRECTORY));
});

gulp.task('move-txt', function() {
    return gulp.src('dev/**/*.txt').pipe(gulp.dest(DIST_DIRECTORY));
});

gulp.task('default', ['watch']);
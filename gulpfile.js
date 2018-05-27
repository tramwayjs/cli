"use strict";

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const DEV_DIRECTORY = 'dev/**/*.js';
const DIST_DIRECTORY = '';

gulp.task('build', ['move-txt'], function() {
    return gulp
        .src(DEV_DIRECTORY)
        .pipe(sourcemaps.init())
        .pipe(babel({
            "plugins": [
                "transform-flow-strip-types"
            ],
            "presets": [
                "es2015-node6"
            ]
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(DIST_DIRECTORY));
});

gulp.task('watch', ['build'], function(){
    gulp.watch(DEV_DIRECTORY, ['build']);
});

gulp.task('distribute', ['move-txt'], function() {
    return gulp
        .src(DEV_DIRECTORY)
        .pipe(babel({
            "plugins": [
                "transform-flow-strip-types"
            ],
            "presets": [
                "es2015-node6"
            ]
        }))
        .pipe(gulp.dest(DIST_DIRECTORY));
});

gulp.task('move-txt', function() {
    return gulp.src('dev/**/*.txt').pipe(gulp.dest(DIST_DIRECTORY));
});

gulp.task('default', ['watch']);
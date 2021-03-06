'use strict';

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var runSequence = require('run-sequence');

var paths = {
    js: "./src/main/resources/static/src/**/*.js",
    pages: "./src/main/resources/static/src/**/*.html",
    sass: "./src/main/resources/static/src/**/*.scss"
};

gulp.task('styles',function () {
    gulp.src(paths.sass)
        .pipe(plumber({//当发生异常时提示错误
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sass({
            outputStyle:'expanded',
            precision:10
        }))
        .pipe(gulp.dest('./src/main/resources/static/src/css'))
        .pipe(reload({stream:true}));
});

gulp.task('jsReload',function () {
    reload(paths.js);
});

gulp.task('htmlReload',function () {
    reload(paths.pages);
});

gulp.task('reflash',function(){
    gulp.watch(paths.pages,['htmlReload']);
    gulp.watch(paths.sass,['styles']);
    gulp.watch(paths.js,['jsReload']);
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "./src/main/resources/static/src"
        },
        port: 5110
    });
});

gulp.task('serve',function(callback){
    runSequence('browser-sync','reflash',callback);
});
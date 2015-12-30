var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');

gulp.task('serve', ['inject'], function () {
    var files = [
        './src/app/**/*.html',
        './src/app/**/*.js'
    ];
    browserSync.init(files, {
        server: {
            baseDir: './src',
            routes: {
                '/bower_components': './bower_components/',
                '/src': './src'
            }
        },
        port: 9000
    });
});

gulp.task('inject', function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], { read: false });

    target
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(inject(sources)).pipe(gulp.dest('./src'));
});
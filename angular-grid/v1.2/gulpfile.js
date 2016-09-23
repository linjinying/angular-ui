var gulp = require('gulp');
var compass = require('gulp-compass');
var uglifyjs = require('gulp-uglify');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var sassFolder = ['./sass/**/*.scss'];
var jsFolder = ['./js/*/**.js'];
gulp.task('compass', function() {
    return gulp.src(sassFolder)
        .pipe(compass({
            config_file: './config.rb',
            sass: './sass'
        }))
        .pipe(autoprefixer({
            browsers: ['Firefox >= 1', 'Chrome >= 1', 'ie >= 7'],
            cascade: true
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css/'));
});
gulp.task('concatJS', function() {
    return gulp.src(['./js/angular-grid.js'].concat(jsFolder))
        .pipe(concat('angular-grid.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglifyjs())
        .pipe(gulp.dest('./dist/js/'));
});
gulp.task('connect', function() {
    connect.server({
        root: '../',
        port: 9999,
        host: 'localhost'
    });
});

gulp.task('start', function() {
    gulp.watch(sassFolder, ['compass']);
    gulp.watch(jsFolder, ['concatJS']);
    gulp.start('concatJS');
    gulp.start('connect');
});
gulp.task('default', ['start']);
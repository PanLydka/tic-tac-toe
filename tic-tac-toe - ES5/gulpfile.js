const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano')
const livereload = require('gulp-livereload');
const webpack = require('gulp-webpack');
const babel = require('babel-core');
const watchWebpack = require('webpack-watch-livereload-plugin');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

gulp.task('html', function() {
    return gulp.src('dist/index.html')
        .pipe(livereload())
});

gulp.task('css', () => {
    gulp.src('./src/scss/main.scss')
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(sass())
            .pipe(cssnano())
            .pipe(gulp.dest('./dist/css'))
})

gulp.task('js', () => {
    gulp.src('./src/js/main.js')
            .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
            .pipe(webpack({
              output: {
                 filename: 'app.js'
             }
            }))
            .pipe(gulp.dest('./dist/js'))
            .pipe(livereload())
})

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('./src/scss/**/*', ['css']);
    gulp.watch('./src/js/**/*', ['js']);
    gulp.watch('./dist/**/*', ['html']);
})

var gulp = require('gulp')
var rollup = require('gulp-better-rollup')
var buble = require('rollup-plugin-buble')
var sourcemaps = require('gulp-sourcemaps')
var cssnano = require('gulp-cssnano')
var sass = require('gulp-sass')
var uglify = require('gulp-uglify')

gulp.task('js', () => {
    gulp.src('src/js/index.js')
    .pipe(sourcemaps.init())
        .pipe(rollup({
            plugins: [
                buble()
            ],
            moduleName: 'HatcherSonde'
        }, 'umd'))
        .pipe(uglify())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist'))
});

gulp.task('sass', () => {
    gulp.src('src/sass/index.scss')
    .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['js', 'sass']);



gulp.task('watch', ['build'], function(){
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

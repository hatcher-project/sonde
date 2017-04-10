var gulp = require('gulp')
var rollup = require('gulp-better-rollup')
var buble = require('rollup-plugin-buble')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('js', () => {
    gulp.src('src/js/index.js')
    .pipe(sourcemaps.init())
    .pipe(rollup({
        plugins: [
            buble()
        ],
        moduleName: 'HatcherSonde'
    }, 'umd'))
    // inlining the sourcemap into the exported .js file
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['js']);



gulp.task('watch', ['build'], function(){
    gulp.watch('src/js/**/*.js', ['js']);
});

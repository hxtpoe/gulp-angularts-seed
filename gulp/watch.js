'use strict';

var gulp = require('gulp');

gulp.task('watch', ['scripts', 'styles'], function () {
    gulp.watch('src/{app,components}/**/*.scss', ['styles']);
    gulp.watch('src/{app,components}/**/*.ts', ['scripts']);
    gulp.watch('src/assets/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
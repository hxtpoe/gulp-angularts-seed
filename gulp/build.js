'use strict';

var gulp = require('gulp');

var tsc = require('gulp-typescript-compiler');
var typescript = require('gulp-tsc');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

function handleError(err) {
    console.error(err.toString());
    this.emit('end');
}

gulp.task('styles', ['wiredep'], function () {
    return gulp.src('src/{app,components}/**/*.scss')
        .pipe($.rubySass({style: 'expanded'}))
        .on('error', handleError)
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp'))
        .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src('src/{app,components}/**/*.ts')
        .pipe(typescript({ emitError: false }).on('error', handleError))

        .pipe(gulp.dest('.tmp/'));
});

gulp.task('partials', function () {
    return gulp.src('src/{app,components}/**/*.html')
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.ngHtml2js({
            moduleName: 'connect'
        }))
        .pipe(gulp.dest('.tmp'))
        .pipe($.size());
});

gulp.task('html', ['styles', 'scripts', 'partials'], function () {
    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src('src/*.html')
        .pipe($.inject(gulp.src('.tmp/{app,components}/**/*.js'), {
            read: false,
            starttag: '<!-- inject:partials -->',
            addRootSlash: false,
            addPrefix: '../'
        }))
        .pipe(assets = $.useref.assets())
        .pipe($.rev())
        .pipe(jsFilter)
        .pipe($.ngAnnotate())
        .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('src/assets/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/assets/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('misc', function () {
    return gulp.src('src/**/*.ico')
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('clean', function (done) {
    $.del(['.tmp', 'dist'], done);
});

gulp.task('build', ['html', 'images', 'fonts', 'misc']);

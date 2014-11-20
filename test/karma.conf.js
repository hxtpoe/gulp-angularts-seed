'use strict';

module.exports = function (config) {

    config.set({
        basePath: '..', //!\\ Ignored through gulp-karma //!\\

        files: [ //!\\ Ignored through gulp-karma //!\\
            'src/bower_components/angular/angular.js',
            'src/bower_components/angular/angular-route.js',
            'src/bower_components/angular-mocks/angular-mocks.js',
            'src/{app,components}/** /*.js',
            'test/unit/** /*.js'
        ],

        autoWatch: false,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine'
        ],
        preprocessors: {
            'src/{app,components}/**/*.ts': ['typescript']
        },
        typescriptPreprocessor: {
            // options passed to the typescript compiler
            options: {
                sourceMap: false, // (optional) Generates corresponding .map file.
                target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
                module: 'amd', // (optional) Specify module code generation: 'commonjs' or 'amd'
                noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
                noResolve: true, // (optional) Skip resolution and preprocessing.
                removeComments: true // (optional) Do not emit comments to output.
            },
            // transforming the filenames
            transformPath: function (path) {
                console.log(path)
                return path.replace(/\.ts$/, '.js');
            }
        }
    });
};

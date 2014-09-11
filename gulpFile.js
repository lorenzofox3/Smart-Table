var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var karma = require('karma').server;
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var pluginList = ['stSearch', 'stSearchSelect', 'stSelectRow', 'stSort', 'stPagination', 'stPipe'];
var disFolder = './dist/';

var src = (['smart-table.module', 'stTable', 'smart-table-tpls']).concat(pluginList).map(function (val) {
    return 'src/' + val + '.js';
});

//modules
gulp.task('plugins', function () {
    gulp.src(src)
        .pipe(concat('smart-table.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(disFolder));
});


//just as indication
gulp.task('lint', function () {
    gulp.src(src)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});


gulp.task('karma-CI', function (done) {
    var conf = require('./test/karma.common.js');
    conf.singleRun = true;
    conf.browsers = ['PhantomJS'];
    conf.basePath = './';
    karma.start(conf, done);
});

gulp.task('debug', function () {
    gulp.src(src)
        .pipe(concat('smart-table.debug.js'))
        .pipe(gulp.dest(disFolder));
});

gulp.task('test', ['karma-CI']);

gulp.task('build', ['test', 'plugins', 'debug']);

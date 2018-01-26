var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var karma = require('karma').server;
var insert = require('gulp-insert');
var sourcemaps = require('gulp-sourcemaps');
var packageJson = require('./package.json');
var pluginList = ['stSearch', 'stSelectRow', 'stSort', 'stPagination', 'stPipe'];
var disFolder = './dist/';
var src = (['smart-table.module', 'stConfig', 'stTable']).concat(pluginList).map(function (val) {
    return 'src/' + val + '.js';
});

src.push('src/bottom.txt');
src.unshift('src/top.txt');


gulp.task('karma-CI', function (done) {
    var conf = require('./test/karma.common.js');
    conf.singleRun = true;
    conf.browsers = ['PhantomJS'];
    conf.basePath = './';
    karma.start(conf, done);
});

gulp.task('uglify', function () {
    gulp.src(src)
      .pipe(concat('smart-table.min.js'))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(disFolder));
});

gulp.task('concat', function () {
    gulp.src(src, { base: '.' })
      .pipe(concat('smart-table.js'))
      .pipe(gulp.dest(disFolder));
});

gulp.task('test', ['karma-CI']);

gulp.task('build',['test', 'uglify', 'concat'], function () {

    var version = packageJson.version;
    var string = '/** \n* @version ' + version + '\n* @license MIT\n*/\n';

    gulp.src(disFolder + '*.js')
        .pipe(insert.prepend(string))
        .pipe(gulp.dest(disFolder));
});

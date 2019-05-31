const gulp = require('gulp');
const gulpConcat = require('gulp-concat');
const gulpUglify = require('gulp-uglify');
const gulpInject = require('gulp-inject-string');
const gulpSourcemaps = require('gulp-sourcemaps');
const pluginList = ['stSearch', 'stSelectRow', 'stSort', 'stPagination', 'stPipe'];
const disFolder = './dist/';
let src = (['smart-table.module', 'stConfig', 'stTable']).concat(pluginList).map(function (val) {
    return 'src/' + val + '.js';
});

src.push('src/bottom.txt');
src.unshift('src/top.txt');

function test(done) {
    process.env.CHROMIUM_BIN = require('puppeteer').executablePath();
    const conf = require('./test/karma.common.js');
    const {Server} = require('karma');
    conf.singleRun = true;
    conf.browsers = ['ChromiumHeadless'];
    conf.basePath = './';
    const server = new Server(conf, (exitCode) => {
        done(exitCode === 0 ? undefined : new Error('Karma has exited with exit code ' + exitCode));
    });
    server.start();
};

function uglify() {
    return (
        gulp.src(src)
            .pipe(gulpConcat('smart-table.min.js'))
            .pipe(gulpSourcemaps.init())
            .pipe(gulpUglify())
            .pipe(gulpSourcemaps.write('.'))
            .pipe(gulp.dest(disFolder))
    );
}

function concat() {
    return (
        gulp.src(src, { base: '.' })
            .pipe(gulpConcat('smart-table.js'))
            .pipe(gulp.dest(disFolder))
    );
}

module.exports = {
    build: gulp.series(test, uglify, concat, () => {
        const {version} = require('./package.json');
        return (
            gulp.src(disFolder + '*.js')
                .pipe(gulpInject.prepend(
`/** 
* @version ${version}
* @license MIT
*/
`))
                .pipe(gulp.dest(disFolder))
        );
    }),
    concat,
    uglify,
    test,
};

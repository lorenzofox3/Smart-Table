module.exports = function (config) {
    config.set({

        basePath: '../',

        files: [
            'smart-table-module/lib/angular/angular.js',
            'test/lib/angular/angular-mocks.js',
            'smart-table-module/js/*.js',
            'test/unit/*.js'
        ],

        frameworks: ['jasmine'],

        autoWatch: false,

        singleRun: true,

        browsers: ['PhantomJS', 'Firefox'],

        preprocessors: {
            'smart-table-module/js/Column.js': 'coverage',
            'smart-table-module/js/Table.js': 'coverage',
            'smart-table-module/js/Utilities.js': 'coverage',
            'smart-table-module/js/Filters.js': 'coverage',
            'smart-table-module/js/Directives.js': 'coverage'
        },

        reporters: ['progress', 'coverage']

    });
};


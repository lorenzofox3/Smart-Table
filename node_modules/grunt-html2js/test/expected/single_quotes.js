angular.module('templates-single_quotes', ['../test/fixtures/four.tpl.html']);

angular.module('../test/fixtures/four.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('../test/fixtures/four.tpl.html',
    'This data is "in quotes"\n' +
    'And this data is \'in single quotes\'\n' +
    '');
}]);

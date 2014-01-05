angular.module('my-custom-template-module', ['fixtures/one.tpl.html', 'fixtures/two.tpl.html']);

angular.module("fixtures/one.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fixtures/one.tpl.html",
    "1 2 3");
}]);

angular.module("fixtures/two.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fixtures/two.tpl.html",
    "Testing");
}]);

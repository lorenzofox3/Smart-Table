angular.module('templates-rename', ['../test/fixtures/one.tpl', '../test/fixtures/two.tpl']);

angular.module("../test/fixtures/one.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/one.tpl",
    "1 2 3");
}]);

angular.module("../test/fixtures/two.tpl", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/two.tpl",
    "Testing");
}]);

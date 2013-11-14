angular.module('my-custom-template-module', ['fixtures/two.tpl.html']);

angular.module("fixtures/two.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("fixtures/two.tpl.html",
    "Testing");
}]);

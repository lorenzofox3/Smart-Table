angular.module('templates-files_array_default_options', ['../test/fixtures/two.tpl.html']);

angular.module("../test/fixtures/two.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/two.tpl.html",
    "Testing");
}]);

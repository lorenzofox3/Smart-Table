angular.module('templates-files_object_default_options', ['../test/fixtures/one.tpl.html']);

angular.module("../test/fixtures/one.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../test/fixtures/one.tpl.html",
    "1 2 3");
}]);

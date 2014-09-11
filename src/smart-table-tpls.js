angular.module('smart-table-tpls', ['template/smart-table/pagination.html']);

angular.module('template/smart-table/pagination.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('template/smart-table/pagination.html',
      '<div class="pagination"><ul class="pagination">' +
      '<li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
      '</ul></div>');
}]);
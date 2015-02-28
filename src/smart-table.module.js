ng.module('smart-table', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/smart-table/pagination.html',
        '<li ng-hide="currentPage <= 1"><a ng-click="selectPage(currentPage - 1)">&lt;</a></li>' +
        '<nav ng-if="pages.length >= 2"><ul class="pagination">' +
        '<li ng-repeat="page in pages"  ng-class="{active: page==currentPage}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
        '<li ng-hide="currentPage >= pages.length"><a ng-click="selectPage(currentPage + 1)">&gt;</a></li>' +
        '</ul></nav>');
}]);


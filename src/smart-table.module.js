ng.module('smart-table', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/smart-table/pagination.html',
        '<nav ng-if="pages.length >= 2">' +
        '<button id="previous" ng-if="currentPage > 1" ng-click="selectPage(currentPage - 1)">&lt;</button>' +
        '<ul class="pagination">' +
        '<li ng-repeat="page in pages"  ng-class="{active: page==currentPage}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
        '</ul>' +
        '<button id="next" ng-if="currentPage < pages.length" ng-click="selectPage(currentPage + 1)">&gt;</button>' +
        '</nav>');
}]);


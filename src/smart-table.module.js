ng.module('smart-table', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/smart-table/pagination.html',
        '<div class="pagination" ng-if="pages.length >= 2"><ul class="pagination">' +
        '<li ng-if="stFirstPage" ng-class="{disabled: 1==currentPage}"><a ng-click="selectPage(1)">{{ stFirstPage }}</a></li>' +
        '<li ng-if="stPrevPage" ng-class="{disabled: 1==currentPage}"><a ng-click="selectPage(currentPage-1)">{{ stPrevPage }}</a></li>' +
        '<li ng-if="stCollapsedPages && pages[0] > 1"><a ng-click="selectPage(pages[0] - 1)">...</a></li>' +
        '<li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
        '<li ng-if="stCollapsedPages && pages[pages.length - 1] < numPages"><a ng-click="selectPage(pages[pages.length - 1])">...</a></li>' +
        '<li ng-if="stNextPage" ng-class="{disabled: numPages==currentPage}"><a ng-click="selectPage(currentPage+1)">{{ stNextPage }}</a></li>' +
        '<li ng-if="stLastPage" ng-class="{disabled: numPages==currentPage}"><a ng-click="selectPage(numPages)">{{ stLastPage }}</a></li>' +
        '</ul></div>');
}]);


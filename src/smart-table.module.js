ng.module('smart-table', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/smart-table/pagination.html',
         '<nav ng-if="pages.length >= 2"><ul class="pagination pagination-sm">' +
        '<li ng-if="pages.length > 2"><a ng-click="selectPage(1)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>' +
        '<li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a ng-click="selectPage(page)">{{page}}</a></li>' +
        '<li ng-if="pages.length > 2"><a ng-click="selectPage(pages.length)" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>' +
        '</ul></nav>');
}]);


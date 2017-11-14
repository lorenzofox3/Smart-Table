ng.module('smart-table', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/smart-table/pagination.html',
        '<nav ng-if="numPages && pages.length >= 2"><ul class="pagination">' +
        '<li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a href="#" ng-click="selectPage(page); $event.preventDefault(); $event.stopPropagation();">{{page}}</a></li>' +
        '</ul></nav>');
}]);


(function (ng) {
    'use strict';
    ng.module('smart-table')
        .directive('stPagination', function () {
            return {
                restrict: 'EA',
                require: '^stTable',
                scope: {
                  currentPage:      '=?',
                  pages:            '=?',
                  stItemsByPage:    '@',
                  stDisplayedPages: '@'
                },
                template: '<div class="pagination"><ul class="pagination"><li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a ng-click="selectPage(page)">{{page}}</a></li></ul></div>',
                replace: true,
                link: function (scope, element, attrs, ctrl) {

                    scope.stItemsByPage = parseInt(scope.stItemsByPage || 10) || 10;
                    scope.stDisplayedPages = parseInt(scope.stDisplayedPages || 5) || 5;

                    scope.currentPage = 1;
                    scope.pages = [];


                    scope.$watch(function () {
                            return [ctrl.tableState().pagination, scope.stItemsByPage, scope.stDisplayedPages];
                        },
                        function () {
                            var paginationState = ctrl.tableState().pagination;
                            var start = 1;
                            var end;
                            var i;
                            scope.currentPage = Math.floor(paginationState.start / paginationState.number) + 1;

                            start = Math.max(start, scope.currentPage - Math.abs(Math.floor(scope.stDisplayedPages / 2)));
                            end = start + scope.stDisplayedPages;

                            if (end > paginationState.numberOfPages) {
                                end = paginationState.numberOfPages + 1;
                                start = Math.max(1, end - scope.stDisplayedPages);
                            }

                            scope.pages = [];
                            scope.numPages = paginationState.numberOfPages;

                            for (i = start; i < end; i++) {
                                scope.pages.push(i);
                            }


                        }, true);

                    scope.selectPage = function (page) {
                        if (page > 0 && page <= scope.numPages) {
                            ctrl.slice((page - 1) * scope.stItemsByPage, scope.stItemsByPage);
                        }
                    };

                    //select the first page
                    ctrl.slice(0, scope.stItemsByPage);
                }
            };
        });
})(angular);

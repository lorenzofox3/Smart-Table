(function (ng) {
    'use strict';
    ng.module('smart-table')
        .directive('stPagination', function () {
            return {
                restrict: 'EA',
                require: '^stTable',
                scope: {},
                template: '<div class="pagination" ng-if="pages.length >= 2"><ul class="pagination"><li ng-repeat="page in pages" ng-class="{active: page==currentPage}"><a ng-click="selectPage(page)">{{page}}</a></li></ul><p>Rows per page: </p><input class="form-control input-sm form-inline" type="text" value="10" ng-model="data.pageSize" ng-keyup="$event.keyCode == 13 && selectPage()"></div>',
                replace: true,
                link: function (scope, element, attrs, ctrl) {

                    function isNotNan(value) {
                        return !(typeof value === 'number' && isNaN(value));
                    }

                    function getPageSize() {
                        var pageSize = scope.data.pageSize;
                        return isNotNan(parseInt(pageSize, 10)) == true ? parseInt(pageSize, 10) : 10;
                    }

                    var displayedPages = isNotNan(parseInt(attrs.stDisplayedPages, 10)) == true ? parseInt(attrs.stDisplayedPages, 10) : 5;

                    scope.currentPage = 1;
                    scope.pages = [];
                    scope.data = {}
                    scope.data.pageSize = attrs.stItemsByPage || "10";

                    scope.e = function () {
                        console.log(scope);
                    };

                    //table state --> view
                    scope.$watch(function () {
                            return ctrl.tableState().pagination;
                        },
                        function () {
                            var paginationState = ctrl.tableState().pagination;
                            var start = 1;
                            var end;
                            var i;
                            scope.currentPage = Math.floor(paginationState.start / paginationState.number) + 1;

                            start = Math.max(start, scope.currentPage - Math.abs(Math.floor(displayedPages / 2)));
                            end = start + displayedPages;

                            if (end > paginationState.numberOfPages) {
                                end = paginationState.numberOfPages + 1;
                                start = Math.max(1, end - displayedPages);
                            }

                            scope.pages = [];
                            scope.numPages = paginationState.numberOfPages;

                            for (i = start; i < end; i++) {
                                scope.pages.push(i);
                            }


                        }, true);

                    //view -> table state
                    scope.selectPage = function (page) {
                        var pageSize = getPageSize();
                        console.log(pageSize);
                        page = page || scope.currentPage;
                        if (page > 0 && page <= scope.numPages) {
                            ctrl.slice((page - 1) * pageSize, pageSize);
                        }
                    };

                    //select the first page
                    ctrl.slice(0, getPageSize());
                }
            };
        });
})(angular);

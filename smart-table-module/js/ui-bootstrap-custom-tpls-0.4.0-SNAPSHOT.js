(function (angular) {
    angular.module('ui.bootstrap.pagination.smartTable', ['smartTable.templateUrlList'])

        .constant('paginationConfig', {
            boundaryLinks: false,
            directionLinks: true,
            firstText: 'First',
            previousText: '❰',
            nextText: '❱',
            lastText: 'Last'
        })

        .directive('paginationSmartTable', ['paginationConfig', 'templateUrlList', function (paginationConfig, templateUrlList) {
            return {
                restrict: 'EA',
                require: '^smartTable',
                scope: {
                    numPages: '=',
                    currentPage: '=',
                    maxSize: '='
                },
                templateUrl: templateUrlList.pagination,
                replace: true,
                link: function (scope, element, attrs, ctrl) {

                    // Setup configuration parameters
                    var boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
                    var directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$eval(attrs.directionLinks) : paginationConfig.directionLinks;
                    var firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : paginationConfig.firstText;
                    var previousText = angular.isDefined(attrs.previousText) ? attrs.previousText : paginationConfig.previousText;
                    var nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : paginationConfig.nextText;
                    var lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : paginationConfig.lastText;

                    // Create page object used in template
                    function makePage(number, text, isActive, isDisabled) {
                        return {
                            number: number,
                            text: text,
                            active: isActive,
                            disabled: isDisabled
                        };
                    }

                    scope.$watch('numPages + currentPage + maxSize', function () {
                        scope.pages = [];

                        // Default page limits
                        var startPage = 1, endPage = scope.numPages;

                        // recompute if maxSize
                        if (scope.maxSize && scope.maxSize < scope.numPages) {
                            startPage = Math.max(scope.currentPage - Math.floor(scope.maxSize / 2), 1);
                            endPage = startPage + scope.maxSize - 1;

                            // Adjust if limit is exceeded
                            if (endPage > scope.numPages) {
                                endPage = scope.numPages;
                                startPage = endPage - scope.maxSize + 1;
                            }
                        }

                        // Add page number links
                        for (var number = startPage; number <= endPage; number++) {
                            var page = makePage(number, number, scope.isActive(number), false);
                            scope.pages.push(page);
                        }

                        // Add previous & next links
                        if (directionLinks) {
                            var previousPage = makePage(scope.currentPage - 1, previousText, false, scope.noPrevious());
                            scope.pages.unshift(previousPage);

                            var nextPage = makePage(scope.currentPage + 1, nextText, false, scope.noNext());
                            scope.pages.push(nextPage);
                        }

                        // Add first & last links
                        if (boundaryLinks) {
                            var firstPage = makePage(1, firstText, false, scope.noPrevious());
                            scope.pages.unshift(firstPage);

                            var lastPage = makePage(scope.numPages, lastText, false, scope.noNext());
                            scope.pages.push(lastPage);
                        }


                        if (scope.currentPage > scope.numPages) {
                            scope.selectPage(scope.numPages);
                        }
                    });
                    scope.noPrevious = function () {
                        return scope.currentPage === 1;
                    };
                    scope.noNext = function () {
                        return scope.currentPage === scope.numPages;
                    };
                    scope.isActive = function (page) {
                        return scope.currentPage === page;
                    };

                    scope.selectPage = function (page) {
                        if (!scope.isActive(page) && page > 0 && page <= scope.numPages) {
                            scope.currentPage = page;
                            ctrl.changePage({ page: page });
                        }
                    };
                }
            };
        }]);
})(angular);


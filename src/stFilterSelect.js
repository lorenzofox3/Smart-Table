ng.module('smart-table')
    .directive('stFilterSelect', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            require: '^stTable',
            scope: {
                field: '=?stFilterBy'
            },
            link: function (scope, element, attr, ctrl) {

				var compiledContent = attr.stFilterSelect || $compile(element.contents())(scope).text();
				var selectionFn;
				if (compiledContent === "*")
					selectionFn = angular.bind(this, ctrl.setSelectionToAll, true);
                else if (compiledContent === "-")
                    selectionFn = angular.bind(this, ctrl.setSelectionToAll, false);
                else
					selectionFn = ctrl.selectByFilter;

                element.bind('click', function () {
                    scope.$apply(function () {
                        var predicate = {};
                        predicate[scope.field] = compiledContent;
                        selectionFn(predicate);
                    });
                });
            }
        };
    }]);

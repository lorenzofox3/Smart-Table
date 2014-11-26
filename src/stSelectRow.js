ng.module('smart-table')
    .directive('stSelectRow', function () {
        return {
            restrict: 'A',
            require: '^stTable',
            scope: {
                row: '=stSelectRow'
            },
            link: function (scope, element, attr, ctrl) {
                var mode = attr.stSelectMode || 'single';
                element.bind('click', function ($event) {
                    scope.$apply(function () {
                        ctrl.select(scope.row, mode, $event.shiftKey);
                    });
                });

                scope.$watch('row.isSelected', function (newValue, oldValue) {
                    if (newValue === true) {
                        element.addClass('st-selected');
                    } else {
                        element.removeClass('st-selected');
                    }
                });
            }
        };
    });

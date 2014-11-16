ng.module('smart-table')
    .directive('stPipe', function () {
        return {
            require: 'stTable',
            scope: {
                stPipe: '='
            },
            link: {
                pre: function (scope, element, attrs, ctrl) {

                    if (ng.isFunction(scope.stPipe)) {
                        ctrl.preventPipeOnWatch();
                        ctrl.pipe = function () {
                            var tableState = ctrl.tableState();

                            // for backwards compatibility, make sure tableState.search exists.
                            tableState.search = tableState.filters.search ? tableState.filters.search : {};

                            scope.stPipe(tableState, ctrl);
                        }
                    }
                }
            }
        };
    });

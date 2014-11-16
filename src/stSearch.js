ng.module('smart-table')
    .directive('stSearch', ['$timeout', function ($timeout) {
        return {
            require: '^stTable',
            scope: {
                predicate: '=?stSearch'
            },
            link: function (scope, element, attr, ctrl) {
                var tableCtrl = ctrl;
                var promise = null;
                var throttle = attr.stDelay || 400;
                var filter = ctrl.registerFilter('search');

                scope.$watch('predicate', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        delete filter.predicateObject[oldValue];
                        tableCtrl.applyFilter(element[0].value, newValue, filter);
                    }
                });

                //table state -> view
                scope.$watch(function () {
                    return filter.predicateObject;
                }, function (newValue) {
                    var predicateObject = newValue;
                    var predicateExpression = scope.predicate || '$';
                    if (predicateObject && predicateObject[predicateExpression] !== element[0].value) {
                        element[0].value = predicateObject[predicateExpression] || '';
                    }
                }, true);

                // view -> table state
                element.bind('input', function (evt) {
                    evt = evt.originalEvent || evt;
                    if (promise !== null) {
                        $timeout.cancel(promise);
                    }
                    promise = $timeout(function () {
                        tableCtrl.applyFilter(evt.target.value, scope.predicate, filter);
                        promise = null;
                    }, throttle);
                });
            }
        };
    }]);

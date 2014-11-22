(function (ng) {
    angular.module('myApp', ['smart-table', 'stPlugins'])
        .controller('mainCtrl', ['$scope', function ($scope) {

            $scope.displayed = [
                {
                    firstName: 'Laurent',
                    lastName: 'Renard',
                    birthDate: new Date('1987-05-21'),
                    balance: 102,
                    email: 'whatever@gmail.com'
                },
                {
                    firstName: 'Blandine',
                    lastName: 'Faivre',
                    birthDate: new Date('1987-04-25'),
                    balance: -2323.22,
                    email: 'oufblandou@gmail.com'
                },
                {
                    firstName: 'Francoise',
                    lastName: 'Frere',
                    birthDate: new Date('1955-08-27'),
                    balance: 42343,
                    email: 'raymondef@gmail.com'
                }
            ];
        }]);

    var customFilter = ng.module('stPlugins', ['smart-table']);

    //easier to separate comparator function from directive for tests
    customFilter.factory('stPlugins.numberRangeComparator', function () {
        return function (actual, expected) {
            //number range
            var limit;
            if (expected.lower) {
                limit = expected.lower;
                if (actual > limit) {
                    return false;
                }
            }

            if (expected.higher) {
                limit = expected.higher;
                if (actual < limit) {
                    return false;
                }
            }
            return true;
        }
    });
    customFilter.directive('stPluginsNumberRangeControl', ['$timeout', 'stPlugins.numberRangeComparator', function ($timeout, comparator) {
        return {
            restrict: 'E',
            require: '^stTable',
            scope: {
                lower: '=',
                higher: '='
            },
            templateUrl: './stNumberRange.template.html',
            link: function (scope, element, attr, table) {
                var inputs = element.find('input');
                var inputLower = ng.element(inputs[0]);
                var inputHigher = ng.element(inputs[1]);
                var predicateName = attr.predicate;

                [inputLower, inputHigher].forEach(function (input, index) {

                    input.bind('blur', function () {
                        var query = {};

                        if (scope.lower) {
                            query.lower = scope.lower;
                        }

                        if (scope.higher) {
                            query.higher = scope.higher;
                        }

                        scope.$apply(function () {
                            table.search(query, predicateName, comparator);
                        })
                    });
                });
            }
        };
    }]);
})(angular);



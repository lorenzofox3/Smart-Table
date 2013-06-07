'use strict';
// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['smartTable.table']).
    controller('mainCtrl', ['$scope', function (scope) {

        scope.columnCollection = [
            {label: 'FirsName', map: 'firstName'},
            {label: 'LastName', map: 'lastName'},
            {label: 'Age', map: 'age', formatFunction: 'number'},
            {label: 'balance', map: 'balance', type: 'number', formatFunction: 'currency', formatParameter: '$'},
            {label: 'email', map: 'email', type: 'email'}
        ];

        scope.globalConfig = {
            isPaginationEnabled: true,
            isGlobalSearchActivated: true,
            itemsByPage: 10
        };

    }]);
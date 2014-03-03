'use strict';
// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['smartTable.table']).
    controller('mainCtrl', ['$scope', '$http', function (scope, http) {

        http
        .get('http://localhost:8000')
        .then(function (res) {

            scope.rowCollection = res.data;

            scope.columnCollection = Object.keys(scope.rowCollection[0]).map(function (key) {
                return {
                    label: key,
                    map: key
                };
            });

        }, function (err) {
            throw new Error (err);
        });

        scope.globalConfig = {
            isPaginationEnabled: true,
            isGlobalSearchActivated: true,
            itemsByPage: 200,
            syncColumns: false
        };
        
    }]);
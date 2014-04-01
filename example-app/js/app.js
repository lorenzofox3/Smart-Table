/* global angular */
'use strict';

angular
.module('myApp', ['smartTable.table'])
.controller('mainCtrl', ['$scope', '$http', function (scope, http) {

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

    angular.extend(scope, {

        search: function (e, column) {

            console.log(e, column);

        },

        sort: function (e, column) {

            var field = column.map,
                order = column.reverse ? 'ASC' : 'DESC';
            
            console.log(field, order);
        },

        globalConfig: {
            isPaginationEnabled: false,
            isGlobalSearchActivated: true,
            serverSideFilter: true,
            serverSideSort: true,
            selectionMode: 'single'
        }

    });

    scope.$on('search', scope.search);
    scope.$on('sortColumn', scope.sort);
    
}]);
'use strict';
// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['smartTable.table']).
    controller('mainCtrl', ['$scope', '$http', function (scope, http) {

        var
            nameAsset = ['Pierre', 'Pol', 'Jacques', 'Laurent', 'Nicolas'],
            generateRandomItem = function (id) {
                var
                    age = Math.floor(Math.random() * 100),
                    balance = Math.random() * 10000,
                    name = nameAsset[Math.floor(Math.random() * 5)],
                    email = name + balance + '@' + name + '.com';

                return {
                    id: id,
                    name: name,
                    email: email,
                    age: age,
                    balance: balance
                };
            };

        scope.rowCollection = [];

        for (var i = 0; i < 400; i++) {
            scope.rowCollection.push(generateRandomItem(i));
        }


//        http.get('column.json').then(function (result) {
//            scope.columnCollection = result.data;
//            return http.get('data.json');
//        }).then(function (row) {
//            scope.rowCollection = row.data;
//        });

//        http.get('data.json').then(function (result) {
//            scope.rowCollection = result.data;
//        });

        scope.columnCollection = [
            {label: 'id', map: 'id'},
            {label: 'Name', map: 'name'},
            {label: 'Age', map:'age'},
            {label: 'Balance', map: 'balance', isEditable: true, type: 'number', formatFunction: 'currency', formatParameter: '$'},
            {label: 'Email', map: 'email', type: 'email', isEditable: true}
        ];

        scope.columnGroupCollection = [ // column groups and columns out of order on purpose to test
            {label: 'Group 2', columns: ['email','balance']},
            {label: 'Group 1', columns: ['name','age']}
        ];

        scope.globalConfig = {
            isPaginationEnabled: true,
            isGlobalSearchActivated: true,
            itemsByPage: 20,
            syncColumns: false
        };

    }]);
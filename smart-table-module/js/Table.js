/*table module */

//TODO be able to register function on remove/add column and rows or use the scope to emit the events

angular.module('smartTable.table', ['smartTable.column', 'smartTable.utilities', 'smartTable.directives', 'smartTable.filters', 'ui.bootstrap.pagination'])
    .constant('DefaultTableConfiguration', {
        selectionMode: 'none',
        isGlobalSearchActivated: false,
        displaySelectionCheckbox: false,
        isPaginationEnabled: true,
        itemsByPage: 10,
        maxSize: 5,

        //just to remind available option
        sortAlgorithm: '',
        filterAlgorithm: ''
    })
    .controller('TableCtrl', ['$scope', 'Column', '$filter', 'ArrayUtility', 'DefaultTableConfiguration', '$http', '$log', function (scope, Column, filter, arrayUtility, defaultConfig, http, log) {

        scope.columns = [];

        scope.displayedCollection = []; //init empty array so that if pagination is enabled, it does not spoil performances
        scope.numberOfPages = calculateNumberOfPages();
        scope.currentPage = 1;

        var predicate = {},
            lastColumnSort;

        function calculateNumberOfPages() {

            //should come from the server, here we simply put a random value
            return 5;
        }

        function sortDataRow(array, column) {
            var sortAlgo = (scope.sortAlgorithm && angular.isFunction(scope.sortAlgorithm)) === true ? scope.sortAlgorithm : filter('orderBy');
            if (column) {
                return arrayUtility.sort(array, sortAlgo, column.sortPredicate, column.reverse);
            } else {
                return array;
            }
        }

        function selectDataRow(array, selectionMode, index, select) {

            var dataRow;

            if ((!angular.isArray(array)) || (selectionMode !== 'multiple' && selectionMode !== 'single')) {
                return;
            }

            if (index >= 0 && index < array.length) {
                dataRow = array[index];
                if (selectionMode === 'single') {
                    //unselect all the others
                    for (var i = 0, l = array.length; i < l; i++) {
                        array[i].isSelected = false;
                    }
                    dataRow.isSelected = select;
                } else if (selectionMode === 'multiple') {
                    dataRow.isSelected = select;
                }
            }
        }

        /**
         * set the config (config parameters will be available through scope
         * @param config
         */
        this.setGlobalConfig = function (config) {
            angular.extend(scope, defaultConfig, config);
        };

        /**
         * change the current page displayed
         * @param page
         */
        this.changePage = function (page) {
            if (angular.isNumber(page.page)) {
                scope.currentPage = page.page;
                this.pipe();
            }
        };

        /**
         * set column as the column used to sort the data (if it is already the case, it will change the reverse value)
         * @method sortBy
         * @param column
         */
        this.sortBy = function (column) {
            var index = scope.columns.indexOf(column);
            if (index !== -1) {
                if (column.isSortable === true) {
                    // reset the last column used
                    if (lastColumnSort && lastColumnSort !== column) {
                        lastColumnSort.reverse = 'none';
                    }

                    column.sortPredicate = column.sortPredicate || column.map;
                    column.reverse = column.reverse !== true;
                    lastColumnSort = column;
                }
            }

            this.pipe();
        };

        /**
         * set the filter predicate used for searching
         * @param input
         * @param column
         */
        this.search = function (input, column) {

            //update column and global predicate
            if (column && scope.columns.indexOf(column) !== -1) {
                predicate.$ = '';
                column.filterPredicate = input;
            } else {
                for (var j = 0, l = scope.columns.length; j < l; j++) {
                    scope.columns[j].filterPredicate = '';
                }
                predicate.$ = input;
            }

            for (var j = 0, l = scope.columns.length; j < l; j++) {
                predicate[scope.columns[j].map] = scope.columns[j].filterPredicate;
            }
            this.pipe();

        };

        /**
         * combine sort, search and limitTo operations on an array,
         * @param array
         * @returns Array, an array result of the operations on input array
         */
        this.pipe = function () {
            //use the scope and private data to build a request :
            // here the content of a post request, but can be an url, ... depends on the server API
            var postData = {
                orderBy: lastColumnSort || null,
                filter: predicate,
                page: scope.currentPage || 1,
                numberOfItems: scope.numberOfItems || 10
            };

            log.log(JSON.stringify(postData));

            http.post('dummyServlet/dont/care/about/url', postData).success(function (res) {
                    scope.displayedCollection = res;
                });
        };

        /*////////////
         Column API
         ///////////*/


        /**
         * insert a new column in scope.collection at index or push at the end if no index
         * @param columnConfig column configuration used to instantiate the new Column
         * @param index where to insert the column (at the end if not specified)
         */
        this.insertColumn = function (columnConfig, index) {
            var column = new Column(columnConfig);
            arrayUtility.insertAt(scope.columns, index, column);
        };

        /**
         * remove the column at columnIndex from scope.columns
         * @param columnIndex index of the column to be removed
         */
        this.removeColumn = function (columnIndex) {
            arrayUtility.removeAt(scope.columns, columnIndex);
        };

        /**
         * move column located at oldIndex to the newIndex in scope.columns
         * @param oldIndex index of the column before it is moved
         * @param newIndex index of the column after the column is moved
         */
        this.moveColumn = function (oldIndex, newIndex) {
            arrayUtility.moveAt(scope.columns, oldIndex, newIndex);
        };


        /*///////////
         ROW API
         */

        /**
         * select or unselect the item of the displayedCollection with the selection mode set in the scope
         * @param dataRow
         */
        this.toggleSelection = function (dataRow) {
            var index = scope.displayedCollection.indexOf(dataRow);
            if (index !== -1) {
                selectDataRow(scope.displayedCollection, scope.selectionMode, index, dataRow.isSelected !== true);
            }
        };

        /**
         * select/unselect all the currently displayed rows
         * @param value if true select, else unselect
         */
        this.toggleSelectionAll = function (value) {
            var i = 0,
                l = scope.displayedCollection.length;

            if (scope.selectionMode !== 'multiple') {
                return;
            }
            for (; i < l; i++) {
                selectDataRow(scope.displayedCollection, scope.selectionMode, i, value === true);
            }
        };

        /**
         * remove the item at index rowIndex from the displayed collection
         * @param rowIndex
         * @returns {*} item just removed or undefined
         */
        this.removeDataRow = function (rowIndex) {
            var toRemove = arrayUtility.removeAt(scope.displayedCollection, rowIndex);
        };

        /**
         * move an item from oldIndex to newIndex in displayedCollection
         * @param oldIndex
         * @param newIndex
         */
        this.moveDataRow = function (oldIndex, newIndex) {
            arrayUtility.moveAt(scope.displayedCollection, oldIndex, newIndex);
        };
    }]);


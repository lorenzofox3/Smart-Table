ng.module('smart-table')
    .controller('stTableController', ['$scope', '$parse', '$filter', '$attrs', function StTableController($scope, $parse, $filter, $attrs) {
        var propertyName = $attrs.stTable;
        var displayGetter = $parse(propertyName);
        var displaySetter = displayGetter.assign;
        var safeGetter;
        var orderBy = $filter('orderBy');
        var filter = $filter('filter');
        var safeCopy = copyRefs(displayGetter($scope));
        var tableState = {
            sort: {},
            filters: {},
            pagination: {
                start: 0
            }
        };
        var pipeAfterSafeCopy = true;
        var ctrl = this;
        var lastSelected;

        function copyRefs(src) {
            return [].concat(src);
        }

        function updateSafeCopy() {
            safeCopy = copyRefs(safeGetter($scope));
            if (pipeAfterSafeCopy === true) {
                ctrl.pipe();
            }
        }

        if ($attrs.stSafeSrc) {
            safeGetter = $parse($attrs.stSafeSrc);
            $scope.$watch(function () {
                var safeSrc = safeGetter($scope);
                return safeSrc ? safeSrc.length : 0;

            }, function (newValue, oldValue) {
                if (newValue !== safeCopy.length) {
                    updateSafeCopy();
                }
            });
            $scope.$watch(function () {
                return safeGetter($scope);
            }, function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    updateSafeCopy();
                }
            });
        }

        /**
         * sort the rows
         * @param {Function | String} predicate - function or string which will be used as predicate for the sorting
         * @param [reverse] - if you want to reverse the order
         */
        this.sortBy = function sortBy(predicate, reverse) {
            tableState.sort.predicate = predicate;
            tableState.sort.reverse = reverse === true;
            tableState.pagination.start = 0;
            this.pipe();
        };

        /**
         * Register a filter
         * @param {String} name - name of filter
         * @param {function(actual, expected)|true|undefined} comparator Comparator which is used in determining if the
         *     expected value (from the filter expression) and actual value (from the object in the array) should be
         *     considered a match. See also https://docs.angularjs.org/api/ng/filter/filter
         * @returns {Object} - filter object with predicateObject and comparator.
         */
        this.registerFilter = function(name, comparator) {
            if (tableState.filters===undefined) {
                tableState.filters = {};
            }
            var filter = tableState.filters[name];
            if (filter===undefined) {
                filter = {
                    comparator: comparator,
                    predicateObject: {}
                };
                tableState.filters[name] = filter;
            }
            return filter;
        };

        /**
         * search matching rows
         * @deprecated this method is only meant for backwards compatibility.
         * @param {String} input - the input string
         * @param {String} [predicate] - the property name against you want to check the match, otherwise it will search on all properties
         */
        this.search = function search(input, predicate) {
            var searchFilter = this.registerFilter('search'); // make sure 'search' filter exists, get copy if already registered.
            this.applyFilter(input, predicate, searchFilter);
        };

        /**
         * apply filter to row data
         * @param {String} input - the input string
         * @param {String} predicate - the property name against you want to check the match, otherwise it will search on all properties
         * @param {Object} filter - the filter that is going to be applied
         */
        this.applyFilter = function(input, predicate, filter) {
            var prop = predicate || '$';
            filter.predicateObject[prop] = input;
            // to avoid to filter out null value
            if (input===undefined || input===null || input==='') {
                delete filter.predicateObject[prop];
            }
            tableState.pagination.start = 0;
            this.pipe();
        };

        /**
         * this will chain the operations of sorting and filtering based on the current table state (sort options, filtering, ect)
         */
        this.pipe = function pipe() {
            var pagination = tableState.pagination;

            var filtered = safeCopy;
            angular.forEach(tableState.filters, function(filterObj) {
                var predicateObject = filterObj.predicateObject;
                if (predicateObject) {
                    filtered = filter(filtered, predicateObject, filterObj.comparator);
                }
            });

            if (tableState.sort.predicate) {
                filtered = orderBy(filtered, tableState.sort.predicate, tableState.sort.reverse);
            }
            if (pagination.number !== undefined) {
                pagination.numberOfPages = filtered.length > 0 ? Math.ceil(filtered.length / pagination.number) : 1;
                pagination.start = pagination.start >= filtered.length ? (pagination.numberOfPages - 1) * pagination.number : pagination.start;
                filtered = filtered.slice(pagination.start, pagination.start + pagination.number);
            }
            displaySetter($scope, filtered);
        };

        /**
         * select a dataRow (it will add the attribute isSelected to the row object)
         * @param {Object} row - the row to select
         * @param {String} [mode] - "single" or "multiple" (multiple by default)
         */
        this.select = function select(row, mode) {
            var rows = safeCopy;
            var index = rows.indexOf(row);
            if (index !== -1) {
                if (mode === 'single') {
                    row.isSelected = row.isSelected !== true;
                    if (lastSelected) {
                        lastSelected.isSelected = false;
                    }
                    lastSelected = row.isSelected === true ? row : undefined;
                } else {
                    rows[index].isSelected = !rows[index].isSelected;
                }
            }
        };

        /**
         * take a slice of the current sorted/filtered collection (pagination)
         *
         * @param {Number} start - start index of the slice
         * @param {Number} number - the number of item in the slice
         */
        this.slice = function splice(start, number) {
            tableState.pagination.start = start;
            tableState.pagination.number = number;
            this.pipe();
        };

        /**
         * return the current state of the table
         * @returns {{sort: {}, search: {}, filters: {}, pagination: {start: number}}}
         */
        this.tableState = function getTableState() {

            // for backwards compatibility, make sure tableState.search exists.
            tableState.search = tableState.filters.search ? tableState.filters.search : {};

            return tableState;
        };

        /**
         * Use a different filter function than the angular FilterFilter
         * @param filterName the name under which the custom filter is registered
         */
        this.setFilterFunction = function setFilterFunction(filterName) {
            filter = $filter(filterName);
        };

        /**
         *User a different function than the angular orderBy
         * @param sortFunctionName the name under which the custom order function is registered
         */
        this.setSortFunction = function setSortFunction(sortFunctionName) {
            orderBy = $filter(sortFunctionName);
        };

        /**
         * Usually when the safe copy is updated the pipe function is called.
         * Calling this method will prevent it, which is something required when using a custom pipe function
         */
        this.preventPipeOnWatch = function preventPipe() {
            pipeAfterSafeCopy = false;
        };
    }])
    .directive('stTable', function () {
        return {
            restrict: 'A',
            controller: 'stTableController',
            link: function (scope, element, attr, ctrl) {

                if (attr.stSetFilter) {
                    ctrl.setFilterFunction(attr.stSetFilter);
                }

                if (attr.stSetSort) {
                    ctrl.setSortFunction(attr.stSetSort);
                }
            }
        };
    });

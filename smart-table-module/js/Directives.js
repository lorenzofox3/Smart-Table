/* Directives */
angular.module('smartTable.directives', ['smartTable.templateUrlList', 'smartTable.templates'])
    .directive('smartTable', ['templateUrlList', 'DefaultTableConfiguration', function (templateList, defaultConfig) {
        return {
            restrict: 'E',
            scope: {
                columnCollection: '=columns',
                dataCollection: '=rows',
                config: '='
            },
            replace: 'true',
            templateUrl: templateList.smartTable,
            controller: 'TableCtrl',
            link: function (scope, element, attr, ctrl) {

                var templateObject;

                scope.$watch('config', function (config) {
                    var newConfig = angular.extend({}, defaultConfig, config),
                        length = scope.columns !== undefined ? scope.columns.length : 0;

                    ctrl.setGlobalConfig(newConfig);

                    //remove the checkbox column if needed
                    if (newConfig.selectionMode !== 'multiple' || newConfig.displaySelectionCheckbox !== true) {
                        for (var i = length - 1; i >= 0; i--) {
                            if (scope.columns[i].isSelectionColumn === true) {
                                ctrl.removeColumn(i);
                            }
                        }
                    } else {
                        //add selection box column if required
                        ctrl.insertColumn({cellTemplateUrl: templateList.selectionCheckbox, headerTemplateUrl: templateList.selectAllCheckbox, isSelectionColumn: true}, 0);
                    }
                }, true);

                //insert columns from column config
                //TODO add a way to clean all columns
                scope.$watch('columnCollection', function (oldValue, newValue) {
                    if (scope.columnCollection) {
                        for (var i = 0, l = scope.columnCollection.length; i < l; i++) {
                            ctrl.insertColumn(scope.columnCollection[i]);
                        }
                    } else {
                        //or guess data Structure
                        if (scope.dataCollection && scope.dataCollection.length > 0) {
                            templateObject = scope.dataCollection[0];
                            angular.forEach(templateObject, function (value, key) {
                                if (key[0] != '$') {
                                    ctrl.insertColumn({label: key, map: key});
                                }
                            });
                        }
                    }
                }, true);

                //if item are added or removed into the data model from outside the grid
                scope.$watch('dataCollection.length', function (oldValue, newValue) {
                    if (oldValue !== newValue) {
                        ctrl.sortBy();//it will trigger the refresh... some hack ?
                    }
                });

            }
        };
    }])
    //just to be able to select the row
    .directive('smartTableDataRow', function () {

        return {
            require: '^smartTable',
            restrict: 'C',
            link: function (scope, element, attr, ctrl) {

                element.bind('click', function () {
                    scope.$apply(function () {
                        ctrl.toggleSelection(scope.dataRow);
                    })
                });
            }
        };
    })
    //header cell with sorting functionality or put a checkbox if this column is a selection column
    .directive('smartTableHeaderCell',function () {
        return {
            restrict: 'C',
            require: '^smartTable',
            link: function (scope, element, attr, ctrl) {
                element.bind('click', function () {
                    scope.$apply(function () {
                        ctrl.sortBy(scope.column);
                    });
                })
            }
        };
    }).directive('smartTableSelectAll', function () {
        return {
            restrict: 'C',
            require: '^smartTable',
            scope: {},
            link: function (scope, element, attr, ctrl) {
                scope.isChecked = false;
                scope.$watch('isChecked', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        ctrl.toggleSelectionAll(newValue);
                    }
                });
            }
        };
    })
    //credit to Valentyn shybanov : http://stackoverflow.com/questions/14544741/angularjs-directive-to-stoppropagation
    .directive('stopEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind(attr.stopEvent, function (e) {
                    e.stopPropagation();
                });
            }
        }
    })
    //the global filter
    .directive('smartTableGlobalSearch', ['templateUrlList', function (templateList) {
        return {
            restrict: 'C',
            require: '^smartTable',
            scope: {
                columnSpan: '@'
            },
            templateUrl: templateList.smartTableGlobalSearch,
            replace: false,
            link: function (scope, element, attr, ctrl) {

                scope.searchValue = '';

                scope.$watch('searchValue', function (value) {
                    //todo perf improvement only filter on blur ?
                    ctrl.search(value);
                });
            }
        }
    }])
    //a customisable cell (see templateUrl) and editable
    //TODO check with the ng-include strategy
    .directive('smartTableDataCell', ['$filter', '$http', '$templateCache', '$compile', function (filter, http, templateCache, compile) {
        return {
            restrict: 'C',
            link: function (scope, element) {
                var
                    column = scope.column,
                    row = scope.dataRow,
                    format = filter('format'),
                    childScope;

                //can be useful for child directives
                scope.formatedValue = format(row[column.map], column.formatFunction, column.formatParameter);

                function defaultContent() {
                    //clear content
                    if (column.isEditable) {
                        element.html('<editable-cell row="dataRow" column="column" type="column.type" value="dataRow[column.map]"></editable-cell>');
                        compile(element.contents())(scope);
                    } else {
                        element.text(scope.formatedValue);
                    }
                }

                scope.$watch('column.cellTemplateUrl', function (value) {
                    if (value) {
                        //we have to load the template (and cache it) : a kind of ngInclude
                        http.get(value, {cache: templateCache}).success(function (response) {
                            //create a scope
                            childScope = scope.$new();
                            //compile the element with its new content and new scope
                            element.html(response);
                            compile(element.contents())(childScope);
                        }).error(defaultContent);

                    } else {
                        defaultContent();
                    }
                });

                scope.$watch('column.cellTemplate', function (value) {
                    if (value) {
                        //create a scope
                        childScope = scope.$new();
                        //compile the element with its new content and new scope
                        element.html(value);
                        compile(element.contents())(childScope);
                    }
                });
            }
        };
    }])
    //directive that allows type to be bound in input
    .directive('inputType', ['$parse', function (parse) {
        return {
            restrict: 'A',
            priority: 1,
            link: function (scope, ielement, iattr) {
                //force the type to be set before inputDirective is called
                var getter = parse(iattr.type),
                    type = getter(scope);
                iattr.$set('type', type);
            }
        };
    }])
    //an editable content in the context of a cell (see row, column)
    .directive('editableCell', ['templateUrlList', function (templateList) {
        return {
            restrict: 'E',
            require: '^smartTable',
            templateUrl: templateList.editableCell,
            scope: {
                row: '=',
                column: '=',
                type: '='
            },
            replace: true,
            link: function (scope, element, attrs, ctrl) {
                var form = angular.element(element.children()[1]),
                    input = angular.element(form.children()[0]);

                //init values
                scope.isEditMode = false;

                scope.submit = function () {
                    //update model if valid
                    if (scope.myForm.$valid === true) {
                        scope.row[scope.column.map] = scope.value;
                        ctrl.sortBy();//it will trigger the refresh...  (ie it will sort, filter, etc with the new value)
                    }
                    scope.isEditMode = false;
                };

                scope.toggleEditMode = function () {
                    scope.value = scope.row[scope.column.map];
                    scope.isEditMode = true;
                };

                scope.$watch('isEditMode', function (newValue, oldValue) {
                    if (newValue) {
                        input[0].select();
                        input[0].focus();
                    }
                });

                input.bind('blur', function () {
                    scope.$apply(function () {
                        scope.submit();
                    });
                });
            }
        };
    }]);


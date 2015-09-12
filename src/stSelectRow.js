ng.module('smart-table')
  .directive('stSelectRow', ['stConfig', function (stConfig) {
    return {
      restrict: 'A',
      require: '^stTable',
      scope: {
        row: '=stSelectRow',
        rowsSelected: '=?stSelectRowsSelected'
      },
      link: function (scope, element, attr, ctrl) {
        var mode = attr.stSelectMode || stConfig.select.mode;
        element.bind('click', function () {
          scope.$apply(function () {
            ctrl.select(scope.row, mode);
          });
        });

        scope.$watch('row.isSelected', function (newValue) {
          if (newValue === true) {
            element.addClass(stConfig.select.selectedClass);
            scope.rowsSelected && scope.rowsSelected.push(scope.row);
          } else {
            element.removeClass(stConfig.select.selectedClass);
            //Care for IE8, it doesn't support indexOf. One possible solution can be define it in the Array prototype so it will be available in ie8 
            scope.rowsSelected && scope.rowsSelected.indexOf(scope.row) !== -1 && scope.rowsSelected.splice(scope.rowsSelected.indexOf(scope.row), 1);
          }
        });
      }
    };
  }]);

ng.module('smart-table')
  .directive('stSelectRow', function () {

    var previous;

    return {
      restrict: 'A',
      require: '^stTable',
      scope: {
        row: '=stSelectRow'
      },
      link: function (scope, element, attr, ctrl) {
        var mode = attr.stSelectMode || 'single';


        element.bind('click', function ($event) {


          scope.$watch(ctrl.tableState, function (newValue, oldValue) {
            if (newValue !== oldValue) {
              previous = undefined;
            }
          }, true);

          scope.$apply(function () {

            if ($event.shiftKey && mode === 'multiple') {
              ctrl.selectRange(previous, scope.row);
            } else {
              ctrl.select(scope.row, mode);
            }

            previous = scope.row.isSelected ? scope.row : undefined;

          });
        });
        scope.$watch('row.isSelected', function (newValue, oldValue) {
          if (newValue === true) {
            element.addClass('st-selected');
          } else {
            element.removeClass('st-selected');
          }
        });
      }
    };
  });

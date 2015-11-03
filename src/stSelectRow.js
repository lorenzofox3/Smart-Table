ng.module('smart-table')
  .directive('stSelectRow', ['stConfig', '$document', function (stConfig, $document) {

    var pressed = {
      ctrl: false,
      shift: false,
      all: function () {
        return this.ctrl && this.shift;
      }
    };

    $document.bind("keydown keyup", function (event) {
      pressed.ctrl = event.ctrlKey;
      pressed.shift = event.shiftKey;
    });

    return {
      restrict: 'A',
      require: '^stTable',
      scope: {
        row: '=stSelectRow'
      },
      link: function (scope, element, attr, ctrl) {
        var mode = attr.stSelectMode || stConfig.select.mode;
        element.bind('click', function () {
          scope.$apply(function () {
            ctrl.select(scope.row, mode, pressed);
          });
        });

        scope.$watch('row.isSelected', function (newValue) {
          if (newValue === true) {
            element.addClass(stConfig.select.selectedClass);
          } else {
            element.removeClass(stConfig.select.selectedClass);
          }
        });
      }
    };
  }]);

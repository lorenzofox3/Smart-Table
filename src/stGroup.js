ng.module('smart-table')
  .directive('stGroup', ['stConfig', '$parse', function (stConfig, $parse) {
    return {
      restrict: 'A',
      require: '^stTable',
      link: function (scope, element, attr, ctrl) {
        var predicate = attr.stGroup;

        //view --> table state
        function group() {
          ctrl.groupBy(predicate);
        }

        if(predicate){
          group();
        }
      }
    };
  }]);

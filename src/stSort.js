ng.module('smart-table')
  .directive('stSort', ['stConfig', '$parse', '$timeout', function (stConfig, $parse, $timeout) {
    return {
      restrict: 'A',
      require: '^stTable',
      link: function (scope, element, attr, ctrl) {

        var predicate = attr.stSort;
        var getter = $parse(predicate);
        var index = 0;
        var classAscent = attr.stClassAscent || stConfig.sort.ascentClass;
        var classDescent = attr.stClassDescent || stConfig.sort.descentClass;
        var stateClasses = [classAscent, classDescent];
        var sortDefault;
        var skipNatural = attr.stSkipNatural !== undefined ? (attr.stSkipNatural !== "" ? attr.stSkipNatural : true) : stConfig.sort.skipNatural;
        var descendingFirst = attr.stDescendingFirst !== undefined ? (attr.stDescendingFirst !== "" ? attr.stDescendingFirst : true) : stConfig.sort.descendingFirst;
        var promise = null;
        var throttle = attr.stDelay || stConfig.sort.delay;

        if (attr.stSortDefault !== undefined) {
          if(attr.stSortDefault !== "") {
            var evaluated = scope.$eval(attr.stSortDefault)
            sortDefault = evaluated !== undefined ? evaluated : attr.stSortDefault;
          } else {
            sortDefault = true;
          }
        }

        //view --> table state
        function sort () {
          if (descendingFirst) {
            index = index === 0 ? 2 : index - 1;
          } else {
            index++;
          }

          var func;
          predicate = ng.isFunction(getter(scope)) || ng.isArray(getter(scope)) ? getter(scope) : attr.stSort;
          if (index % 3 === 0 && !!skipNatural !== true) {
            //manual reset
            index = 0;
            ctrl.tableState().sort = {};
            ctrl.tableState().pagination.start = 0;
            func = ctrl.pipe.bind(ctrl);
          } else {
            func = ctrl.sortBy.bind(ctrl, predicate, index % 2 === 0);
          }
          if (promise !== null) {
            $timeout.cancel(promise);
          }
          if (throttle < 0) {
            func();
          } else {
            promise = $timeout(func, throttle);
          }
        }

        element.bind('click', function sortClick () {
          if (predicate) {
            scope.$apply(sort);
          }
        });

        if (sortDefault) {
          index = sortDefault === 'reverse' ? 1 : 0;
          sort();
        }

        //table state --> view
        scope.$watch(function () {
          return ctrl.tableState().sort;
        }, function (newValue) {
          if (newValue.predicate !== predicate) {
            index = 0;
            element
              .removeClass(classAscent)
              .removeClass(classDescent);
          } else {
            index = newValue.reverse === true ? 2 : 1;
            element
              .removeClass(stateClasses[index % 2])
              .addClass(stateClasses[index - 1]);
          }
        }, true);
      }
    };
  }]);

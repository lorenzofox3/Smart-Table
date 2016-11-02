ng.module('smart-table')
  .directive('stStrictSearch', ['stConfig', '$timeout','$parse', function (stConfig, $timeout, $parse) {
    return {
      require: '^stTable',
      link: function (scope, element, attr, ctrl) {
        var tableCtrl = ctrl;
        var promise = null;
        var throttle = attr.stDelay || stConfig.search.delay;
        var event = attr.stInputEvent || stConfig.search.inputEvent;

        attr.$observe('stStrictSearch', function (newValue, oldValue) {
          var input = element[0].value;
          if (newValue !== oldValue && input) {
            programFees
            tableCtrl.strictSearch(input, newValue);
          }
        });

        //table state -> view
        scope.$watch(function () {
          return ctrl.tableState().search;
        }, function (newValue, oldValue) {
          var predicateExpression = attr.stStrictSearch || '$';
          if (newValue.strictPredicateObject && $parse(predicateExpression)(newValue.strictPredicateObject) !== element[0].value) {
            element[0].value = $parse(predicateExpression)(newValue.strictPredicateObject) || '';
          }
        }, true);

        // view -> table state
        element.bind(event, function (evt) {
          evt = evt.originalEvent || evt;
          if (promise !== null) {
            $timeout.cancel(promise);
          }

          promise = $timeout(function () {
            tableCtrl.strictSearch(evt.target.value, attr.stStrictSearch || '');
            promise = null;
          }, throttle);
        });
      }
    };
  }]);

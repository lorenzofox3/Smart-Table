ng.module('smart-table')
  .directive('stSearch', ['stConfig', '$timeout','$parse', function (stConfig, $timeout, $parse) {
    return {
      require: ['^stTable', '^?ngModel'],
      link: function (scope, element, attr, ctrls) {
        var ctrl = ctrls[0], ngm = ctrls[1];
        var tableCtrl = ctrl;
        var promise = null;
        var throttle = attr.stDelay || stConfig.search.delay;
        var event = attr.stInputEvent || stConfig.search.inputEvent;

        if (ngm){
	        scope.$watch(function () {
				    return ngm.$modelValue;
			    }, function (newValue, oldValue) {
				    if (newValue === oldValue)
					  return;

				    //console.log('no model', ngm, 'new', newValue, 'old', oldValue);
				    if (promise !== null) {
					    $timeout.cancel(promise);
				    }
				
				    promise = $timeout(function () {
					    tableCtrl.search(newValue, attr.stSearch || '');
					    promise = null;
				    }, throttle);
			    });
        } else {
          attr.$observe('stSearch', function (newValue, oldValue) {
            var input = element[0].value;
            if (newValue !== oldValue && input) {
              ctrl.tableState().search = {};
              tableCtrl.search(input, newValue);
            }
          });
  
          //table state -> view
          scope.$watch(function () {
            return ctrl.tableState().search;
          }, function (newValue, oldValue) {
            var predicateExpression = attr.stSearch || '$';
            if (newValue.predicateObject && $parse(predicateExpression)(newValue.predicateObject) !== element[0].value) {
              element[0].value = $parse(predicateExpression)(newValue.predicateObject) || '';
            }
          }, true);
  
          // view -> table state
          element.bind(event, function (evt) {
            evt = evt.originalEvent || evt;
            if (promise !== null) {
              $timeout.cancel(promise);
            }
  
            promise = $timeout(function () {
              tableCtrl.search(evt.target.value, attr.stSearch || '');
              promise = null;
            }, throttle);
          });
        }
    };
  }]);

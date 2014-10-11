(function (ng) {
  'use strict';
  ng.module('smart-table')
    .directive('stSearchSelect', function ($interpolate) {
      return {
        replace: true,
        require: '^stTable',
        scope: {
          predicate: '=?stSearchSelect',
          attrOptions: '=?options',
          selected: '=?value'
        },

        template: function(tElement, tAttrs) {
          var emptyLabel = tAttrs.emptyLabel ? tAttrs.emptyLabel : '';
          var template = '<select ng-model="selected" ng-options="option.value as option.label for option in options">' +
            '<option value="">' + emptyLabel + '</option></select>'
          return template;
        },
        link: function (scope, element, attr, ctrl) {
          var tableCtrl = ctrl;

          if (scope.attrOptions) {
            if (scope.attrOptions.length>0 && (typeof scope.attrOptions[0] === 'object')) {

              // options as array of objects, eg: [{label:'green', value:true}, {label:'red', value:false}]
              scope.options = scope.attrOptions.slice(0); // copy values
            } else {

              // options as simple array, eg: ['apple', 'banana', 'cherry', 'strawberry', 'mango', 'pineapple'];
              scope.options = getOptionObjectsFromArray(scope.attrOptions);
            }
          } else {

            // if not explicitly passed then determine the options by looking at the content of the table.
            scope.options = getOptionObjectsFromArray(ctrl.getUniqueValues(scope.predicate));
          }

          // if a label expression is passed than use this to create custom labels.
          if (attr.label) {
            var strTemplate = attr.label.replace('[[', '{{').replace(']]', '}}');
            var template = $interpolate(strTemplate);
            scope.options.forEach(function(option) {
              option.label = template(option);
            });
          }

          element.on('change', function() {
            tableCtrl.searchSelect(scope.selected, scope.predicate || '');
            scope.$parent.$digest();
          });
        }
      };
    });

  function getOptionObjectsFromArray(options) {
    return options.map(function(val) {
      return {label: val, value: val};
    });
  }
})(angular);

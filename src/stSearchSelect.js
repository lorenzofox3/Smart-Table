(function (ng) {
  'use strict';
  ng.module('smart-table')
    .directive('stSearchSelect', function () {
      return {
        replace: false,
        require: '^stTable',
        scope: {
          predicate: '=?stSearchSelect',
          attrOptions: '=?options'
        },

        template: function(tElement, tAttrs) {
          var emptyLabel = tAttrs.emptyLabel ? tAttrs.emptyLabel : '';
          var labelVar = tAttrs.labelVar ? tAttrs.labelVar : 'item';
          var label = tAttrs.label ? tAttrs.label : '{{' + labelVar + '}}';

          var template =  '<option value="">' + emptyLabel + '</option>' +
            '<option ng-repeat="' + labelVar + ' in options" value="{{' + labelVar + '}}">' + label + '</option>';

          return template;
        },
        link: function (scope, element, attr, ctrl) {
          var tableCtrl = ctrl;

          // if not explicitly passed then determine the options by looking at the content of the table.
          if (scope.attrOptions) {
            scope.options = scope.attrOptions.slice(0); // copy values
          } else {
            scope.options = ctrl.getUniqueValues(scope.predicate);
          }

          element.on('change', function(evt) {
            evt = evt.originalEvent || evt;
            tableCtrl.searchSelect(evt.target.value, scope.predicate || '');
            scope.$parent.$digest();
          });
        }
      };
    });
})(angular);

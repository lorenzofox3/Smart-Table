ng.module("smart-table")
    .directive("stResetSearch", function() {
         return {
                restrict: 'EA',
                require: '^stTable',
                link: function(scope, element, attrs, ctrl) {
                  return element.bind('click', function() {
                    return scope.$apply(function() {
                      var tableState;
                      tableState = ctrl.tableState();
                      tableState.search.predicateObject = {};
                      tableState.pagination.start = 0;
                      return ctrl.pipe();
                    });
                  });
                }
              };
    });

ng.module('smart-table')
  .directive('stPipe', function () {
    return {
      require: 'stTable',
      scope: {
        stPipe: '='
      },
      link: {

        pre: function (scope, element, attrs, ctrl) {
          function initializeCustomPipe(){
            var initialPipe = null;

            return function(pipe, skipPipe){
              if (ng.isFunction(pipe)) {
                ctrl.preventPipeOnWatch();

                if (!initialPipe){
                  initialPipe = ctrl.pipe;
                }

                ctrl.pipe = function () {
                  return pipe(ctrl.tableState(), ctrl);
                };

                if (skipPipe !== true){
                  ctrl.pipe();
                }
              } else if (initialPipe){
                ctrl.pipe = initialPipe;
              }
            };
          }

          var pipeInitializer = initializeCustomPipe();

          pipeInitializer(scope.stPipe, true);

          scope.$watch('stPipe', pipeInitializer);
        },

        post: function (scope, element, attrs, ctrl) {
          ctrl.pipe();
        }
      }
    };
  });

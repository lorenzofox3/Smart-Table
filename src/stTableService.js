ng.module('smart-table')
  .factory('stTableService', function ($q, $timeout) {
    var idCtrlMap = { };
    var waiting   = { };

    return {
      register: function(id, ctrl) {
        idCtrlMap[id] = ctrl;

        if ( waiting[id] ) {
          for ( var index in waiting[id] ) {
            if ( waiting[id].hasOwnProperty(index) ) {
              waiting[id][index].resolve(ctrl);
            }
          }

          delete waiting[id];
        }
      },

      deregister: function(id) {
        delete idCtrlMap[id];
      },

      get: function(id) {
        return idCtrlMap[id];
      },

      waitFor: function(id, timeout) {
        var deferred = $q.defer();

        if ( timeout !== undefined ) {
          $timeout(function() {
            deferred.reject('Timed out waiting for StTableController ' + id);
          }, timeout);
        }

        var registeredController = this.get(id);

        if ( registeredController ) {
          deferred.resolve(registeredController);
        } else if ( waiting[id] ) {
          waiting[id].push(deferred);
        } else {
          waiting[id] = [deferred];
        }

        return deferred.promise;
      }
    };
  });

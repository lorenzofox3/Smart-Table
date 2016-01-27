ng.module('smart-table')
  .factory('stTableService', function () {
    var idCtrlMap = { };

    return {
      register: function(id, ctrl) {
        idCtrlMap[id] = ctrl;
      },

      deregister: function(id) {
        idCtrlMap[id] = undefined;
      },

      get: function(id) {
        return idCtrlMap[id];
      }
    };
  });

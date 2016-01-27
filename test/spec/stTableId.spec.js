describe('stTableId Directive', function () {
  beforeEach(module('smart-table'));

  var compile;
  var rootScope;
  var stTableService;

  it('should register the controller with stTableService', function() {
    var mockStTableService = {
      register: function() { }
    };

    module(function($provide) {
      $provide.value('stTableService', mockStTableService);
    });

    spyOn(mockStTableService, 'register');

    inject(function($compile, $rootScope) {
      var template = '<table st-table="rowCollection" st-table-id="1"></table>';
      $compile(template)($rootScope);
      $rootScope.$apply();

      // first check if it was called with an object at all, to help narrow down debugging
      expect(mockStTableService.register).toHaveBeenCalledWith('1', jasmine.any(Object));

      // then check if it was called with an StTableController-like object
      expect(mockStTableService.register).toHaveBeenCalledWith('1',
        jasmine.objectContaining({
          slice: jasmine.any(Function),
          tableState: jasmine.any(Function)
        }));
    });
  });

  // an integration test for the main use case
  it('should make the table controller available via stTableService', inject(function($compile, $rootScope, stTableService) {
    var template = '<table st-table="rowCollection" st-table-id="1"></table>';
    $compile(template)($rootScope);
    $rootScope.$apply();

    var ctrl = stTableService.get('1');

    expect(typeof ctrl.slice === 'function').toBe(true);
    expect(typeof ctrl.tableState === 'function').toBe(true);
  }));
});

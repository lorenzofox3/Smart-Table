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
      var template = '<table st-table="rowCollection" st-table-id="testId"></table>';
      $compile(template)($rootScope);
      $rootScope.$apply();

      // first check if it was called with an object at all, to help narrow down debugging
      expect(mockStTableService.register).toHaveBeenCalledWith('testId', jasmine.any(Object));

      // then check if it was called with an StTableController-like object
      expect(mockStTableService.register).toHaveBeenCalledWith('testId',
        jasmine.objectContaining({
          slice: jasmine.any(Function),
          tableState: jasmine.any(Function)
        }));
    });
  });

  // an integration test for an important use case
  it('should make the table controller available via stTableService', inject(function($compile, $rootScope, stTableService) {
    var template = '<table st-table="rowCollection" st-table-id="1"></table>';
    $compile(template)($rootScope);
    $rootScope.$apply();

    var ctrl = stTableService.get('1');

    expect(typeof ctrl.slice === 'function').toBe(true);
    expect(typeof ctrl.tableState === 'function').toBe(true);
  }));

  // an integration test for an important use case
  it('should make the table controller available via stTableService when it is instantiated', inject(function($compile, $rootScope, stTableService) {
    var done = false;

    runs(function() {
      var ctrlPromise = stTableService.waitFor('1');

      ctrlPromise.then(function(ctrl) {
        expect(typeof ctrl.slice === 'function').toBe(true);
        expect(typeof ctrl.tableState === 'function').toBe(true);
        done = true;
      });

      var template = '<table st-table="rowCollection" st-table-id="1"></table>';
      $compile(template)($rootScope);
      $rootScope.$apply();
    });

    waitsFor(function() {
      return done;
    });
  }));
});

describe('stTableId Directive', function () {
  beforeEach(module('smart-table'));

  var compile;
  var rootScope;
  var stTableService;

  beforeEach(inject(function ($compile, $rootScope, _stTableService_) {
    compile = $compile;
    rootScope = $rootScope;
    stTableService = _stTableService_;

    rootScope.rowCollection = [
      {name: 'Renard', firstname: 'Laurent', age: 66},
      {name: 'Francoise', firstname: 'Frere', age: 99},
      {name: 'Renard', firstname: 'Olivier', age: 33},
      {name: 'Leponge', firstname: 'Bob', age: 22},
      {name: 'Faivre', firstname: 'Blandine', age: 44}
    ];
  }));

  it('should make the table controller available via stTableService', function() {
      var template = '<table st-table="rowCollection" st-table-id="1"></table>';
      compile(template)(rootScope);
      rootScope.$apply();

      var ctrl = stTableService.get('1');

      expect(typeof ctrl.slice === 'function').toBe(true);
      expect(typeof ctrl.tableState === 'function').toBe(true);
  });
});

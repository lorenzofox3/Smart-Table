describe('stSort Directive', function () {

  var rootScope;
  var scope;
  var element;
  var tableState;

  function hasClass(element, classname) {
    return Array.prototype.indexOf.call(element.classList, classname) !== -1
  }

  function groupTrToModel(trs) {
    return Array.prototype.map.call(trs, function (ele) {
      return {
        key: ele.cells[0].innerHTML
      };
    });
  }

  function rowTrToModel(trs) {
    return Array.prototype.map.call(trs, function (ele) {
      return {
        name: ele.cells[0].innerHTML,
        firstname: ele.cells[1].innerHTML,
        age: +(ele.cells[2].innerHTML)
      };
    });
  }

  //expose table state for tests
  beforeEach(module('smart-table', function ($compileProvider) {
    $compileProvider.directive('dummy', function () {
      return {
        restrict: 'A',
        require: 'stTable',
        link: function (scope, element, attr, ctrl) {
          tableState = ctrl.tableState();
        }
      };
    });
  }));

  describe('customized stConfig', function () {

    beforeEach(inject(function ($compile, $rootScope, stConfig) {
      var oldAscentClass = stConfig.sort.ascentClass;
      var oldDescentClass = stConfig.sort.descentClass;
      stConfig.sort.ascentClass = 'custom-ascent';
      stConfig.sort.descentClass = 'custom-descent';

      rootScope = $rootScope;
      scope = $rootScope.$new();
      scope.rowCollection = [
        {name: 'Renard', firstname: 'Laurent', age: 66},
        {name: 'Francoise', firstname: 'Frere', age: 99},
        {name: 'Renard', firstname: 'Olivier', age: 33},
        {name: 'Leponge', firstname: 'Bob', age: 22},
        {name: 'Faivre', firstname: 'Blandine', age: 44}
      ];
      scope.getters = {
        age: function ageGetter(row) {
          return row.name.length;
        },
        name: function nameGetter(row) {
          return row.name.length;
        }
      };

      var template = '<table dummy="" st-table="rowCollection">' +
        '<thead>' +
        '<tr><th st-sort="name">name</th>' +
        '<th st-sort="firstname">firstname</th>' +
        '<th st-sort="getters.age">age</th>' +
        '<th st-sort="getters.name">age</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr class="test-row" ng-repeat="row in rowCollection">' +
        '<td>{{row.name}}</td>' +
        '<td>{{row.firstname}}</td>' +
        '<td>{{row.age}}</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>';

      element = $compile(template)(scope);
      scope.$apply();


      stConfig.sort.ascentClass = oldAscentClass;
      stConfig.sort.descentClass = oldDescentClass;
    }));

    it('should customize classes for sorting', function () {
      var ths = element.find('th');
      angular.element(ths[1]).triggerHandler('click');
      expect(hasClass(ths[1], 'custom-ascent')).toBe(true);
      expect(hasClass(ths[1], 'custom-descent')).toBe(false);
    });
  });

  describe('group ', function () {

    beforeEach(inject(function ($compile, $rootScope) {

      rootScope = $rootScope;
      scope = $rootScope.$new();
      scope.rowCollection = [
        {name: 'Renard', firstname: 'Laurent', age: 66},
        {name: 'Francoise', firstname: 'Frere', age: 99},
        {name: 'Renard', firstname: 'Olivier', age: 33},
        {name: 'Leponge', firstname: 'Bob', age: 22},
        {name: 'Faivre', firstname: 'Blandine', age: 44}
      ];

      var template = '<table dummy="" st-table="rowCollection" st-group="name">' +
        '<thead>' +
        '<tr><th>name</th>' +
        '<th>firstname</th>' +
        '<th>age</th>' +
        '<th>age</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr class="group-row" ng-repeat-start="group in rowCollection">' +
        '<td colspan="3">{{group.key}}</td>' +
        '</tr>' +
        '<tr class="test-row" ng-repeat="row in group.items">' +
        '<td>{{row.name}}</td>' +
        '<td>{{row.firstname}}</td>' +
        '<td>{{row.age}}</td>' +
        '</tr>' +
        '<tr ng-repeat-end ng-if="false"></tr>'
        '</tbody>' +
        '</table>';

      element = $compile(template)(scope);
      scope.$apply();
    }));

    it('should group by predicate', function () {
      var group = groupTrToModel(element.find('tr.group-row'));
      expect(group).toEqual([
        {key: 'Renard'},
        {key: 'Francoise'},
        {key: 'Leponge'},
        {key: 'Faivre'}
      ]);
      var actual = rowTrToModel(element.find('tr.test-row'));
      expect(actual).toEqual([
        {name: 'Renard', firstname: 'Laurent', age: 66},
        {name: 'Renard', firstname: 'Olivier', age: 33},
        {name: 'Francoise', firstname: 'Frere', age: 99},
        {name: 'Leponge', firstname: 'Bob', age: 22},
        {name: 'Faivre', firstname: 'Blandine', age: 44}
      ]);
    });
  });
});
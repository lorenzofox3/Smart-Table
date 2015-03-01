describe('stPagination directive', function () {

  var controllerMock = {
    tableState: function () {
      return tableState
    },

    slice: function (start, number) {
      tableState.pagination.start = start;
      tableState.pagination.number = number;
    }
  };

  function ControllerMock() {
    this.tableState = controllerMock.tableState;
    this.slice = controllerMock.slice;
  }

  var tableState = {
    sort: {},
    search: {},
    pagination: {start: 0}
  };
  var compile;

  function getPages() {
    return Array.prototype.map.call(element.find('LI'), function (val) {
      return angular.element(val);
    });
  }


  function hasClass(element, classname) {
    return Array.prototype.indexOf.call(element.classList, classname) !== -1
  }

  function getNextButton() {
    return angular.element(element.find('button#next'));
  }

  function getPrevButton() {
    return angular.element(element.find('button#previous'));
  }

  var rootScope;
  var element;

  beforeEach(module('smart-table', function ($controllerProvider) {
    $controllerProvider.register('stTableController', ControllerMock);
  }));

  beforeEach(inject(function ($compile, $rootScope, $templateCache) {
    rootScope = $rootScope;
    compile = $compile;

    rootScope.rowCollection = [
      {name: 'Renard', firstname: 'Laurent', age: 66},
      {name: 'Francoise', firstname: 'Frere', age: 99},
      {name: 'Renard', firstname: 'Olivier', age: 33},
      {name: 'Leponge', firstname: 'Bob', age: 22},
      {name: 'Faivre', firstname: 'Blandine', age: 44}
    ];
  }));

  describe('init', function () {
    it('should call for the first page on init', function () {
      spyOn(controllerMock, 'slice');
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-items-by-page="5" st-pagination=""></td></tr></tfoot></table>';
      compile(template)(rootScope);
      rootScope.$apply();
      element = angular.element(document.getElementById('pagination'));
      expect(controllerMock.slice).toHaveBeenCalledWith(0, 5);
    });

    it('should call for the first page with 10 as default value for item by page', function () {
      spyOn(controllerMock, 'slice');
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      compile(template)(rootScope);
      rootScope.$apply();
      element = angular.element(document.getElementById('pagination'));
      expect(controllerMock.slice).toHaveBeenCalledWith(0, 10);
    });
  });

  describe('template', function () {
    var templateCache;
    beforeEach(inject(function ($templateCache) {
      templateCache = $templateCache;
    }));

    it('should load custom template from attribute "st-template"', function () {
      templateCache.put('custom_template.html', '<div id="custom_id"></div>');

      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination="" st-template="custom_template.html"></td></tr></tfoot></table>';
      element = compile(template)(rootScope);
      rootScope.$apply();

      expect(angular.element(element.find('div#custom_id')).length).toBe(1);
    });
  });

  describe('draw pages', function () {

    it('it should draw the pages based on table state using 5 as default value for displayed pages number and center it on the active page', function () {
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);
      rootScope.$apply();

      tableState.pagination = {
        start: 35,
        numberOfPages: 12,
        number: 10
      };

      rootScope.$apply();

      var pages = getPages();

      expect(pages.length).toBe(5);

      expect(pages[0].text()).toEqual('2');
      expect(pages[1].text()).toEqual('3');
      expect(pages[2].text()).toEqual('4');
      expect(pages[3].text()).toEqual('5');
      expect(pages[4].text()).toEqual('6');

      var active = pages.filter(function (value) {
        return hasClass(value[0], 'active');
      });

      expect(active.length).toBe(1);
      expect(active[0].text()).toEqual('4');

    });

    it('it should draw the pages based on table state using provided value for displayed pages', function () {
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-displayed-pages="7" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination = {
        start: 35,
        numberOfPages: 12,
        number: 10
      };

      rootScope.$apply();

      var pages = getPages();

      expect(pages.length).toBe(7);

      expect(pages[0].text()).toEqual('1');
      expect(pages[1].text()).toEqual('2');
      expect(pages[2].text()).toEqual('3');
      expect(pages[3].text()).toEqual('4');
      expect(pages[4].text()).toEqual('5');
      expect(pages[5].text()).toEqual('6');
      expect(pages[6].text()).toEqual('7');

      var active = pages.filter(function (value) {
        return hasClass(value[0], 'active');
      });

      expect(active.length).toBe(1);
      expect(active[0].text()).toEqual('4');
    });

    it('should support string for number and displayed page as this var can be bound', function () {
      rootScope.itemsByPage = "12";
      rootScope.displayedPages = "6";
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-items-by-page="itemsByPage" st-displayed-pages="displayedPages" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination.start = 12;
      tableState.pagination.numberOfPages = 12;

      rootScope.$apply();

      var pages = getPages();

      expect(pages.length).toBe(6);

      expect(pages[0].text()).toEqual('1');
      expect(pages[1].text()).toEqual('2');
      expect(pages[2].text()).toEqual('3');
      expect(pages[3].text()).toEqual('4');
      expect(pages[4].text()).toEqual('5');
      expect(pages[5].text()).toEqual('6');

      var active = pages.filter(function (value) {
        return hasClass(value[0], 'active');
      });

      expect(active.length).toBe(1);
      expect(active[0].text()).toEqual('2');
    });

    it('it should not center when reaching higher edge', function () {
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination = {
        start: 105,
        numberOfPages: 12,
        number: 10
      };

      rootScope.$apply();


      var pages = getPages();

      expect(pages.length).toBe(5);

      expect(pages[0].text()).toEqual('8');
      expect(pages[1].text()).toEqual('9');
      expect(pages[2].text()).toEqual('10');
      expect(pages[3].text()).toEqual('11');
      expect(pages[4].text()).toEqual('12');

      var active = pages.filter(function (value) {
        return hasClass(value[0], 'active');
      });

      expect(active.length).toBe(1);
      expect(active[0].text()).toEqual('11');

    });

    it('it should not center when reaching lower edge', function () {
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination = {
        start: 5,
        numberOfPages: 12,
        number: 10
      };

      rootScope.$apply();


      var pages = getPages();

      expect(pages.length).toBe(5);

      expect(pages[0].text()).toEqual('1');
      expect(pages[1].text()).toEqual('2');
      expect(pages[2].text()).toEqual('3');
      expect(pages[3].text()).toEqual('4');
      expect(pages[4].text()).toEqual('5');

      var active = pages.filter(function (value) {
        return hasClass(value[0], 'active');
      });

      expect(active.length).toBe(1);
      expect(active[0].text()).toEqual('1');

    });

    it('it should limit the number of page to available pages', function () {
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination = {
        start: 12,
        numberOfPages: 3,
        number: 10
      };

      rootScope.$apply();


      var pages = getPages();

      expect(pages.length).toBe(3);

      expect(pages[0].text()).toEqual('1');
      expect(pages[1].text()).toEqual('2');
      expect(pages[2].text()).toEqual('3');

      var active = pages.filter(function (value) {
        return hasClass(value[0], 'active');
      });

      expect(active.length).toBe(1);
      expect(active[0].text()).toEqual('2');
    });

    it('it should remove pagination when there is less than two page', function () {
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination = {
        start: 5,
        numberOfPages: 1,
        number: 10
      };

      rootScope.$apply();

      var pages = getPages();

      expect(pages.length).toBe(0);
    });

    it('it should draw next page button when current page is not the last', function () {
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination = {
        start: 5,
        numberOfPages: 12,
        number: 10
      };

      rootScope.$apply();

      var next = getNextButton();

      expect(next.length).toBe(1);
      expect(next.text()).toEqual('>');
    });

    it('it should not draw next page button when current page is the last', function () {
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination = {
        start: 115,
        numberOfPages: 12,
        number: 10
      };

      rootScope.$apply();

      var next = getNextButton();

      expect(next.length).toBe(0);
    });

    it('it should draw previous page button when current page is not the first', function () {
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination = {
        start: 115,
        numberOfPages: 12,
        number: 10
      };

      rootScope.$apply();

      var prev = getPrevButton();

      expect(prev.length).toBe(1);
      expect(prev.text()).toEqual('<');
    });

    it('it should not draw previous page button when current page is the first', function () {
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination = {
        start: 5,
        numberOfPages: 12,
        number: 10
      };

      rootScope.$apply();

      var prev = getPrevButton();

      expect(prev.length).toBe(0);
    });

    it('it should draw previous page and next page buttons when current page between the first and last', function () {
      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination = {
        start: 35,
        numberOfPages: 12,
        number: 10
      };

      rootScope.$apply();

      var prev = getPrevButton();

      var next = getNextButton();
      expect(prev.length).toBe(1);
      expect(next.length).toBe(1);
      expect(prev.text()).toEqual('<');
      expect(next.text()).toEqual('>');
    });

  });

  describe('select page', function () {

    it('should select a page', function () {

      spyOn(controllerMock, 'slice').andCallThrough();

      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination=""></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      tableState.pagination = {
        start: 35,
        numberOfPages: 12,
        number: 10
      };

      rootScope.$apply();

      var pages = getPages();

      expect(pages.length).toBe(5);

      expect(pages[0].text()).toEqual('2');
      expect(pages[1].text()).toEqual('3');
      expect(pages[2].text()).toEqual('4');
      expect(pages[3].text()).toEqual('5');
      expect(pages[4].text()).toEqual('6');

      var active = pages.filter(function (value) {
        return hasClass(value[0], 'active');
      });

      expect(active.length).toBe(1);
      expect(active[0].text()).toEqual('4');

      angular.element(pages[4].children()[0]).triggerHandler('click');

      rootScope.$apply();

      expect(controllerMock.slice).toHaveBeenCalledWith(50, 10);

    });

  });

  describe('call onPageChange callback', function () {

    it('should call onPageChange method', function () {
      rootScope.onPageChange = jasmine.createSpy('onPageChange');
      spyOn(controllerMock, 'slice').andCallThrough();

      tableState.pagination = {
        start: 1,
        numberOfPages: 4,
        number: 10
      };

      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination="" st-displayed-pages="5" st-page-change="onPageChange(newPage)"></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      var pages = getPages();

      expect(pages.length).toBe(4);
      angular.element(pages[2].children()[0]).triggerHandler('click');

      rootScope.$apply();

      expect(controllerMock.slice).toHaveBeenCalledWith(20, 10);
      expect(rootScope.onPageChange).toHaveBeenCalledWith(3);
      expect(rootScope.onPageChange.calls.length).toBe(1);

    });

    it('should call onPageChange method when next button is clicked', function () {
      rootScope.onPageChange = jasmine.createSpy('onPageChange');
      spyOn(controllerMock, 'slice').andCallThrough();

      tableState.pagination = {
        start: 1,
        numberOfPages: 4,
        number: 10
      };

      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination="" st-displayed-pages="5" st-page-change="onPageChange(newPage)"></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      var next = getNextButton();

      expect(next.length).toBe(1);
      next.triggerHandler('click');

      rootScope.$apply();

      expect(controllerMock.slice).toHaveBeenCalledWith(10, 10);
      expect(rootScope.onPageChange).toHaveBeenCalledWith(2);
      expect(rootScope.onPageChange.calls.length).toBe(1);
    });

    it('should call onPageChange method when previous button is clicked', function () {
      rootScope.onPageChange = jasmine.createSpy('onPageChange');
      spyOn(controllerMock, 'slice').andCallThrough();

      tableState.pagination = {
        start: 35,
        numberOfPages: 4,
        number: 10
      };

      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination="" st-displayed-pages="5" st-page-change="onPageChange(newPage)"></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();
      rootScope.onPageChange.reset();

      var prev = getPrevButton();

      expect(prev.length).toBe(1);
      prev.triggerHandler('click');

      rootScope.$apply();

      expect(controllerMock.slice).toHaveBeenCalledWith(20, 10);
      expect(rootScope.onPageChange).toHaveBeenCalledWith(3);
      expect(rootScope.onPageChange.calls.length).toBe(1);

    });

    it('should should not call when current page is not changed', function () {

      rootScope.onPageChange = jasmine.createSpy('onPageChange');
      spyOn(controllerMock, 'slice').andCallThrough();

      tableState.pagination = {
        start: 1,
        numberOfPages: 4,
        number: 10
      };

      var template = '<table st-table="rowCollection"><tfoot><tr><td id="pagination" st-pagination="" st-displayed-pages="pages" st-page-change="onPageChange(newPage)"></td></tr></tfoot></table>';
      element = compile(template)(rootScope);

      rootScope.$apply();

      var pages = getPages();

      expect(pages.length).toBe(4);
      angular.element(pages[2].children()[0]).triggerHandler('click');

      rootScope.$apply();

      expect(controllerMock.slice).toHaveBeenCalledWith(20, 10);
      expect(rootScope.onPageChange).toHaveBeenCalledWith(3);
      expect(rootScope.onPageChange.calls.length).toBe(1);

      tableState.pagination.numberOfPages=5;

      rootScope.$apply();
      pages = getPages();

      expect(pages.length).toBe(5);
      expect(rootScope.onPageChange.calls.length).toBe(1);
    });

  });

});

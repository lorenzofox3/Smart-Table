describe('stSelectRow Directive', function () {

    var rootScope;
    var scope;
    var element;

    function hasClass(element, classname) {
        return Array.prototype.indexOf.call(element.classList, classname) !== -1
    }

    beforeEach(module('smart-table'));

    var stConfig;
    beforeEach(inject(function (_stConfig_) {
      stConfig = _stConfig_;
    }));

    // We need to do this here because we must compile the directive *after* configuring stConfig
    it('should select more than one row when globally configured', inject(function ($rootScope, $compile) {
        var oldMode = stConfig.select.mode;
        stConfig.select.mode = 'multiple';


        rootScope = $rootScope;
        scope = $rootScope.$new();
        rootScope.rowCollection = [
            {name: 'Renard', firstname: 'Laurent', age: 66},
            {name: 'Francoise', firstname: 'Frere', age: 99},
            {name: 'Renard', firstname: 'Olivier', age: 33},
            {name: 'Leponge', firstname: 'Bob', age: 22},
            {name: 'Faivre', firstname: 'Blandine', age: 44}
        ];

        var template = '<table st-table="rowCollection">' +
            '<tbody>' +
            '<tr st-select-row="row" ng-repeat="row in rowCollection"></tr>' +
            '</tbody>' +
            '</table>';

        element = $compile(template)(scope);

        scope.$apply();


        var trs = element.find('tr');
        expect(trs.length).toBe(5);
        angular.element(trs[3]).triggerHandler('click');
        expect(scope.rowCollection[3].isSelected).toBe(true);
        angular.element(trs[1]).triggerHandler('click');
        expect(scope.rowCollection[1].isSelected).toBe(true);
        expect(scope.rowCollection[3].isSelected).toBe(true);

        stConfig.select.mode = oldMode;
    }));

    describe('single mode', function () {
        beforeEach(inject(function ($compile, $rootScope) {

            rootScope = $rootScope;
            scope = $rootScope.$new();
            rootScope.rowCollection = [
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Francoise', firstname: 'Frere', age: 99},
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Leponge', firstname: 'Bob', age: 22},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ];

            var template = '<table st-table="rowCollection">' +
                '<tbody>' +
                '<tr st-select-row="row" ng-repeat="row in rowCollection"></tr>' +
                '</tbody>' +
                '</table>';

            element = $compile(template)(scope);

            scope.$apply();
        }));

        it('should select one row', function () {
            var trs = element.find('tr');
            expect(trs.length).toBe(5);
            angular.element(trs[3]).triggerHandler('click');
            expect(scope.rowCollection[3].isSelected).toBe(true);
        });

        it('should select one row only by default', function () {
            var trs = element.find('tr');
            expect(trs.length).toBe(5);
            angular.element(trs[3]).triggerHandler('click');
            expect(scope.rowCollection[3].isSelected).toBe(true);
            angular.element(trs[1]).triggerHandler('click');
            expect(scope.rowCollection[1].isSelected).toBe(true);
            expect(scope.rowCollection[3].isSelected).toBe(false);
        });

        it('should update the class name when isSelected property change', function () {

            var tr = element.find('tr');
            expect(hasClass(tr[2], 'st-selected')).toBe(false);
            scope.rowCollection[2].isSelected = true;
            scope.$apply();
            expect(hasClass(tr[2], 'st-selected')).toBe(true);

            scope.rowCollection[2].isSelected = false;
            scope.$apply();
            expect(hasClass(tr[2], 'st-selected')).toBe(false);
        });

        it('should update the customized class name when isSelected property change', function () {
            var oldClass = stConfig.select.selectedClass;
            stConfig.select.selectedClass = 'custom-selected'

            var tr = element.find('tr');
            expect(hasClass(tr[2], 'custom-selected')).toBe(false);
            scope.rowCollection[2].isSelected = true;
            scope.$apply();
            expect(hasClass(tr[2], 'custom-selected')).toBe(true);

            scope.rowCollection[2].isSelected = false;
            scope.$apply();
            expect(hasClass(tr[2], 'custom-selected')).toBe(false);

            stConfig.select.selectedClass = oldClass;
        });
    });

    describe('multiple mode', function () {
        beforeEach(inject(function ($compile, $rootScope) {

            rootScope = $rootScope;
            scope = $rootScope.$new();
            scope.rowCollection=[
                {name: 'Renard', firstname: 'Laurent', age: 66},  //0/0
                {name: 'Francoise', firstname: 'Frere', age: 99}, // filtered out
                {name: 'Renard', firstname: 'Olivier', age: 33},  //2/1
                {name: 'Leponge', firstname: 'Bob', age: 22},     // filtered out
                {name: 'Faivre', firstname: 'Blandine', age: 44}, //4/2
                {name: 'Renard', firstname: 'Laurent', age: 65},  //5/3
                {name: 'Francoise', firstname: 'Frere', age: 98}, // filtered out
                {name: 'Renard', firstname: 'Olivier', age: 32},  //7/4
                {name: 'Leponge', firstname: 'Bob', age: 21},     // filtered out
                {name: 'Faivre', firstname: 'Blandine', age: 43}, //9/5
                {name: 'Renard', firstname: 'Laurent', age: 64},  //10/6
                {name: 'Francoise', firstname: 'Frere', age: 97}, // filtered out
                {name: 'Renard', firstname: 'Olivier', age: 31},  //12/7
                {name: 'Leponge', firstname: 'Bob', age: 20},     // filtered out
                {name: 'Faivre', firstname: 'Blandine', age: 42}  //14/8
            ];

            var template = '<table st-safe-src="rowCollection" st-table="displayCollection">' +
            '<thead>' +
            '<tr>' +
            '<th><input st-search="name" /></th>' +
            '<th><input st-search="" /></th>' +
            '<th>age</th>' +
            '</tr>' +
                '<tbody>' +
                '<tr st-select-mode="multiple" st-select-row="row" ng-repeat="row in displayCollection"></tr>' +
                '</tbody>' +
                '</table>';

            element = $compile(template)(scope);

            scope.$apply();
            
            shiftClick = jQuery.Event("click");
            shiftClick.shiftKey = true;
        }));

        it('should select multiple rows', function () {
            var trs = element.find('tbody>tr');
            expect(trs.length).toBe(15);
            angular.element(trs[3]).triggerHandler('click');
            expect(scope.rowCollection[3].isSelected).toBe(true);
            angular.element(trs[1]).triggerHandler('click');
            expect(scope.rowCollection[3].isSelected).toBe(true);
            expect(scope.rowCollection[1].isSelected).toBe(true);
        });
        
        it('should clear selection on filter', inject(function ($timeout) {
        	//select two rows on full list
            var trs = element.find('tbody>tr');
            expect(trs.length).toBe(15);
            angular.element(trs[3]).triggerHandler('click');
            angular.element(trs[1]).triggerHandler('click');
            expect(scope.rowCollection[3].isSelected).toBe(true);
            expect(scope.rowCollection[1].isSelected).toBe(true);

            //filter list; check that rows are unselected
            var ths = element.find('th');
            var input = angular.element(ths[0].children[0]);
            input[0].value = 're';
            input.triggerHandler('input');
            $timeout.flush();
            trs = element.find('tbody>tr');
            expect(trs.length).toBe(9);
            expect(scope.rowCollection[3].isSelected).toBe(false);
            expect(scope.rowCollection[1].isSelected).toBe(false);
        }));
        
        function countSelected(rows) {
        	var count = 0;
        	for(var i = 0; i < rows.length; i++)
        		if(rows[i].isSelected)
        			count++;
        	return count;
        }
        
        it('should extend selection', inject(function ($timeout) {
            //filter list; check that rows are unselected
            var ths = element.find('th');
            var input = angular.element(ths[0].children[0]);
            input[0].value = 're';
            input.triggerHandler('input');
            $timeout.flush();
            
            var trs = element.find('tbody>tr');
            expect(trs.length).toBe(9);
            
            //shift-click row 1 / orig row #2
            angular.element(trs[1]).triggerHandler(shiftClick);
            expect(scope.rowCollection[2].isSelected).toBe(true);
            expect(countSelected(scope.rowCollection)).toBe(1);

            //extend selection to row 3 / orig row #5
            angular.element(trs[3]).triggerHandler(shiftClick);
            expect(scope.rowCollection[4].isSelected).toBe(true);
            expect(scope.rowCollection[5].isSelected).toBe(true);
            expect(countSelected(scope.rowCollection)).toBe(3);

            //extend selection to row 7 / orig row #12
            angular.element(trs[7]).triggerHandler(shiftClick);
            expect(scope.rowCollection[10].isSelected).toBe(true);
            expect(scope.rowCollection[12].isSelected).toBe(true);
            expect(countSelected(scope.rowCollection)).toBe(7);

            //remove selection on row 6 / orig row #10
            angular.element(trs[6]).triggerHandler("click");
            expect(scope.rowCollection[10].isSelected).toBe(false);
            expect(scope.rowCollection[12].isSelected).toBe(true);
            expect(countSelected(scope.rowCollection)).toBe(6);

            //extend removal to row 3 / orig row #5
            angular.element(trs[3]).triggerHandler(shiftClick);
            expect(scope.rowCollection[5].isSelected).toBe(false);
            expect(scope.rowCollection[4].isSelected).toBe(true);
            expect(countSelected(scope.rowCollection)).toBe(3);

        }));
    });


});

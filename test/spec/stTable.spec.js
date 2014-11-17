describe('st table Controller', function () {

    var dataSet;
    var scope;
    var ctrl;
    var childScope;
    var searchFilter;

    beforeEach(module('smart-table'));

    beforeEach(inject(function ($rootScope, $controller, $filter, $parse) {
        dataSet = [
            {name: 'Renard', firstname: 'Laurent', age: 66},
            {name: 'Francoise', firstname: 'Frere', age: 99},
            {name: 'Renard', firstname: 'Olivier', age: 33},
            {name: 'Leponge', firstname: 'Bob', age: 22},
            {name: 'Faivre', firstname: 'Blandine', age: 44}
        ];
        scope = $rootScope;
        childScope = scope.$new();
        scope.data = dataSet;
        ctrl = $controller('stTableController', {$scope: scope, $parse: $parse, $filter: $filter, $attrs: {
            stTable: 'data'
        }});
        searchFilter = ctrl.registerFilter('search');
    }));

    describe('sort', function () {
        it('should sort the data', function () {
            ctrl.sortBy('firstname');
            expect(scope.data).toEqual([
                {name: 'Faivre', firstname: 'Blandine', age: 44},
                {name: 'Leponge', firstname: 'Bob', age: 22},
                {name: 'Francoise', firstname: 'Frere', age: 99},
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Renard', firstname: 'Olivier', age: 33}
            ]);
        });

        it('should reverse the order if the flag is passed', function () {
            ctrl.sortBy('firstname', true);
            expect(scope.data).toEqual([
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Francoise', firstname: 'Frere', age: 99},
                {name: 'Leponge', firstname: 'Bob', age: 22},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ]);
        });

        it('should support getter function predicate', function () {
            ctrl.sortBy(function (row) {
                return row.firstname.length;
            });
            expect(scope.data).toEqual([
                {name: 'Leponge', firstname: 'Bob', age: 22},
                {name: 'Francoise', firstname: 'Frere', age: 99},
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ]);
        });
    });

    describe('search', function () {
        it('should search based on property name ', function () {
            ctrl.applyFilter('re', 'name', searchFilter);
            expect(scope.data).toEqual([
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ]);
        });

        it('should not filter out null value when input is empty string', inject(function ($controller, $parse, $filter) {
            scope.data = [
                {name: null, firstname: 'Laurent', age: 66},
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ];

            //use another dataset for this particular spec
            ctrl = $controller('stTableController', {$scope: scope, $parse: $parse, $filter: $filter, $attrs: {
                stTable: 'data'
            }});
            searchFilter = ctrl.registerFilter('search');

            ctrl.applyFilter('re', 'name', searchFilter);
            expect(scope.data).toEqual([
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ]);

            ctrl.applyFilter('', 'name', searchFilter);
            expect(scope.data).toEqual([
                {name: null, firstname: 'Laurent', age: 66},
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ]);

        }));

        it('should search globally', function () {
            ctrl.applyFilter('re', '', searchFilter);
            expect(scope.data).toEqual([
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Francoise', firstname: 'Frere', age: 99},
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ])
        });

        it('should add different columns', function () {
            ctrl.applyFilter('re', 'name', searchFilter);
            expect(scope.data).toEqual([
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ]);

            ctrl.applyFilter('re', 'firstname', searchFilter);

            expect(scope.data).toEqual([
                {name: 'Renard', firstname: 'Laurent', age: 66}
            ]);
        });
    });

    describe('slice', function () {
        it('should slice the collection', function () {
            ctrl.slice(1, 2);
            expect(scope.data.length).toBe(2);
            expect(scope.data).toEqual([
                {name: 'Francoise', firstname: 'Frere', age: 99},
                {name: 'Renard', firstname: 'Olivier', age: 33}
            ]);
        });

        it('limit to the last page if not enough data', function () {
            ctrl.slice(7, 2);
            expect(scope.data.length).toBe(1);
            expect(scope.data).toEqual([
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ]);
        });
    });

    describe('pipe', function () {
        it('should remembered the last slice length but start back to zero when sorting', function () {
            ctrl.slice(1, 2);
            expect(scope.data.length).toBe(2);
            expect(scope.data).toEqual([
                {name: 'Francoise', firstname: 'Frere', age: 99},
                {name: 'Renard', firstname: 'Olivier', age: 33}
            ]);

            ctrl.sortBy('firstname');
            expect(scope.data.length).toBe(2);
            expect(scope.data).toEqual([
                {name: 'Faivre', firstname: 'Blandine', age: 44},
                {name: 'Leponge', firstname: 'Bob', age: 22}
            ]);
        });

        it('should remembered the last slice length but start back to zero when filtering', function () {
            ctrl.slice(1, 2);
            expect(scope.data.length).toBe(2);
            expect(scope.data).toEqual([
                {name: 'Francoise', firstname: 'Frere', age: 99},
                {name: 'Renard', firstname: 'Olivier', age: 33}
            ]);

            ctrl.applyFilter('re', 'name', searchFilter);
            expect(scope.data.length).toBe(2);
            expect(scope.data).toEqual([
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Renard', firstname: 'Olivier', age: 33}
            ]);
        });

        it('should remember sort state when filtering', function () {
            ctrl.sortBy('firstname');
            expect(scope.data).toEqual([
                {name: 'Faivre', firstname: 'Blandine', age: 44},
                {name: 'Leponge', firstname: 'Bob', age: 22},
                {name: 'Francoise', firstname: 'Frere', age: 99},
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Renard', firstname: 'Olivier', age: 33}
            ]);

            ctrl.applyFilter('re', 'name', searchFilter);
            expect(scope.data).toEqual([
                {name: 'Faivre', firstname: 'Blandine', age: 44},
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Renard', firstname: 'Olivier', age: 33}
            ]);

        });

        it('should remember filtering when sorting', function () {
            ctrl.applyFilter('re', 'name', searchFilter);
            expect(scope.data).toEqual([
                {name: 'Renard', firstname: 'Laurent', age: 66},
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Faivre', firstname: 'Blandine', age: 44}
            ]);
            ctrl.sortBy('age');
            expect(scope.data).toEqual([
                {name: 'Renard', firstname: 'Olivier', age: 33},
                {name: 'Faivre', firstname: 'Blandine', age: 44},
                {name: 'Renard', firstname: 'Laurent', age: 66}
            ]);
        });
    });

    describe('select', function () {

        function getSelected(array) {
            return array.filter(function (val) {
                return val.isSelected === true;
            });
        }


        it('should select only a single row at the time', function () {
            ctrl.select(scope.data[3], 'single');
            var selected = getSelected(scope.data);
            expect(selected.length).toBe(1);
            expect(selected[0]).toEqual(scope.data[3]);

            ctrl.select(scope.data[2], 'single');

            selected = getSelected(scope.data);

            expect(selected.length).toBe(1);
            expect(selected[0]).toEqual(scope.data[2]);
        });

        it('should select a row multiple times in single mode (#165)', function () {
            ctrl.select(scope.data[3], 'single');
            var selected = getSelected(scope.data);
            expect(selected.length).toBe(1);
            expect(selected[0]).toEqual(scope.data[3]);

            ctrl.select(scope.data[3], 'single');
            selected = getSelected(scope.data);

            expect(selected.length).toBe(0);

            ctrl.select(scope.data[3], 'single');
            selected = getSelected(scope.data);

            expect(selected.length).toBe(1);
            expect(selected[0]).toEqual(scope.data[3]);
        });

        it('should select multiple row', function () {
            ctrl.select(scope.data[3]);
            ctrl.select(scope.data[4]);
            var selected = getSelected(scope.data);
            expect(selected.length).toBe(2);
            expect(selected).toEqual([scope.data[3], scope.data[4]]);
        });

        it('should unselect an item on mode single', function () {
            ctrl.select(scope.data[3], 'single');
            var selected = getSelected(scope.data);
            expect(selected.length).toBe(1);
            expect(selected[0]).toEqual(scope.data[3]);

            ctrl.select(scope.data[3], 'single');

            selected = getSelected(scope.data);

            expect(selected.length).toBe(0);
        });

        it('should unselect an item on mode multiple', function () {
            ctrl.select(scope.data[3]);
            ctrl.select(scope.data[4]);
            var selected = getSelected(scope.data);
            expect(selected.length).toBe(2);
            expect(selected).toEqual([scope.data[3], scope.data[4]]);

            ctrl.select(scope.data[3]);
            selected = getSelected(scope.data);
            expect(selected.length).toBe(1);
            expect(selected).toEqual([scope.data[4]]);
        });
    });
});

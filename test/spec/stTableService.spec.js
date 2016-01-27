describe('stTableService Service', function () {
    beforeEach(module('smart-table'));

    var dummyController = { };

    it('should permit registering and getting table controllers', inject(function(stTableService) {
        stTableService.register('1', dummyController);

        expect(stTableService.get('1')).toBe(dummyController);
    }));

    it('should permit waiting for, then registering table controllers', inject(function($rootScope, stTableService) {
        var done = false;

        runs(function() {
            stTableService.waitFor('testId').then(function(ctrl) {
                expect(ctrl).toBe(dummyController);
                done = true;
            });

            stTableService.register('testId', dummyController);

            $rootScope.$apply(); // propogate promise resolution
        });

        waitsFor(function() {
          return done;
        });
    }));

    it('should permit registering, then waiting for table controllers', inject(function($rootScope, stTableService) {
        var done = false;

        runs(function() {
            stTableService.register('testId', dummyController);

            stTableService.waitFor('testId').then(function(ctrl) {
                expect(ctrl).toBe(dummyController);
                done = true;
            });

            $rootScope.$apply(); // propogate promise resolution
        });

        waitsFor(function() {
          return done;
        });
    }));
});

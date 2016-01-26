describe('stTableService Service', function () {
    beforeEach(module('smart-table'));

    var dummyController = { };

    it('should permit registering and getting table controllers', inject(function(stTableService) {
        stTableService.register('1', dummyController);

        expect(stTableService.get('1')).toBe(dummyController);
    }));
});

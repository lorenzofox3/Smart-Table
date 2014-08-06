describe('ColumnGroup Module', function () {
    beforeEach(module('smartTable.columnGroup', function ($provide) {
        $provide.constant('DefaultColumnGroupConfiguration', {defaultValue: 'default', value: 'defaultValue'});
        $provide.provider('ColumnGroup', ColumnGroupProvider);
    }));


    describe('ColumnGorup provider', function () {
        it('should always return an instance of ColumnGroup', inject(function (ColumnGroup) {
            expect(typeof ColumnGroup()).toBe('object');
            expect(ColumnGroup() instanceof ColumnGroup).toBe(true);
            expect(typeof new ColumnGroup()).toBe('object');
            expect(new ColumnGroup() instanceof ColumnGroup).toBe(true);
        }));

        it('should overwrite default parameters if provided in config', inject(function (ColumnGroup) {
            var columnGroup = new ColumnGroup();
            expect(columnGroup.defaultValue).toEqual('default');
            expect(columnGroup.value).toEqual('defaultValue');

            columnGroup = new ColumnGroup({value: 'value', otherValue: 'otherValue'});
            expect(columnGroup.defaultValue).toEqual('default');
            expect(columnGroup.value).toEqual('value');
            expect(columnGroup.otherValue).toEqual('otherValue');
        }));
    });
});

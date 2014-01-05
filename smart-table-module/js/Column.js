/* Column module */

(function (global, angular) {
    "use strict";
    var smartTableColumnModule = angular.module('smartTable.column', ['smartTable.templateUrlList']).constant('DefaultColumnConfiguration', {
        isSortable: true,
        isEditable: false,
        type: 'text',


        //it is useless to have that empty strings, but it reminds what is available
        headerTemplateUrl: '',
        map: '',
        label: '',
        sortPredicate: '',
        formatFunction: '',
        formatParameter: '',
        filterPredicate: '',
		cellTemplate: '',
        cellTemplateUrl: '',
        headerClass: '',
        cellClass: '',
		width: '',
		style: {}
    });

    function ColumnProvider(DefaultColumnConfiguration, templateUrlList) {

        function Column(config) {
            if (!(this instanceof Column)) {
                return new Column(config);
            }
            angular.extend(this, config);
		
			this.style = angular.copy(this.style);
			
			if (this.width) {
				this.style.width = this.width;
			}
        }

        this.setDefaultOption = function (option) {
            angular.extend(Column.prototype, option);
        };

        DefaultColumnConfiguration.headerTemplateUrl = templateUrlList.defaultHeader;
        this.setDefaultOption(DefaultColumnConfiguration);

        this.$get = function () {
            return Column;
        };
    }

    ColumnProvider.$inject = ['DefaultColumnConfiguration', 'templateUrlList'];
    smartTableColumnModule.provider('Column', ColumnProvider);

    //make it global so it can be tested
    global.ColumnProvider = ColumnProvider;
})(window, angular);



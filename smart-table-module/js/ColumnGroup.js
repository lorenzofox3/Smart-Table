/* ColumnGroup module */

(function (global, angular) {
    "use strict";
    var smartTableColumnGroupModule = angular.module('smartTable.columnGroup', ['smartTable.templateUrlList']).constant('DefaultColumnGroupConfiguration', {
        //it is useless to have that empty strings, but it reminds what is available
        headerGroupTemplateUrl: '',
        columns: [],
        label: '',
        headerGroupClass: ''
    });
    function ColumnGroupProvider(DefaultColumnGroupConfiguration, templateUrlList){
        function ColumnGroup(config){
            if(!(this instanceof ColumnGroup)){
                return new ColumnGroup(config);
            }
            angular.extend(this, config);
        }

        this.setDefaultOption = function(option){
            angular.extend(ColumnGroup.prototype, option);
        };

        DefaultColumnGroupConfiguration.headerGroupTemplateUrl = templateUrlList.defaultHeaderGroup;
        this.setDefaultOption(DefaultColumnGroupConfiguration);

        this.$get = function(){
            return ColumnGroup;
        };
    }

    smartTableColumnGroupModule.provider('ColumnGroup',['DefaultColumnGroupConfiguration','templateUrlList',ColumnGroupProvider]);

    //make it global so it can be tested
    global.ColumnGroupProvider = ColumnGroupProvider;
})(window, angular);
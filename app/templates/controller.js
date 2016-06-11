/**
 * Created by jafarnaqvi on 10/06/16.
 */

(function () {


    angular.module('<%=name%>')
        .controller('<%=name.substring(4)%>RootController', rootController);

    rootController.$inject = [];

    function rootController() {
        var controller = this;

    }

})();


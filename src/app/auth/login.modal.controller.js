(function () {
    'use strict';
    angular.module('app')
        .controller('loginModalController', loginModalController);

    loginModalController.$ingect = ['$uibModalInstance'];

    function loginModalController($uibModalInstance) {
        var self = this;
                
        self.closeForm = closeForm;
       
        function closeForm() {
            $uibModalInstance.close();
        }
    }
}());
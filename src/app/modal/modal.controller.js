(function () {
    'use strict';
    angular.module('app')
        .controller('modalController', modalController);

    modalController.$ingect = ['$uibModalInstance'];

    function modalController($uibModalInstance) {
        var self = this;
                
        self.closeForm = closeForm;
        self.confirmForm = confirmForm;
       
        function closeForm() {
            $uibModalInstance.close();
        }

        function confirmForm() {
            $uibModalInstance.close(true);
        }
    }
}());
(function () {
    'use strict';
    angular.module('app')
        .controller('modalController', modalController);

    modalController.$inject = ['$uibModalInstance'];

    function modalController($uibModalInstance) {
        var self = this;
                
        self.closeForm = closeForm;
        self.confirmForm = confirmForm;
       
        function closeForm() {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmForm() {
            $uibModalInstance.close(true);
        }
    }
}());
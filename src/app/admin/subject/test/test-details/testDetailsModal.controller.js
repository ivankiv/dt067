(function(){
    'use strict';

    angular.module('app')
        .controller('TestDetailsModalController', testDetailsModalController);
        testDetailsModalController.$inject = ['testDetailsService', '$stateParams', '$uibModalInstance', 'ngDialog'];

        function testDetailsModalController(testDetailsService, $stateParams, $uibModalInstance, ngDialog) {
            var self = this;

            //variables
            self.testDetails = {};
            self.testDetails.test_id = $stateParams.currentTestId;
            self.duplicateTestLevelMessage = false;

            //methods
            self.addTestDetails = addTestDetails;
            self.cancelForm = cancelForm;

            activate();

            function activate() {

            }

            function addTestDetails() {
                testDetailsService.addTestDetails(self.testDetails).then(addTestDetailsComplete)
            }

            function cancelForm () {
                $uibModalInstance.dismiss();
            }

            function addTestDetailsComplete(response) {
                if(response.data.response === "ok") {
                    self.testDetails = {};
                    $uibModalInstance.close();
                }

                if(response.status === 400) {
                    self.duplicateTestLevelMessage = true;
                }
            }
        }
}());


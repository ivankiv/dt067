(function(){
    'use strict';

    angular.module('app')
        .controller('TestDetailsModalController', testDetailsModalController);
        testDetailsModalController.$inject = ['testDetailsService', '$stateParams', '$uibModalInstance', 'currentTestDetails', 'amountOfTaskForCurrentTest'];

        function testDetailsModalController(testDetailsService, $stateParams, $uibModalInstance, currentTestDetails, amountOfTaskForCurrentTest) {
            var self = this;

            //variables
            self.testDetails = {};
            self.currentTestDetails = currentTestDetails;
            self.testDetails.test_id = $stateParams.currentTestId;
            self.amountOfTaskForCurrentTest = amountOfTaskForCurrentTest;
            self.duplicateTestLevelMessage = false;
            self.wasNotEditTestMessage = false;

            //methods
            self.addTestDetails = addTestDetails;
            self.updateTestDetails = updateTestDetails;
            self.cancelForm = cancelForm;


            function addTestDetails() {
                testDetailsService.addTestDetails(self.testDetails).then(addTestDetailsComplete)
            }

            function updateTestDetails() {
                testDetailsService.editTestDetails(currentTestDetails.id, self.currentTestDetails).then(editTestDetailsComplete)
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

            function editTestDetailsComplete(response) {
                if(response.data.response === "ok") {
                    self.currentTestDetails = {};
                    $uibModalInstance.close();
                }

                if(response.status === 400 && response.data.response !== "Error when update") {
                    self.duplicateTestLevelMessage = true;
                }

                if(response.status === 400 && response.data.response === "Error when update") {
                    self.wasNotEditTestMessage = true;
                }
            }
        }
}());


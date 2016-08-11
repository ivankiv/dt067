(function(){
    'use strict';

    angular.module('app')
        .controller('TestModalController', testModalController);
        testModalController.$inject = ['testService', '$stateParams', 'appConstants', '$uibModalInstance', 'currentTest', 'ngDialog'];

        function testModalController(testService, $stateParams, appConstants, $uibModalInstance,  currentTest, ngDialog) {
            var self = this;

            //variables
            self.test = {};
            self.test.subject_id = $stateParams.currentSubjectId;

            //methods
            self.addTest = addTest;
            self.cancelForm = cancelForm;


            function addTest() {
                testService.addTest(self.test).then(addTestComplete)
            }

            function cancelForm () {
                $uibModalInstance.dismiss('cancel');
            }

            function addTestComplete(response) {
                if(response.data.response == "ok") {
                    self.test = {};
                    $uibModalInstance.close(response);
                }
            }
        }
}());

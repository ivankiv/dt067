(function(){
    'use strict';

    angular.module('app')
        .controller('TestModalController', testModalController);
        testModalController.$inject = ['testService', '$stateParams', 'subjectService', '$uibModalInstance', 'currentTest', 'ngDialog'];

        function testModalController(testService, $stateParams, subjectService,  $uibModalInstance,  currentTest, ngDialog) {
            var self = this;

            //variables
            self.test = {};
            self.test.test_id = currentTest.test_id;
            self.test.subject_id = $stateParams.currentSubjectId;
            self.currentTest = currentTest;
            self.subjectList = {};
            self.wasNotEditTestMessage = false;

            //methods
            self.addTest = addTest;
            self.updateTest = updateTest;
            self.getSubjects = getSubjects;
            self.cancelForm = cancelForm;

            activate();

            function activate() {
                getSubjects();
            }

            function addTest() {
                testService.addTest(self.test).then(addTestComplete)
            }

            function updateTest() {
                testService.updateTest(self.test.test_id, self.currentTest).then(updateTestComplete);
            }

            function getSubjects() {
                subjectService.getSubjects().then(function(response) {
                    self.subjectList = response.data;
                });
            }

            function updateTestComplete(response) {
                if(response.status === 400) {
                    ngDialog.open({template: '<div class="ngdialog-message"> На сервері вже є предмет з такою назвою!</div>'
                    });
                }

                if(response.data.response === 'error') {
                    self.wasNotEditTestMessage = true;
                }

                if(response.data.response === "ok") {
                    self.test = {};
                    $uibModalInstance.close();
                }
            }

            function cancelForm () {
                $uibModalInstance.dismiss('cancel');
            }

            function addTestComplete(response) {
                if(response.data.response === "ok") {
                    self.test = {};
                    $uibModalInstance.close();
                }
            }
        }
}());

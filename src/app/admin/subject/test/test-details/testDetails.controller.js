(function(){
    'use strict';

    angular.module('app')
        .controller('TestDetailsController', testDetailsController);
    testDetailsController.$inject = ['$stateParams', 'testDetailsService', 'testService', 'ngDialog'];

        function testDetailsController($stateParams, testDetailsService, testService, ngDialog) {
            var self = this;

            //variables
            self.currentSubjectId = $stateParams.currentSubjectId;
            self.list = {};
            self.showMessageNoEntity = false;
            self.currenTestName = "";

            //methods
            self.getTestDetailsByTest = getTestDetailsByTest;
            self.deleteTestDetails = deleteTestDetails;
            self.showAddTestDetailsForm = showAddTestDetailsForm;


            activate();

            function activate() {
                getOneTest();
                getTestDetailsByTest();
            }

            function getTestDetailsByTest() {
                testDetailsService.getTestDetailsByTest($stateParams.currentTestId).then(getTestDetailsByTestComplete)
            }

            function deleteTestDetails(id) {
                ngDialog.openConfirm({
                    template: 'app/partials/confirm-delete-dialog.html',
                    plain: false
                }).then(function() {
                    testDetailsService.deleteTestDetails(id).then(function() {
                        activate();
                    })
                })
            }

            function getOneTest() {
                testService.getOneTest($stateParams.currentTestId).then(function(response) {
                    self.currentTestName = response.data[0].test_name;
                })
            }

            function showAddTestDetailsForm() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/test/test-details/add-test-details.html',
                    controller: 'TestDetailsModalController as testDetails',
                    backdrop: false,
                    resolve: {
                        currentTestDetails: {}
                    }
                });
                modalInstance.result.then(function() {
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Деталі тесту успішно додано!</div>'
                    });
                    self.showMessageNoEntity = false;
                    activate();
                })
            }

            function getTestDetailsByTestComplete(response) {
                if(response.data.response === "no records") {
                    self.showMessageNoEntity = true;
                } else {
                    self.list = response.data;
                }
            }
        }
}());

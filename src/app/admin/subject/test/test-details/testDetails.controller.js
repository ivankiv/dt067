(function(){
    'use strict';

    angular.module('app')
        .controller('TestDetailsController', testDetailsController);
        testDetailsController.$inject = ['loginService', '$stateParams', 'testDetailsService', 'testService', '$uibModal'];

        function testDetailsController(loginService, $stateParams, testDetailsService, testService, $uibModal) {
            var self = this;

            //variables
            self.currentSubjectId = $stateParams.currentSubjectId;
            self.list = {};
            self.showMessageNoEntity = false;

            //methods
            self.getTestDetailsByTest = getTestDetailsByTest;
            self.deleteTestDetails = deleteTestDetails;
            self.showAddTestDetailsForm = showAddTestDetailsForm;
            self.showEditTestDetailsForm = showEditTestDetailsForm;


            activate();

            function activate() {
                 isLogged();
                 getOneTest().then(getTestDetailsByTest);
            }

            function isLogged() {
                loginService.isLogged();
            }

            function getTestDetailsByTest() {
                testDetailsService.getTestDetailsByTest($stateParams.currentTestId).then(getTestDetailsByTestComplete)
            }

            function getTestDetailsByTestComplete(response) {
                self.list = response.data;
                calculateAvailableTask();

                function calculateAvailableTask() {
                    self.amountOfRate = 0;
                    self.amountOfTasks = 0;

                    if(response.data.response === "no records") {
                        self.showMessageNoEntity = true;
                        self.availableAmountOfTaskForCurrentTest = self.currentTest.tasks - self.amountOfTasks;
                    } else {

                        angular.forEach(self.list, function(item) {
                            //calculate amount of rate per current test
                            self.amountOfRate += item.rate * item.tasks;

                            //calculate amount of tasks per current test
                            self.amountOfTasks += parseInt(item.tasks);
                        });

                        self.availableAmountOfTaskForCurrentTest = self.currentTest.tasks - self.amountOfTasks;
                    }
                }
            }

            function deleteTestDetails(id) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modal/templates/confirm-delete-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
                modalInstance.result.then(function() {
                    testDetailsService.deleteTestDetails(id).then(function(response) {
                        if(response.data.response == "ok") {
                            $uibModal.open({
                                templateUrl: 'app/modal/templates/confirm-dialog.html',
                                controller: 'modalController as modal',
                                backdrop: true
                            });
                            activate();
                        }
                    })
                });
            }

             function getOneTest() {
                 return testService.getOneTest($stateParams.currentTestId).then(function(response) {
                     self.currentTest = response.data[0];
                 })
             }

            function showAddTestDetailsForm() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/test/test-details/add-test-details.html',
                    controller: 'TestDetailsModalController as testDetails',
                    backdrop: false,
                    resolve: {
                        currentTestDetails: {},
                        availableAmountOfTaskForCurrentTest: self.availableAmountOfTaskForCurrentTest
                    }
                });
                modalInstance.result.then(function() {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                    self.showMessageNoEntity = false;
                    activate();
                })
            }

            function showEditTestDetailsForm(currentTestDetails) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/test/test-details/edit-test-details.html',
                    controller: 'TestDetailsModalController as testDetails',
                    backdrop: false,
                    resolve: {
                        currentTestDetails: currentTestDetails,
                        availableAmountOfTaskForCurrentTest: self.availableAmountOfTaskForCurrentTest
                    }
                });
                modalInstance.result.then(function() {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                    activate();
                })
            }
        }
}());

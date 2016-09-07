(function(){
    'use strict';

    angular.module('app')
        .controller('TestController', testController);
        testController.$inject = ['loginService', 'testService', 'subjectService', '$uibModal', '$stateParams'];

        function testController (loginService, testService, subjectService, $uibModal, $stateParams) {
            var self = this;

            //variables
            self.list = {};
            self.status = ["Недоступно", "Доступно"];
            self.currenSubjectName = '';
            self.showMessageNoEntity = false;

            //methods
            self.getTestBySubjectId = getTestBySubjectId;
            self.deleteTest = deleteTest;
            self.getOneSubject = getOneSubject;
            self.showAddTestForm = showAddTestForm;
            self.showEditTestForm = showEditTestForm;

            activate();

            function activate() {
                isLogged();
                getOneSubject();
                getTestBySubjectId();
            }

            function isLogged() {
                loginService.isLogged();
            }

            function getOneSubject() {
                subjectService.getOneSubject($stateParams.currentSubjectId).then(function(response) {
                    self.currentSubjectName = response.data[0].subject_name;
                })
            }
            function getTestBySubjectId() {
                testService.getTestBySubjectId($stateParams.currentSubjectId).then(function(response) {
                    if(response.data.response === 'no records') {
                        self.showMessageNoEntity = true;
                    } else {
                        self.list = response.data;
                    }
                })
            }

            function deleteTest(testId) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modal/templates/confirm-delete-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
                modalInstance.result.then(function() {
                    testService.deleteTest(testId).then(deleteTestComplete);
                });
            }
            function deleteTestComplete(response) {
                if(response.data.response === 'ok') {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                    getTestBySubjectId();
                }
                if(response.status === 400) {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/forbidden-confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                }
            }

            function showAddTestForm() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/test/add-test.html',
                    controller: 'TestModalController as tests',
                    backdrop: false,
                    resolve: {
                        currentTest: {}
                    }
                });
                modalInstance.result.then(function() {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                    self.showMessageNoEntity = false;
                    getTestBySubjectId();
                })
            }

            function showEditTestForm(test) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/test/edit-test.html',
                    controller: 'TestModalController as tests',
                    backdrop: false,
                    resolve: {
                        currentTest: test
                    }
                });
                modalInstance.result.then(function() {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                    self.showMessageNoEntity = false;
                    getTestBySubjectId();
                })
            }
        }
}());

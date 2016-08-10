(function(){
    'use strict';

    angular.module('app')
        .controller('TestController', testController);
        testController.$inject = ['testService', 'subjectService', '$uibModal', '$stateParams', 'ngDialog'];

        function testController (testService, subjectService, $uibModal, $stateParams, ngDialog) {
            var self = this;

            //variables
            self.list = {};
            self.currenSubjectName = '';
            self.showAddTestForm = false;
            self.showEditTestForm = false;
            self.showMessageNoEntity = false;
            self.wasNotEditTestMessage = false;
            self.test = {};
            self.test.subject_id = $stateParams.currentSubjectId;
            self.subjectList = {};

            //methods
            self.getTestById = getTestById;
            self.addTest = addTest;
            self.deleteTest = deleteTest;
            self.editTest = editTest;
            self.updateTest = updateTest;
            self.getSubjects = getSubjects;
            self.getOneSubject = getOneSubject;
            self.showAddTestForm = showAddTestForm;
            self.showAddForm = showAddForm;
            self.HideFormTest = HideFormTest;

            activate();

            function activate() {
                getOneSubject();
                getTestById();
            }

            function getSubjects() {
                subjectService.getSubjects().then(function(response) {
                    self.subjectList = response.data;
                    });
            }

            function getOneSubject() {
                subjectService.getOneSubject($stateParams.currentSubjectId).then(function(response) {
                    self.currentSubjectName = response.data[0].subject_name;
                })
            }
            function getTestById() {
                testService.getTestById($stateParams.currentSubjectId).then(function(response) {
                    if(response.data.response == 'no records') {
                        self.showMessageNoEntity = true;
                    } else {
                        self.list = response.data;
                    }
                })
            }
            function addTest() {
                testService.addTest(self.test).then(function(response) {
                    if(response.data.response == "ok") {
                        getTestById();
                        self.test = {};
                        self.showMessageNoEntity = false;
                        self.showAddTestForm = false;
                    }
                })
            }

            function deleteTest(testId) {
                ngDialog.openConfirm({
                    template: 'app/partials/confirm-delete-dialog.html',
                    plain: false
                }).then(function() {
                    testService.deleteTest(testId).then(function(response) {
                        if(response.data.response == 'ok') {
                            getTestById();
                        }
                    })
                });
            }

            function updateTest() {
                testService.updateTest(self.test.test_id, self.test).then(updateTestComplete);
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
                // modalInstance.result.then(function(response) {
                //     ngDialog.open({template: '<div class="ngdialog-message"> \
					// 	  Тест успішно додано!</div>'
                //     });
                //     getTestById();
                // })
            }

            function updateTestComplete(response) {
                if(response.status == 400) {
                    ngDialog.open({template: '<div class="ngdialog-message"> Назва тесту не унікальна!</div>'
                    });
                }

                if(response.data.response == 'error') {
                    self.wasNotEditTestMessage = true;
                }

                if(response.data.response == "ok") {
                    self.test = {};
                    self.showEditTestForm = false;
                    getTestById();

                }
            }

            function editTest(currentTest) {
                getSubjects();
                self.showAddTestForm = false;
                self.showEditTestForm = true;
                self.test = currentTest;
            }

             function showAddForm() {
                 self.showEditTestForm = false;
                self.showAddTestForm = true;
                self.test.subject_id = $stateParams.currentSubjectId;
            }

            function HideFormTest() {
                self.showAddTestForm = false;
                self.showEditTestForm = false;
                self.wasNotEditTestMessage = false;
                self.test = {};
            }
        }
}());

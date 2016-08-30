(function(){
    'use strict';

    angular.module('app')
        .controller('TestController', testController);
        testController.$inject = ['testService', 'subjectService', '$uibModal', '$stateParams', 'ngDialog'];

        function testController (testService, subjectService, $uibModal, $stateParams, ngDialog) {
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
                getOneSubject();
                getTestBySubjectId();
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
                ngDialog.openConfirm({
                    template: 'app/partials/confirm-delete-dialog.html',
                    plain: false
                }).then(function() {
                    testService.deleteTest(testId).then(function(response) {
                        if(response.data.response === 'ok') {
                            getTestBySubjectId();
                        }
                        if(response.status === 400) {
                            ngDialog.open({template: '<div class="ngdialog-message"> \
						  Неможливо видалити тест в якому є завдання!</div>'
                            });
                        }
                    })
                });
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
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Тест успішно додано!</div>'
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
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Зміни збережено!</div>'
                    });
                    self.showMessageNoEntity = false;
                    getTestBySubjectId();
                })
            }
        }
}());

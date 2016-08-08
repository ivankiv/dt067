(function(){
    'use strict';

    angular.module('app')
        .controller('TestController', testController);
        testController.$inject = ['testService', 'subjectService', '$stateParams', 'ngDialog'];

        function testController (testService, subjectService, $stateParams, ngDialog) {
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

            //methods
            self.getTestById = getTestById;
            self.addTest = addTest;
            self.deleteTest = deleteTest;
            self.editTest = editTest;
            self.updateTest = updateTest;
            self.getOneSubject = getOneSubject;
            self.showAddForm = showAddForm;
            self.HideFormTest = HideFormTest;

            activate();

            function activate() {
                getOneSubject();
                getTestById();
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
                self.showEditTestForm = true;
                self.test = currentTest;
            }

             function showAddForm() {
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

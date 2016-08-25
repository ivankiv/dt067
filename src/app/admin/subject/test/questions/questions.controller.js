(function(){
    'use strict';

    angular.module('app')
        .controller('QuestionsController', questionsController);
        questionsController.$inject = ['questionsService', '$stateParams', 'testService', '$uibModal', 'ngDialog'];

        function questionsController (questionsService, $stateParams, testService, $uibModal, ngDialog) {
            var self = this;

            //variables
            self.list = {};
            self.currentSubjectId = $stateParams.currentSubjectId;
            self.nameOfType = ['', 'Простий вибір', 'Мульти вибір'];
            self.begin = 0;
            self.showMessageNoEntity = false;

            //variables and methods for pagination
            self.questionsPerPage = 5;
            self.totalQuestions = 0;
            self.currentPage = 1;
            self.pageChanged = pageChanged;


            //methods
            self.getQuestionsRangeByTest = getQuestionsRangeByTest;
            self.countQuestionsByTest = countQuestionsByTest;
            self.deleteQuestions = deleteQuestions;
            self.showAddQuestionForm = showAddQuestionForm;

            activate();

            function activate() {
                getOneTest();
                countQuestionsByTest()
                    .then(pageChanged());
            }

            function getOneTest() {
                return testService.getOneTest($stateParams.currentTestId).then(function(response) {
                    self.currentTest = response.data[0];
                })
            }

            function getQuestionsRangeByTest() {
                questionsService.getQuestionsRangeByTest($stateParams.currentTestId, self.questionsPerPage, self.begin)
                    .then(getRecordsRangeComplete)
            }

            function countQuestionsByTest() {
                return questionsService.countQuestionsByTest($stateParams.currentTestId).then(function(response) {
                    self.totalQuestions = response.data.numberOfRecords;
                })
            }

            function deleteQuestions(question_id) {
                    ngDialog.openConfirm({
                        template: 'app/partials/confirm-delete-dialog.html',
                        plain: false
                    }).then(function() {
                        questionsService.deleteQuestions(question_id).then(function(response) {
                            if(response.data.response === 'ok') {
                                activate();
                            }

                            if(response.status === 400) {
                                ngDialog.open({template: '<div class="ngdialog-message"> \
						            Неможливо видалити завдання яке містить відповіді!</div>'
                                });
                            }
                        });
                    });
            }

            function showAddQuestionForm() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/test/questions/add-question.html',
                    controller: 'QuestionsModalController as questions',
                    backdrop: false,
                    resolve: {
                        currentQuestion: {}
                    }
                });
                modalInstance.result.then(function() {
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Запитання успішно додано!</div>'
                    });
                    self.showMessageNoEntity = false;
                    activate();
                })
            }

            function getRecordsRangeComplete(response) {
                if(response.data.response === 'No records') {
                    self.showMessageNoEntity = true;
                } else {
                    self.list = response.data;
                }
            }

            function pageChanged() {
                self.begin = ((self.currentPage - 1) * self.questionsPerPage);
                questionsService.getQuestionsRangeByTest($stateParams.currentTestId, self.questionsPerPage, self.begin)
                    .then(getRecordsRangeComplete)
            }
        }
}());


(function(){
    'use strict';

    angular.module('app')
        .controller('AnswersController', answersController);
    answersController.$inject = ['answersService', '$stateParams', 'testService', 'ngDialog', '$uibModal'];

    function answersController (answersService, $stateParams, testService, ngDialog, $uibModal) {
        var self = this;

        //variables
        self.currentSubjectId = $stateParams.currentSubjectId;
        self.currentTestId = $stateParams.currentTestId;
        self.list = {};
        self.showMessageNoEntity = false;
        self.question_id = $stateParams.questionId;

        //methods
        self.getQuestionsRangeByTest = getQuestionsRangeByTest;
        self.deleteAnswers = deleteAnswers;
        self.showAddAnswerForm = showAddAnswerForm;
        self.showEditAnswerForm = showEditAnswerForm;

        activate();

        function activate() {
            getQuestionsRangeByTest();
            getQuestionByQuestionID();
        }


        function getQuestionsRangeByTest() {
            answersService.getAnswersByQuestion($stateParams.currentQuestionId)
                .then(getAnswersByQuestionComplete)
        }


        function getAnswersByQuestionComplete(response) {
            if(response.data.response === 'no records') {
                self.showMessageNoEntity = true;
            } else {
                self.list = response.data;
            }
        }

        function getQuestionByQuestionID() {
            answersService.getQuestionByQuestionID(self.question_id)
                .then(getQuestionByQuestionIDComplete)
        }

        function getQuestionByQuestionIDComplete(response) {
            if(response.data.response === 'no records') {
                self.showMessageNoEntity = true;
            } else {
                self.question_text = response.data[0].question_text;
                console.log(response.data[0].type, 'response type');
                if (response.data[0].type === '1'){
                    self.questiontype = 'Простий вибір';
                }else{
                    self.questiontype = 'Мульти вибір';
                }
            }
        }

        function deleteAnswers(answer_id) {
            ngDialog.openConfirm({
                template: 'app/partials/confirm-delete-dialog.html',
                plain: false
            }).then(deleteAnswers);

            function deleteAnswers() {
                answersService.deleteAnswers(answer_id).then(function(response) {
                    if(response.data.response === 'ok') {
                        activate();
                    }

                    if(response.status === 400) {
                        ngDialog.open({template: '<div class="ngdialog-message"> \
                                        Неможливо видалити завдання яке містить відповіді!</div>'
                        });
                    }
                });
            }
        }

        function showAddAnswerForm() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/subject/test/answers/add-answer.html',
                controller: 'AnswersModalController as answers',
                backdrop: false,
                resolve: {
                    currentAnswer: {}
                }
            });
            modalInstance.result.then(function() {
                ngDialog.open({template: '<div class="ngdialog-message"> \
						  Відповідь успішно додано!</div>'
                });
                self.showMessageNoEntity = false;
                activate();
            })
        }

        function showEditAnswerForm(currentAnswer) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/subject/test/answers/edit-answer.html',
                controller: 'AnswersModalController as answers',
                backdrop: false,
                resolve: {
                    currentAnswer: currentAnswer
                }
            });
            modalInstance.result.then(function() {
                ngDialog.open({template: '<div class="ngdialog-message"> \
						  Зміни збережено!</div>'
                });
                self.showMessageNoEntity = false;
                activate();
            })
        }

    }
}());
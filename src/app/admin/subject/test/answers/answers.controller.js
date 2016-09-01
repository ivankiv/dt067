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

        //methods
        self.getQuestionsRangeByTest = getQuestionsRangeByTest;
        self.deleteAnswers = deleteAnswers;
        self.showAddAnswerForm = showAddAnswerForm;

        activate();

        function activate() {
            getQuestionsRangeByTest();
        }


        function getQuestionsRangeByTest() {
            answersService.getAnswersByQuestion($stateParams.currentQuestionId)
                .then(getAnswersByQuestionComplete)
        }


        function getAnswersByQuestionComplete(response) {
            console.log(response,'response');
            if(response.data.response === 'no records') {
                self.showMessageNoEntity = true;
            } else {
                self.list = response.data;
                console.log(self.list,'self-list');
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

    }
}());
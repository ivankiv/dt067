(function(){
    'use strict';

    angular.module('app')
        .controller('QuestionsModalController', questionsModalController);
        questionsModalController.$inject = ['answersService', '$stateParams',  '$uibModalInstance', 'currentAnswer'];

        function questionsModalController(questionsService, $stateParams,  $uibModalInstance, currentAnswer) {
            var self = this;

            //variables
            self.answer = {};
            self.currentAnswer = currentAnswer;
            self.question.attachment = "";
            self.question.test_id = $stateParams.currentTestId;
            self.duplicateEntityMessage = false;
            self.wasNotEditEntityMessage = false;

            //methods
            self.addQuestion = addAnswer;
            self.cancelForm = cancelForm;
            self.updateQuestion = updateAnswer;


            function addQuestion() {
                answersService.addAnswer(self.answer).then(addAnswerComplete)
            }

            function updateQuestion() {
                answersService.editQuestion(self.currentAnswer.question_id, self.currentAnswer ).then(updateAnswerComplete)
            }

            function cancelForm () {
                $uibModalInstance.dismiss();
            }

            function addQuestionComplete(response) {
                if(response.data.response === "ok") {
                    self.question = {};
                    $uibModalInstance.close();
                }
            }

            function updateQuestionComplete(response) {
                if(response.data.response === "ok") {
                    self.currentAnswer = {};
                    $uibModalInstance.close();
                }

                if(response.status === 400 && response.data.response === "Error when update") {
                    self.wasNotEditEntityMessage = true;
                }
            }
        }
}());



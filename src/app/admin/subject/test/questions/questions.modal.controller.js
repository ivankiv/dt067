(function(){
    'use strict';

    angular.module('app')
        .controller('QuestionsModalController', questionsModalController);
        questionsModalController.$inject = ['questionsService', '$stateParams',  '$uibModalInstance', 'currentQuestion', 'question'];

        function questionsModalController(questionsService, $stateParams,  $uibModalInstance, currentQuestion, question) {
            var self = this;

            //variables
            self.question = {};
            self.currentQuestion = currentQuestion;
            self.question.attachment = "";
            self.questionsSrc = question;
            self.question.test_id = $stateParams.currentTestId;
            self.duplicateEntityMessage = false;
            self.wasNotEditEntityMessage = false;

            //methods
            self.addQuestion = addQuestion;
            self.cancelForm = cancelForm;
            self.updateQuestion = updateQuestion;
            self.deleteAttachment = deleteAttachment;


            function addQuestion() {
                questionsService.addQuestion(self.question).then(addQuestionComplete)
            }

            function updateQuestion() {
                questionsService.editQuestion(self.currentQuestion.question_id, self.currentQuestion).then(updateQuestionComplete)
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
            function deleteAttachment () {
                self.question.attachment = '';
                self.currentQuestion.attachment = '';
            }

            function updateQuestionComplete(response) {
                if(response.data.response === "ok") {
                    self.currentQuestion = {};
                    $uibModalInstance.close();
                }

                if(response.status === 400 && response.data.response === "Error when update") {
                    self.wasNotEditEntityMessage = true;
                }
            }
        }
}());



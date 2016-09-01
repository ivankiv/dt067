(function(){
    'use strict';

    angular.module('app')
        .controller('AnswersModalController', answersModalController);
        answersModalController.$inject = ['answersService', '$stateParams',  '$uibModalInstance', 'currentAnswer'];

        function answersModalController(answersService, $stateParams,  $uibModalInstance, currentAnswer) {
            var self = this;

            //variables
            self.answer = {};
            self.currentAnswer = currentAnswer;
            self.answer.attachment = "";
            self.answer.question_id = $stateParams.currentTestId;
            self.duplicateEntityMessage = false;
            self.wasNotEditEntityMessage = false;

            //methods
            self.addAnswer = addAnswer;
            self.cancelForm = cancelForm;
            // self.updateAnswer = updateAnswer;


            function addAnswer() {
                answersService.addAnswer(self.answer).then(addAnswerComplete)
            }

            function updateQuestion() {
                answersService.editQuestion(self.currentAnswer.question_id, self.currentAnswer ).then(updateAnswerComplete)
            }

            function cancelForm () {
                $uibModalInstance.dismiss();
            }

            function addAnswerComplete(response) {
                if(response.data.response === "ok") {
                    self.answer = {};
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



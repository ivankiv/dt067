(function(){
    'use strict';

    angular.module('app')
        .controller('AnswersModalController', answersModalController);
        answersModalController.$inject = ['answersService', '$stateParams',  '$uibModalInstance', 'currentAnswer', 'answerSrc'];

        function answersModalController(answersService, $stateParams,  $uibModalInstance, currentAnswer, answerSrc) {
            var self = this;

            //variables
            self.answer = {};
            self.currentAnswer = currentAnswer;
            self.answer.attachment = "";
            self.answer.question_id = $stateParams.questionId;
            self.duplicateEntityMessage = false;
            self.wasNotEditEntityMessage = false;
            self.answerSrc = answerSrc;


            //methods
            self.addAnswer = addAnswer;
            self.cancelForm = cancelForm;
            self.updateAnswer = updateAnswer;


            function addAnswer() {
                answersService.addAnswer(self.answer).then(addAnswerComplete)
            }

            function updateAnswer() {
                answersService.editAnswer(self.currentAnswer.answer_id, self.currentAnswer ).then(updateAnswerComplete)
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

            function updateAnswerComplete(response) {
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



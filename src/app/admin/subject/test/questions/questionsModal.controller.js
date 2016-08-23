(function(){
    'use strict';

    angular.module('app')
        .controller('QuestionsModalController', questionsModalController);
        questionsModalController.$inject = ['questionsService', '$stateParams',  '$uibModalInstance', 'currentQuestion'];

        function questionsModalController(questionsService, $stateParams,  $uibModalInstance, currentQuestion) {
            var self = this;

            //variables
            self.question = {};
            self.question.attachment = "";
            self.question.test_id = $stateParams.currentTestId;
            self.duplicateEntityMessage = false;
            self.wasNotEditEntityMessage = false;

            //methods
            self.addQuestion = addQuestion;
            self.cancelForm = cancelForm;


            function addQuestion() {
                questionsService.addQuestion(self.question).then(addQuestionComplete)
            }

            function cancelForm () {
                $uibModalInstance.dismiss();
            }

            function addQuestionComplete(response) {
                if(response.data.response === "ok") {
                    self.question = {};
                    $uibModalInstance.close();
                }

                if(response.status === 400) {
                    self.duplicateEntityMessage = true;
                }
            }
        }
}());



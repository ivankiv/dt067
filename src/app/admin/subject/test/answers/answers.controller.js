(function(){
    'use strict';

    angular.module('app')
        .controller('AnswersController', answersController);
    answersController.$inject = ['answersService', '$stateParams', 'testService'];

    function answersController (answersService, $stateParams, testService) {
        var self = this;

        //variables
        self.currentSubjectId = $stateParams.currentSubjectId;
        self.list = {};
        self.showMessageNoEntity = false;

        //methods
        self.getQuestionsRangeByTest = getQuestionsRangeByTest;

        activate();

        function activate() {

        }

        function getQuestionsRangeByTest() {
            answersService.getAnswersByQuestion($stateParams.currentQuestionId)
                .then(getAnswersByQuestionComplete)
        }


        function getAnswersByQuestionComplete(response) {
            if(response.data.response === 'No records') {
                self.showMessageNoEntity = true;
            } else {
                self.list = response.data;
            }
        }
    }
}());
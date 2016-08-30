(function(){
    'use strict';

    angular.module('app')
        .controller('AnswersController', answersController);
    answersController.$inject = ['answersService', '$stateParams', 'testService'];

    function answersController (answersService, $stateParams, testService) {
        var self = this;

        //variables
        self.currentSubjectId = $stateParams.currentSubjectId;
        self.currentTestId = $stateParams.currentTestId;
        self.list = {};
        self.showMessageNoEntity = false;

        //methods
        self.getQuestionsRangeByTest = getQuestionsRangeByTest;

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
    }
}());
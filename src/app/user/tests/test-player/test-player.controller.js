
(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);

    TestPlayerController.$inject = ['$state', 'loginService', 'testDetailsService', '$stateParams', 'questionsService', 'testService','testPlayerService', '$interval','$timeout'];

    function TestPlayerController ($state, loginService, testDetailsService, $stateParams, questionsService, testService, testPlayerService,$interval, $timeout) {

        var self = this;

        //variables
        self.user_id = 0;
        self.questionId = $stateParams.currentQuestionId;
        self.groupId = $stateParams.groupId;
        self.listOfQuestions = [];
        self.listOfQuestionsId = JSON.parse(localStorage.currentQuestionsId);
        self.checked;
        self.currentTest = JSON.parse(localStorage.currentTest);
        self.endTime =JSON.parse(localStorage.endTime);
        self.test_id = self.currentTest.test_id;

        self.currentQuestion_index = 0;

        self.timerValue= 0;

        //methods
        self.getTimerValue;
        self.chooseQuestion = chooseQuestion;

        activate();

        function activate() {
            isLogged();
            $timeout(function () {console.log(self.listOfQuestionsId)},1000);
            getTimerValue();
        }
        
        function chooseQuestion(question_id, question_index) {
            self.currentQuestion_index = question_index;
            $state.go('test.question', {currentQuestionId: question_id});
        }
        
         function getTimerValue () {
             $interval(function () {
                 self.timerValue = self.endTime -new Date().valueOf();
                 if(self.timerValue<=0) {
                     finishTest();
                 }
             }, 1000);
         }

        function isLogged() {
            return loginService.isLogged().then(function(response) {
                self.user_id = response.data.id;
            });
        }

        function finishTest() {
           console.log("finish test");
            testPlayerService.checkAnswersList(self.listOfQuestionsId);
        }
    }
}());


(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);

    TestPlayerController.$inject = ['$state','loginService','$stateParams','questionsService','testPlayerService', '$interval','$q','$timeout'];

    function TestPlayerController ($state, loginService, $stateParams, questionsService, testPlayerService,$interval, $q, $timeout) {

        var self = this;

        //variables
        self.user_id = 0;
        self.currentQuestion = {};

        self.checked;
        self.endTime =JSON.parse(localStorage.endTime);
        self.currentQuestion_index = $stateParams.questionIndex;
        self.timerValue= 0;
        self.listOfQuestionsId = JSON.parse(localStorage.currentQuestionsId);
        self.currentTest = JSON.parse(localStorage.currentTest);
        self.questionId = self.listOfQuestionsId[self.currentQuestion_index].question_id;
        self.test_id = self.currentTest.test_id;

        //methods
        self.getTimerValue;
        self.chooseQuestion = chooseQuestion;

        activate();

        function activate() {
            getCurrentQuestion().then(function () {
                    console.log('questio= ',self.currentQuestion);
                    console.log('questionId= ',self.questionId);
                    console.log("arr =",self.listOfQuestionsId );
            });
            isLogged();
            getTimerValue();

        }

        function init() {
            var defer = $q.defer();
            $timeout(defer.resolve([JSON.parse(localStorage.currentQuestionsId), JSON.parse(localStorage.currentTest)]),500);
            return defer.promise;
        }
        function chooseQuestion(question_index) {
            questionsId[self.currentQuestion_index].answer_ids = [];
            localStorage.setItem("currentQuestionsId", JSON.stringify(questionsId));
            if(question_index === self.listOfQuestionsId.length -1){
                $state.go('test', {questionIndex:0});
            }
            $state.go('test', {questionIndex:question_index});
        }

        function getCurrentQuestion() {
            return questionsService.getQuestionById(self.questionId)
                .then(
                    function (response) {
                        self.currentQuestion = response.data[0];
                    }
                );
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

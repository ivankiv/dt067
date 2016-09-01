
(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);

    TestPlayerController.$inject = ['$state', 'loginService', 'testDetailsService', '$stateParams', 'questionsService', 'testService', 'scheduleService', 'testPlayerService', 'adminService', '$uibModal', '$interval'];

    function TestPlayerController ($state, loginService, testDetailsService, $stateParams, questionsService, testService, scheduleService, testPlayerService, adminService, $uibModal, $interval) {

        var self = this;

        //variables
        self.user_id = 0;
        self.questionId = $stateParams.currentQuestionId;
        self.groupId = $stateParams.groupId;
        self.listOfQuestions = [];
        self.checked;
        self.currentTest = JSON.parse(localStorage.currentTest);
        self.test_id = self.currentTest.test_id;
        self.timerValue;
        self.testDuration = self.currentTest.time_for_test * 60000;
        self.currentQuestion_index = 0;

        //methods
        self.getTimerValue;
        self.chooseQuestion = chooseQuestion;

        activate();

        function activate() {
            isLogged()
                .then(getTestDetailsByTest);
            getTimerValue();
        }
        
        function chooseQuestion(question_id, question_index) {
            self.currentQuestion_index = question_index;
            $state.go('test.question', {currentQuestionId: question_id});
        }
        
         function getTimerValue () {
             $interval(function () {
                 return self.timerValue = self.testDuration -= 1000;
             }, 1000);
         }

        function isLogged() {
            return loginService.isLogged().then(function(response) {
                self.user_id = response.data.id;
            });
        }

        function getTestDetailsByTest() {
            testDetailsService.getTestDetailsByTest(self.test_id).then(getTestDetailsByTestComplete)
        }
        function getTestDetailsByTestComplete(response) {
                angular.forEach(response.data, function(testDetail) {
                    getQuestionsByLevelRand(testDetail.level, testDetail.tasks);
                });
        }

        function getQuestionsByLevelRand(levelOfQuestion, numberOfQuestions) {
            questionsService.getQuestionsByLevelRand(self.test_id, levelOfQuestion, numberOfQuestions)
                .then(function(response) {
                    angular.forEach(response.data, function(question) {
                        self.listOfQuestions.push(question);
                    });
                    console.log(self.listOfQuestions);

                    angular.forEach(self.listOfQuestions, function(question, index) {
                        question.index = index + 1;
                    });
                });
        }

    }
}());

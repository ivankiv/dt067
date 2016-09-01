
(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);

    TestPlayerController.$inject = ['loginService', 'testDetailsService', '$stateParams', 'questionsService', 'testService', 'scheduleService', 'testPlayerService', 'adminService', '$uibModal', '$interval'];

    function TestPlayerController (loginService, testDetailsService, $stateParams, questionsService, testService, scheduleService, testPlayerService, adminService, $uibModal, $interval) {

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
        self.timerValue= 0;
        self.getTimerValue;

        //methods


        activate();

        function activate() {
            isLogged()
                .then(getTestDetailsByTest);
            getTimerValue();
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

                    angular.forEach(self.listOfQuestions, function(question, index) {
                        question.index = index + 1;
                    });
                });
        }

        function finishTest() {
           console.log("finish test");
            testPlayerService.checkAnswersList(self.listOfQuestionsId);
        }
    }
}());

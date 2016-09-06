
(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);

    TestPlayerController.$inject = ['$state','loginService','$stateParams','questionsService','testPlayerService', '$interval','$uibModal'];

    function TestPlayerController ($state, loginService, $stateParams, questionsService, testPlayerService,$interval, $uibModal) {

        var self = this;

        //variables
        self.user_id = 0;
        self.currentQuestion = {};
        self.currentAnswerArray = {};

        self.checked;
        self.endTime =JSON.parse(localStorage.endTime);
        self.currentQuestion_index = $stateParams.questionIndex;
        self.timerValue= 0;
        self.listOfQuestionsId = JSON.parse(localStorage.currentQuestionsId);
        self.currentTest = JSON.parse(localStorage.currentTest);
        self.test_id = self.currentTest.test_id;
        self.timerBackground = '';
        self.typeOfQuestion;
        self.checkedAnswers = self.listOfQuestionsId[self.currentQuestion_index].answer_ids;
        self.questionId = self.listOfQuestionsId[self.currentQuestion_index].question_id;
        self.startBackendTime;
        self.currentBackendTime;
        self.testDuration;

        //methods
        self.getTimerValue;
        self.chooseQuestion = chooseQuestion;
        self.getCurrentAnswersList = getCurrentAnswersList;
        self.toggleSelection = toggleSelection;
        self.calculateResultOfTest = calculateResultOfTest;
        self.finishTest = finishTest;
        self.getTestDuration = getTestDuration;

        activate();

        function activate() {
            isLogged();
            getCurrentQuestion();
            getTimerValue();
            getCurrentAnswersList();
        }

        function getCurrentAnswersList() {
            return testPlayerService.getAnswersListByQuestionId(self.questionId)
                .then(function (response) {
                        self.currentAnswerArray = response.data;
                    }
                );
        }

        function chooseQuestion(question_index) {

            self.listOfQuestionsId[self.currentQuestion_index].answer_ids = self.checkedAnswers;
            localStorage.setItem("currentQuestionsId", JSON.stringify(self.listOfQuestionsId));

            if(question_index == (self.listOfQuestionsId.length)){
                var newIndex = 0;
                $state.go('test', {questionIndex:newIndex});
            }
            else {
                $state.go('test', {questionIndex:question_index});
            }
        }

        function getCurrentQuestion() {
            return questionsService.getQuestionById(self.questionId)
                .then(
                    function (response) {
                        self.currentQuestion = response.data[0];
                        self.typeOfQuestion = self.currentQuestion.type;
                    }
                );
        }
        function getTimerValue () {
            var timer = $interval(function () {
                self.timerValue = self.endTime -new Date().valueOf();
                if (self.timerValue > 60000){
                    self.timerBackground = 'norm-color';
                } else if (self.timerValue <= 60000 && self.timerValue > 0){
                    self.timerBackground = 'danger-color';
                } else if (self.timerValue <= 0) {
                    $interval.cancel(timer);
                    finishTest();
                }
            }, 100);
        }

        // getting start test time in backend
        function getStartBackendTime () {
            return testPlayerService.getServerTime()
                .then(function (response) {
                    self.startBackendTime = response.data.curtime * 1000;
                });
        }

        // getting test duration
        function getTestDuration() {
            return testService.getOneTest(self.test_id)
                .then(function (response) {
                    self.testDuration = response.data[0].time_for_test;
                });
        }

        // checking if user doesn't hack test time
        function checkServerTime () {
            testPlayerService.getServerTime()
                .then(function (response) {
                    self.currentBackendTime = response.data.curtime * 1000;
                });
            if (self.currentBackendTime - self.startBackendTime > self.testDuration) {
                finishTest();
            }
        }


        function isLogged() {
            return loginService.isLogged().then(function(response) {
                self.user_id = response.data.id;
            });
        }

        function toggleSelection(answer_id) {
            var idx = self.checkedAnswers.indexOf(answer_id);

            // is currently selected
            if (idx > -1) {
                self.checkedAnswers.splice(idx, 1);
            }

            // is newly selected
            else {
                self.checkedAnswers.push(answer_id);
            }
        }

        function finishTest() {
            $uibModal.open({
                templateUrl: 'app/modal/templates/end-test-dialog.html',
                controller: 'modalController as modal',
                backdrop: true
            });
            var listOfQuestionsId = JSON.parse(localStorage.currentQuestionsId);
            console.log('listOfQuestionsId', listOfQuestionsId);
            testPlayerService.checkAnswersList(listOfQuestionsId).then(function(response) {
                console.log('calculateResultOfTest(response.data)', calculateResultOfTest(response.data));
            });
            $state.go('user.results');
        }

        function calculateResultOfTest(response) {
            var result = 0;
            var rates = JSON.parse(localStorage.rateByQuestionsId);
            var score = [];
            rates.forEach(function(item, index) {
                if(item !== null) score[index] = item;
            });

            angular.forEach(response, function(item) {
                result += score[item.question_id] * item.true;
            });

            return result;
        }
    }
}());
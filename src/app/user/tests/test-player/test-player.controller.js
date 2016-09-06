
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

        //methods
        self.getTimerValue;
        self.chooseQuestion = chooseQuestion;
        self.getCurrentAnswersList = getCurrentAnswersList;
        self.toggleSelection = toggleSelection;
        self.calculateResultOfTest = calculateResultOfTest;
        self.finishTest = finishTest;

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
                $interval.cancel(self.timer);
                $state.go('test', {questionIndex:newIndex});
            }
            else {
                $interval.cancel(self.timer);
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
            self.timer = $interval(function () {
                self.timerValue = self.endTime -new Date().valueOf();
                if (self.timerValue > 60000){
                    self.timerBackground = 'norm-color';
                } else if (self.timerValue <= 60000 && self.timerValue > 0){
                    self.timerBackground = 'danger-color';
                } else if (self.timerValue <= 0) {
                    $interval.cancel(self.timer);
                    finishTest();
                }
            }, 100);
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
            testPlayerService.checkAnswersList(listOfQuestionsId)
                .then(function(response) {
                    return calculateResultOfTest(response.data);
                })
                .then(function(resultOfTest) {
                    saveResult(resultOfTest);
                    localStorage.setItem('resultOfTest', JSON.stringify(resultOfTest));
                    $state.go('user.results');
                })
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

        function saveResult(resultOfTest) {
            var result = {
                student_id:   self.user_id,
                test_id:      self.test_id,
                session_date: new Date(response.startTimeTest*1000).toISOString().split('T')[0],
                start_time:   new Date(response.startTimeTest*1000).toISOString().substr(11,8),
                end_time:     new Date().toString().substr(16,8),
                result:       resultOfTest,
                questions:    questions,
                true_answers: trueAnswers,
                answers:      answers
            };

            testPlayerService.checkAnswersList(result).then(function(response) {
                console.log(response);
            })

        }
    }
}());
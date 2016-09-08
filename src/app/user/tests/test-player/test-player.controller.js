
(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);

    TestPlayerController.$inject = ['$state','loginService','$stateParams','questionsService','testPlayerService', '$interval','$uibModal','$q'];

    function TestPlayerController ($state, loginService, $stateParams, questionsService, testPlayerService,$interval, $uibModal,$q) {

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
        self.currentBackendTime;
        self.questionsIdForResult = [];
        self.answersIdForResult = [];
        self.true_answers = [];

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
                        self.currentAnswerArray = testPlayerService.mixAnswers(response.data);
                    }
                );
        }

        function chooseQuestion(question_index) {
            checkServerTime ();
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
                self.timerValue = self.endTime - new Date().valueOf();
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

        // getting end test time in backend
        function getEndBackendTime () {
           return testPlayerService.getServerEndTime()
                .then(function (response) {
                    self.endBackendTime = response.data;
                    self.endBackendTime = parseInt(self.endBackendTime);
                });
        }

        function getServerTime() {
            return testPlayerService.getServerTime()
                .then(function (response) {
                    self.currentBackendTime = response.data.unix_timestamp * 1000;
                });
        }

        // checking if user doesn't hack test time
        function checkServerTime () {
            $q.all([getEndBackendTime(),getServerTime()])
                .then(function (){
                    var duration = self.endBackendTime - self.currentBackendTime;
                    if ( duration <= 0 ){
                        finishTest();
                    }
                });
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
            $interval.cancel(self.timer);
            $uibModal.open({
                templateUrl: 'app/modal/templates/end-test-dialog.html',
                controller: 'modalController as modal',
                backdrop: true
            });
            var listOfQuestionsId = JSON.parse(localStorage.currentQuestionsId);
             self.questionsIdForResult = listOfQuestionsId.map(function(question) {
                 return question.question_id;
             });

            self.answersIdForResult = listOfQuestionsId.map(function(question) {
                return question.answer_ids;
            });

            testPlayerService.checkAnswersList(listOfQuestionsId)
                .then(function(response) {
                    self.true_answers = response.data.filter(function(item) {
                        return item.true == 1;
                    }).map(function(item) {
                        return item.question_id;
                    });

                    //get rate of questions for calculating result of test, which were stored on the server before.
                    return calculateResultOfTest(response.data);
                })
                .then(function(resultOfTest) {
                    saveResult(resultOfTest)
                        .then(function () {
                            $state.go('user.results');
                    })
                })
        }

        function calculateResultOfTest(answers) {
            var deferred = $q.defer();

            //get rate of questions for calculating result of test, which were stored on the server before.
            testPlayerService.getRateOfQuestion().then(function(response) {
                var result = 0;
                var score = [];

                angular.forEach(response.data, function(item, index) {
                    if(item !== null) score[index] = item;
                });

                angular.forEach(answers, function(item) {
                    result += score[item.question_id] * item.true;
                });

                deferred.resolve(result);
            });

            return deferred.promise;
        }

        function saveResult(resultOfTest) {
            var questionsIdForResult =angular.toJson(self.questionsIdForResult);
            var true_answers = angular.toJson(self.true_answers);
            var answersIdForResult = angular.toJson(self.listOfQuestionsId);
            var startTime = new Date(localStorage.startTime*1000).toTimeString().split(" ")[0];
            return getServerTime()
                .then(function () {
                    var endTime = new Date(self.currentBackendTime).toTimeString().split(" ")[0];
                    var result = {
                        student_id:   self.user_id,
                        test_id:      self.test_id,
                        session_date: new Date(),
                        start_time:   startTime,
                        end_time:     endTime,
                        result:       resultOfTest,
                        questions:    questionsIdForResult,
                        true_answers: true_answers,
                        answers:      answersIdForResult
                    };
                   return testPlayerService.saveResult(result);
            })
        }
    }
}());
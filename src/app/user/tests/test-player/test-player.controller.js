
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

        activate();

        function activate() {
            getCurrentQuestion().then(function () {
                    console.log('questio= ',self.currentQuestion);
                    console.log('questionId= ',self.questionId);
                    console.log("arr =",self.listOfQuestionsId );
            });
            isLogged();
            getTimerValue();
            getCurrentAnswersList();
            //calculateResultOfTest();
        }

        function getCurrentAnswersList() {
            return testPlayerService.getAnswersListByQuestionId(self.questionId)
                .then(function (response) {
                    self.currentAnswerArray = response.data;
                    self.answerId =
                    console.log(self.currentAnswerArray);
                    console.log("questionID-", self.questionId);
                    }
                );
        }

        function chooseQuestion(question_index) {

            console.log("y",question_index);
            self.listOfQuestionsId[self.currentQuestion_index].answer_ids = self.checkedAnswers;
            localStorage.setItem("currentQuestionsId", JSON.stringify(self.listOfQuestionsId));
            console.log("y",typeof(question_index));
            console.log("x",self.listOfQuestionsId.length-1);
            if(question_index == (self.listOfQuestionsId.length -1)){
                console.log("!!!!!!!!!!!!!");
                var newIndex = 0;
                $state.go('test', {questionIndex:newIndex});
            }
            $state.go('test', {questionIndex:question_index});
        }

        function getCurrentQuestion() {
            return questionsService.getQuestionById(self.questionId)
                .then(
                    function (response) {
                        self.currentQuestion = response.data[0];
                        self.typeOfQuestion = self.currentQuestion.type;
                        console.log(self.typeOfQuestion);
                    }
                );
        }
         function getTimerValue () {
             $interval(function () {
                 self.timerValue = self.endTime -new Date().valueOf();
                 if (self.timerValue > 60000){
                     self.timerBackground = 'norm-color';
                 } else if (self.timerValue <= 60000){
                     self.timerBackground = 'danger-color';
                 } else if (self.timerValue <= 0) {
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
           console.log("finish test");
            testPlayerService.checkAnswersList(self.listOfQuestionsId);
        }

        function calculateResultOfTest(response) {
            var result = 0;
            var rates = JSON.parse(localStorage.rateByQuestionsId);
            var score = [];
            rates.forEach(function(item, index) {
                if(item !== null) score[index] = item;
            });

            //var res = [{"question_id":1,"true":0},{"question_id":7,"true":1},{"question_id":8,"true":0},
            //            {"question_id":9,"true":1},{"question_id":10,"true":1}];

            angular.forEach(response.data, function(item) {
                result += score[item.question_id] * item.true;
            });
        }
    }
}());

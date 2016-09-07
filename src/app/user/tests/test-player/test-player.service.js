(function () {
    'use strict';
        angular.module('app')
            .factory('testPlayerService',testPlayerService);

    testPlayerService.$inject = ['$http','appConstants'];

    function testPlayerService($http ,appConstants) {

        var self = this;
        self.pastAttemps = undefined;

        return {
            checkAttemptsOfUser: checkAttemptsOfUser,
            checkAnswersList: checkAnswersList,
            getAnswersListByQuestionId: getAnswersListByQuestionId,
            getServerTime: getServerTime,
            setServerEndTime: setServerEndTime,
            getServerEndTime: getServerEndTime,
            startTestInfoInLog:startTestInfoInLog,
            saveResult: saveResult,
            mixAnswers:mixAnswers,
            setRateOfQuestion: setRateOfQuestion,
            getRateOfQuestion: getRateOfQuestion

        };

        function setServerEndTime(testDuration) {
            $http.post(appConstants.resetSessionData)
                .then(getServerTime().then(function (response) {
                    var testEndTime = response.data.curtime * 1000 + testDuration;
                    testEndTime = testEndTime.toString();
                    $http.post(appConstants.saveEndTime, testEndTime)
                        .then(fulfilled, rejected);
                }));

        }

        function setRateOfQuestion(listOfRates) {
            return $http.post(appConstants.saveTestPlayerData, angular.toJson(listOfRates))
                        .then(fulfilled, rejected);
        }

        function getRateOfQuestion() {
            return $http.get(appConstants.getTestPlayerData)
                .then(fulfilled, rejected);
        }

        function getServerTime () {
            return $http.get(appConstants.getServerTime)
                .then(fulfilled, rejected);
        }

        function getServerEndTime () {
            return $http.get(appConstants.getEndTime)
                .then(fulfilled, rejected);
        }

        function checkAttemptsOfUser(user_id,currentTest) {
              return getPastAttempts(user_id, currentTest.test_id)
                   .then(function () {
                       var attempts = parseInt(currentTest.attempts);
                       var pastAttemps = parseInt(self.pastAttemps);
                        return pastAttemps >= attempts;
              });
        }

        function getPastAttempts(user_id, test_id) {
            return $http.get(appConstants.countTestPassesByStudent + user_id + "/" + test_id)
                .then(function (response) {
                    self.pastAttemps = response.data.numberOfRecords;
                });
        }

        function startTestInfoInLog(user_id,test_id) {
            return $http.post(appConstants.startTestInfoInLog + user_id + "/" + test_id)
                .then(fulfilled,rejected);
        }

        function getAnswersListByQuestionId (questionId) {
            return $http.get(appConstants.getAnswersListByQuestionId + questionId)
                .then(fulfilled, rejected);
        }

        function checkAnswersList(answers) {
           return $http.post(appConstants.checkAnswers,answers).then(fulfilled,rejected);
        }

        function saveResult(result) {
            return $http.post(appConstants.saveResult, result)
                .then(fulfilled, rejected);
        }

        function mixAnswers(answers) {
            var currentIndex = answers.length;
            var temporaryValue;
            var randomIndex;

            while (0 !== currentIndex){
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = answers[currentIndex];
                answers[currentIndex] = answers[randomIndex];
                answers[randomIndex] = temporaryValue;
            }

            return answers;
        }

        function fulfilled(response) {
            return response;
        }

        function rejected(response) {
            return response;
        }
    }
}());

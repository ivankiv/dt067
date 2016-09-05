(function () {
    'use strict';
        angular.module('app')
            .factory('testPlayerService',testPlayerService);

    testPlayerService.$inject = ['$http','appConstants','testService','testDetailsService'];

    function testPlayerService($http ,appConstants ,testService ,testDetailsService) {

        var self = this;
        self.pastAttemps = undefined;

        return {
            checkAttemptsOfUser: checkAttemptsOfUser,
            checkAnswersList: checkAnswersList,
            getAnswersListByQuestionId: getAnswersListByQuestionId
        };

        function checkAttemptsOfUser(user_id,currentTest) {
              return getPastAttempts(user_id, currentTest.test_id)
                   .then(function () {
                        return self.pastAttemps >= currentTest.attempts;
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
            $http.post(appConstants.checkAnswers,answers).then(fulfilled,rejected);
        }

        function mixAnswers(answers) {
            var currentIndex = answers.length,temporaryValue,randomIndex;

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

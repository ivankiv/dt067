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
            checkAnswersList:checkAnswersList
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

        function checkAnswersList(answers) {
            $http.post(appConstants.checkAnswers,answers).then(fulfilled,rejected);
        }

        function fulfilled(response) {
            return response;
        }

        function rejected(response) {
            return response;
        }
    }
}());

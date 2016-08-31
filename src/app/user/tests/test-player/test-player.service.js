(function () {
    'use strict';
        angular.module('app')
            .factory('testPlayerService',testPlayerService);

    testPlayerService.$inject = ['$http','appConstants','testService','testDetailsService'];

    function testPlayerService($http ,appConstants ,testService ,testDetailsService) {

        var self = this;
        self.currentTest = {};
        self.pastAttemps = undefined;
        return {
            checkAttemptsOfUser: checkAttemptsOfUser
        };

        function checkAttemptsOfUser(user_id,test_id) {
            return getCurrentTest(test_id)
                .then(function () {
                    return getPastAttempts(user_id, test_id)
                        .then(function () {
                            return self.pastAttemps >= self.currentTest.attempts;
                        });
                    });
        }

        function getCurrentTest(test_id) {
            return testService.getOneTest(test_id)
                .then(function (response) {
                    self.currentTest = response.data[0];
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

        function fulfilled(response) {
            return response;
        }

        function rejected(response) {
            return response;
        }
    }
}());

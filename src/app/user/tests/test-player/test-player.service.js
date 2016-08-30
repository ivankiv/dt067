(function () {
    'use strict';
        angular.module('app')
            .factory('testPlayerService',testPlayerService);

    testPlayerService.$inject = ['$http','appConstants','testService','testDetailsService'];

    function testPlayerService($http ,appConstants ,testService ,testDetailsService) {

        var self = this;
        self.currentTest = {};
        return{
            checkAttemptsOfUser: checkAttemptsOfUser
        };



        function checkAttemptsOfUser(user_id,test_id) {
            testService.getOneTest(test_id).then(function (response) {
                console.log(response);
                self.currentTest = response.data;
            }).then(function (response) {
                    console.log(response);
                    $http.get(appConstants.countTestPassesByStudent + user_id + "/" + test_id).then(function (response) {
                                    console.log(response);
                                    return response.data.numberOfRecords >= currentTest.attempts;
                            })
                    })
        }

        function fulfilled(response) {
            return response;
        }

        function rejected(response) {
            return response;
        }
    }
}());

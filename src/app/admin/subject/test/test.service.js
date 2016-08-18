(function() {
    'use strict';

    angular.module('app')
        .factory('testService', testService);
    testService.$inject = ['$http', 'appConstants'];

    function testService ($http, appConstants) {
        return {
            getTests: getTests,
            getTestById: getTestById,
            addTest: addTest,
            updateTest: updateTest,
            deleteTest: deleteTest,
            getOneTest: getOneTest
        };

        function getTests() {
            return $http.get(appConstants.getTests)
                .then(fulfilled, rejected);
        }

        function getTestById(currentSubjectId) {
            return $http.get(appConstants.getTestsById + currentSubjectId)
                .then(fulfilled, rejected);
        }

        function addTest(data) {
            return $http.post(appConstants.addTest, data)
                .then(fulfilled, rejected);
        }

        function deleteTest(testId) {
            return $http.delete(appConstants.delTest + testId)
                .then(fulfilled, rejected);
        }

        function updateTest(testId, data) {
            return $http.post(appConstants.editTest + testId, data)
                .then(fulfilled, rejected);
        }

        function getOneTest(id) {
            return $http.get(appConstants.getTests +"/" + id)
                .then(fulfilled, rejected);
        }

        function fulfilled(response) {
            return response;
        }
        function rejected(response) {
            return response;
        }
    }
}());

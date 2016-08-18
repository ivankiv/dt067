(function() {
    'use strict';

    angular.module('app')
        .factory('testDetailsService', testDetailsService);
        testDetailsService.$inject = ['$http', 'appConstants'];

        function testDetailsService ($http, appConstants) {
            return {
                getTestDetailsByTest: getTestDetailsByTest,
                addTestDetails: addTestDetails,
                deleteTestDetails: deleteTestDetails
            };

            function getTestDetailsByTest(test_id) {
                return $http.get(appConstants.getTestDetailsByTest + test_id)
                    .then(fulfilled, rejected);
            }

            function addTestDetails(data) {
                return $http.post(appConstants.addTestDetails, data)
                    .then(fulfilled, rejected);
            }

            function deleteTestDetails(id) {
                return $http.delete(appConstants.deleteTestDetails + id)
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


(function() {
    'use strict';

    angular.module('app')
        .factory('facultyFactory', facultyFctr);
    facultyFctr.$inject = ['$http', 'appConstants', '$state'];

    function facultyFctr ($http, appConstants) {
        return {
            getFaculties: getFaculties,
            countFaculties: countFaculties,
            getRecordsRange: getRecordsRange
        };

        function getFaculties() {
            return $http.get(appConstants.getFaculties)
        }
        function countFaculties() {
            return $http.get(appConstants.countFaculties)
        }
        function getRecordsRange() {
            return $http.get(appConstants.getRangeOfFacultiesURL)
        }
    }
})();
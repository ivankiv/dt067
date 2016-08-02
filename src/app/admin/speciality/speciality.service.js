(function() {
    'use strict';

    angular.module('app')
        .factory('specialityService', specialityService);
    specialityService.$inject = ['$http', 'appConstants', '$state'];

    function specialityService ($http, appConstants, $state) {
        return {
            getSpecialities: getSpecialities,
            countSpecialities: countSpecialities,
            getRecordsRange: getRecordsRange,
            addSpeciality: addSpeciality
        };

        function getSpecialities() {
            return $http.get(appConstants.getSpecialities)
                .then(fulfilled, rejected);
        }
        function countSpecialities() {
            return $http.get(appConstants.countSpecialities)
                .then(fulfilled, rejected);
        }
        function getRecordsRange(quantity, begin) {
            return $http.get(appConstants.getRangeOfSpecialities + "/" + quantity +"/" + begin)
                .then(fulfilled, rejected);
        }
        function addSpeciality(data) {
            return $http.post(appConstants.addSpeciality, data)
                .then(fulfilled, rejected);
        }

        function fulfilled(response) {
            return response;
        }
        function rejected(response) {
            return response;
        }
    }
})();

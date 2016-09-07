(function() {
    'use strict';

    angular.module('app')
        .factory('specialityService', specialityService);
    specialityService.$inject = ['$http', 'appConstants'];

    function specialityService ($http, appConstants) {
        return {
            getSpecialities: getSpecialities,
            countSpecialities: countSpecialities,
            getRecordsRange: getRecordsRange,
            addSpeciality: addSpeciality,
            deleteSpeciality: deleteSpeciality,
            editSpeciality: editSpeciality
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
        function deleteSpeciality(speciality_id) {
            return $http.delete(appConstants.delSpeciality + speciality_id)
                .then(fulfilled,rejected);
        }
        function editSpeciality(speciality_id,data) {
            return $http.post(appConstants.editSpeciality + speciality_id,data)
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

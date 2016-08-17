(function() {
    'use strict';

    angular.module('app')
        .factory('adminStatisticService', adminStatisticService);
    adminStatisticService.$inject = ['$http', 'appConstants'];

    function adminStatisticService ($http, appConstants) {
        return {
            getFacultiesQuantity: getFacultiesQuantity,
            getSpecialitiesQuantity: getSpecialitiesQuantity,
            getGroupsQuantity: getGroupsQuantity,
            getStudentsQuantity: getStudentsQuantity,
            getSubjectsQuantity: getSubjectsQuantity,
            getTestsQuantity: getTestsQuantity
        };

        function getFacultiesQuantity() {
            return $http.get(appConstants.countFaculties)
                .then(fulfilled, rejected);
        }

        function getSpecialitiesQuantity() {
            return $http.get(appConstants.countSpecialities)
                .then(fulfilled, rejected);
        }

        function getGroupsQuantity() {
            return $http.get(appConstants.countGroups)
                .then(fulfilled, rejected);
        }

        function getStudentsQuantity() {
            return $http.get(appConstants.countStudents)
                .then(fulfilled, rejected);
        }

        function getSubjectsQuantity() {
            return $http.get(appConstants.countSubjects)
                .then(fulfilled, rejected);
        }

        function getTestsQuantity() {
            return $http.get(appConstants.countTests)
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
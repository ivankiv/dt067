(function() {
    'use strict';

    angular.module('app')
        .factory('groupService', groupService);
    groupService.$inject = ['$http', 'appConstants'];

    function groupService ($http, appConstants) {
        return {
            getGroups: getGroups,
            getOneGroup: getOneGroup,
            countGroups: countGroups,
            getRecordsRange: getRecordsRange,
            addGroup: addGroup,
            deleteGroup: deleteGroup,
            editGroup: editGroup
        };

        function getGroups(speciality_id, faculty_id) {
            if (speciality_id){
                return $http.get(appConstants.getGroupsBySpeciality + speciality_id)
                    .then(fulfilled,rejected);
            } else if (faculty_id) {
                return $http.get(appConstants.getGroupsByFaculty + faculty_id)
                    .then(fulfilled, rejected);
            } else {
                return $http.get(appConstants.getGroups)
                    .then(fulfilled,rejected);
            }
        }
        function getOneGroup(currentId) {
            return $http.get(appConstants.getOneGroup + currentId)
                .then(fulfilled, rejected);
        }
        function countGroups() {
            return $http.get(appConstants.countGroups)
                .then(fulfilled, rejected);
        }
        function getRecordsRange(quantity, begin) {
            return $http.get(appConstants.getRangeOfGroups + "/" + quantity +"/" + begin)
                .then(fulfilled, rejected);
        }
        function addGroup(data) {
            return $http.post(appConstants.addGroup, data)
                .then(fulfilled, rejected);
        }
        function deleteGroup(group_id) {
            return $http.delete(appConstants.delGroup + group_id)
                .then(fulfilled, rejected);
        }
        function editGroup(group_id, data) {
            return $http.post(appConstants.editGroup + group_id, data)
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
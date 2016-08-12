(function(){
    'use strict';

    angular
        .module('app')
        .factory('studentService',studentService);

    studentService.$inject = ['$http', 'appConstants'];

    function studentService($http, appConstants) {
        return{
            getStudents:getStudents,
            deleteStudent:deleteStudent,
            editStudent:editStudent,
            createStudent:createStudent
        };

        function getStudents() {
            return $http.get(appConstants.getStudents)
                .then(complete)
                .catch(failed);
        }

        function editStudent(obj,id) {
            return $http.post(appConstants.editStudent + id, obj)
                .then(complete)
                .catch(failed);
        }

        function deleteStudent(id) {
            return $http.delete(appConstants.delStudent + id)
                .then(complete)
                .catch(failed);
        }

        function createStudent(student) {
            return $http.post(appConstants.addStudents, student)
                .then(complete)
                .catch(failed);
        }

        function complete(response) {
            return response.data;
        }

        function failed(error) {
            alert('XHR Failed. Error: ' + error.data);
        }
    }
}());
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
            createStudent:createStudent,
            createStudentObj:createStudentObj,
            getStudentById:getStudentById,
            getTestResultsByStudent:getTestResultsByStudent,
            delTestResult:delTestResult
        };

        function getStudents(group_id) {
            if(group_id) {
                return $http.get(appConstants.getStudentsByGroupId + group_id)
                    .then(complete, failed);
            }
            else {
                return $http.get(appConstants.getStudents)
                    .then(complete, failed);
            }
        }

        function getStudentById(id) {
                return $http.get(appConstants.getStudents + "/" + id)
                    .then(complete, failed);
        }

        function editStudent(obj,id) {
            return $http.post(appConstants.editStudent + id, obj)
                .then(complete, failed);
        }

        function deleteStudent(id) {
            return $http.delete(appConstants.delStudent + id)
                .then(complete, failed);
        }

        function createStudent(student) {
            return $http.post(appConstants.addStudents, student)
                .then(complete, failed);
        }

        function getTestResultsByStudent(student_id) {
            return $http.get(appConstants.getTestResultByStudentId + student_id)
                .then(complete, failed);

        }

        function delTestResult(session_id) {
            return $http.get(appConstants.delTestResult + session_id)
                .then(complete, failed);
        }

        function complete(response) {
            return response;
        }

        function failed(error) {
            console.log(error);
            return error;
        }

        function createStudentObj(userObj,studentObj){
            return {
                username: userObj.username || "",
                password: studentObj.plain_password  ||"",
                password_confirm:studentObj.plain_password || "",
                email:userObj.email || "",
                gradebook_id:studentObj.gradebook_id || "",
                student_surname:studentObj.student_surname || "",
                student_name:studentObj.student_name || "",
                student_fname:studentObj.student_fname || "",
                group_id:studentObj.group_id || "",
                plain_password:studentObj.plain_password || "",
                photo: studentObj.photo || "img/user-default-icon.png"
            };
        }
    }
}());
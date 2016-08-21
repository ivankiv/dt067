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
            createStudentObj:createStudentObj
        };

        function getStudents() {
            return $http.get(appConstants.getStudents)
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

        function complete(response) {
            return response.data;
        }

        function failed(error) {
            alert('XHR Failed. Error: ' + error.data);
        }

        function createStudentObj(userObj,studentObj){
            return {
                username: userObj.username || "",
                password: userObj.plain_password  ||"",
                password_confirm:userObj.plain_password || "",
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
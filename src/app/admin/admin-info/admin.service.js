(function(){
    'use strict';

    angular
        .module('app')
        .factory('adminService',adminService);

    adminService.$inject = ['$http', 'appConstants'];

    function adminService($http, appConstants) {
        return{
            getAdmins:getAdmins,
            deleteAdmin:deleteAdmin,
            editAdmin:editAdmin,
            createAdmin:createAdmin
        };

        function getAdmins(id) {
            var addId =(id) ? "/"+ id: "";
            return $http.get(appConstants.getAdmins + addId)
                .then(complete, failed);
        }

        function editAdmin(obj) {
            return $http.post(appConstants.editAdmins + obj.id, obj)
                .then(complete, failed);
        }

        function deleteAdmin(id) {
            return $http.delete(appConstants.delAdmins + id)
                .then(complete, failed);
        }

        function createAdmin(admin) {
            return $http.post(appConstants.addAdmins, admin)
                .then(complete, failed);
        }

        function complete(response) {
            return response;
        }

        function failed(error) {
            alert('XHR Failed. Error: ' + error.data);
        }
    }
}());
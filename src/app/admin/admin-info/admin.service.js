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

        function getAdmins() {
            return $http.get(appConstants.getAdmins)
                .then(complete)
                .catch(failed);
        }

        function editAdmin(obj) {
            return $http.post(appConstants.editAdmins + obj.id, obj)
                .then(complete)
                .catch(failed);
        }

        function deleteAdmin(id) {
            return $http.delete(appConstants.delAdmins + id)
                .then(complete)
                .catch(failed);
        }

        function createAdmin(admin) {
            return $http.post(appConstants.addAdmins, admin)
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
})();

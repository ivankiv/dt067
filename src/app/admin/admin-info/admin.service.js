(function(){
    'use strict';

    angular
        .module("app")
        .factory("adminService",adminService);

    adminService.$inject = ["$http"];

    function adminService($http) {
        return{
            getAdmins:getAdmins,
            deleteAdmin:deleteAdmin,
            editAdmin:editAdmin
        };

        function getAdmins() {
            var url = "http://dtapi.local/AdminUser/getRecords";
            return $http.get(url)
                .then(complete)
                .catch(failed);
        };

        function editAdmin(obj) {
            var url = "/AdminUser/update/" + obj.id;
            return $http.post(url,obj)
                .then(complete)
                .catch(failed);
        };

        function deleteAdmin(id) {
            if (id == 1){
                alert("Цього адміна не дозволено видаляти");
                return;
            }
            var url = "/AdminUser/del/" + id;
            return $http.delete(url)
                .then(complete)
                .catch(failed);
        };

        function complete(response) {
            return response.data;
        }

        function failed(error) {
            alert("XHR Failed. Error: " + error.data);
        }
    }
})();

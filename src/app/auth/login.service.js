(function(){
    'use strict';
    angular.module('app')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', 'appConstants','$uibModal', '$state', "defineUser"];

    function loginService($http, appConstants, $uibModal, $state, defineUser) {
        return {
            enterLogin: enterLogin,
            isLogged: isLogged,
            authorizeRole: authorizeRole,
            logOut: logOut
        };
        
        function isLogged() {
            return $http.get(appConstants.isLoggedURL).then(function (response) {
                if (response.data.response == "logged") {
                    return response;
                } else if (response.data.response == "non logged") {
                    $state.go('login');
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/islogged-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                }
            });
        }

        function logOut() {
            return $http.get(appConstants.logOutURL).then(function (response) {
                return response
            });
        }

        function enterLogin(data) {
            return $http.post(appConstants.logInURL, data)
                .then(enterLoginComplete, enterLoginFailed)
        }

        function enterLoginComplete(response) {
            localStorage.userRole = response.data.roles[1];
            return response;
        }
        function enterLoginFailed(response) {
            $uibModal.open({
                templateUrl: 'app/modal/templates/login-failed-dialog.html',
                controller: 'modalController as modal',
                backdrop: true
            });
            return response;
        }

        function authorizeRole() {
            return $http.get(appConstants.isLoggedURL)
                .then(function(response) {
                    return  (response.data.response === "logged" &&
                            (response.data.roles[1] === defineUser.admin || response.data.roles[1] === defineUser.user));
                }, function (response) {
                    return response;
                });
        }
    }
}());
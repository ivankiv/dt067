(function(){
    'use strict';
    angular.module('app')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', 'appConstants','$uibModal', '$state', "USER_ROLES"];

    function loginService($http, appConstants, $uibModal, $state, USER_ROLES) {
        return {
            enterLogin: enterLogin,
            isLogged: isLogged,
            isAuthorized: isAuthorized
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

        function isAuthorized() {
            return $http.get(appConstants.isLoggedURL)
                .then(function(response) {
                    if ((response.data.response === "logged") && ((response.data.roles[1] === USER_ROLES.ADMIN) || (response.data.roles[1] === USER_ROLES.USER))) {
                        return true;
                    } else {
                        return false;
                    }
                }, function (response) {
                    return false;
                });
        }
    }
}());
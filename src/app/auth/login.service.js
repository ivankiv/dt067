(function(){
    'use strict';
    angular.module('app')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', 'appConstants','$uibModal', 'ngDialog', '$state'];

    function loginService($http, appConstants, $uibModal, ngDialog, $state) {
        return {
            enterLogin: enterLogin,
            isLogged: isLogged
        };
        
        function isLogged() {
            return $http.get(appConstants.isLoggedURL).then(function (response) {
                if (response.data.response == "logged") {
                    return response;
                } else if (response.data.response == "non logged") {
                    $state.go('login');
                    $uibModal.open({
                        templateUrl: 'app/auth/islogged-dialog.html',
                        controller: 'loginModalController as login',
                        backdrop: true
                    })
                }
            });
        }

        function enterLogin(data) {
            return $http.post(appConstants.logInURL, data)
                .then(enterLoginComplete, enterLoginFailed)
        }

        function enterLoginComplete(response) {
            return response;
        }
        function enterLoginFailed(response) {
            $uibModal.open({
                templateUrl: 'app/auth/login-failed-dialog.html',
                controller: 'loginModalController as login',
                backdrop: true
            });
            return response;
        }
    }
}());
(function(){
    'use strict';
    angular.module('app')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', 'appConstants','$uibModal', '$state'];

    function loginService($http, appConstants, $uibModal, $state) {
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
    }
}());
(function(){
    'use strict';
    angular.module('app')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', 'appConstants', 'ngDialog'];

    function loginService($http, appConstants, ngDialog) {
        return {
            enterLogin: enterLogin,
            isLogged:isLogged
        };


        function enterLogin(data) {
            return $http.post(appConstants.logInURL, data)
                .then(enterLoginComplete, enterLoginFailed)
        }

        function enterLoginComplete(response) {
            return response;
        }
        function enterLoginFailed(response) {
            ngDialog.open({template: '<div class="ngdialog-message"> \
						  Логін або пароль введено неправильно.</div>',
                plain: 'true',
                closeByDocument: 'true'
            });
            return response;
        }
        function isLogged() {
            return $http.get(appConstants.IsLoggedURL)
                .then(isLoggedComplete, isLoggedFailed)
        }

        function isLoggedComplete(response) {
            if (response.data.response === "logged") {
                return response;
            }
        }

        function isLoggedFailed(response) {
            return response;
        }
    }
}());
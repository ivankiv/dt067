(function(){
    'use strict';
    angular.module('app')
        .factory('loginService', loginService);

        loginService.$inject = ['$http', 'appConstants', '$state'];

        function loginService($http, appConstants, $state ) {
            return {
                enterLogin: enterLogin,
                logOut: logOut
            };

            function enterLogin(data) {
                return $http.post(appConstants.logInURL, data)
                    .then(enterLoginComplete, enterLoginFailed)
            }

            function enterLoginComplete(response) {
                return response;
            }
            function enterLoginFailed(response) {
                return response;
            }

            function logOut() {
                return $http.get(appConstants.logOutURL)
                    .then(toLoginPage, toLoginPage)
            }

            function toLoginPage() {
                $state.go("login");
            }
        }
})();

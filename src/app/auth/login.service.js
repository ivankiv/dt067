(function(){
    'use strict';
    angular.module('app')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', 'appConstants','$uibModal', 'ngDialog', '$state'];

    function loginService($http, appConstants, $uibModal, ngDialog, $state) {
        return {
            enterLogin: enterLogin,
            isLog: isLog
        };
        
        function isLog() {
            return $http.get(appConstants.isLoggedURL).then(function (response) {
                if (response.data.response == "logged") {
                    return response;
                } else if (response.data.response == "non logged") {
                    $state.go('login');
                    $uibModal.open({
                        template: '<div class="modal-login">Час сесії минув.</br> \ ' +
                         'Введіть будь ласка логін та пароль.</p></div>',
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
            ngDialog.open({template: '<div class="ngdialog-message"> \
						  Логін або пароль введено неправильно.</div>',
                plain: 'true',
                closeByDocument: 'true'
            });
            return response;
        }
    }
}());
(function() {
    'use strict';
    angular.module('app')
        .controller('loginController', loginController);
        loginController.$inject = ['loginService', '$state'];

        function loginController(loginService, $state) {
            var self = this;
            self.user = {username: "", password: ""};
            self.toEnter = toEnter;

            function toEnter() {
                loginService.enterLogin(self.user).then(fullfilled);
            }

            function fullfilled(response) {
                if (response.data.response == "ok" && response.data.roles[1] == 'admin') {
                    $state.go('admin-home');
                } else if(response.data.response == "ok" && response.data.roles[1] == 'student') {
                    $state.go('user');
                }
            }
        }
})();

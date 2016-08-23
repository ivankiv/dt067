(function(){
    'use strict';

    angular
        .module("app")
        .controller("UserController", UserController);

    UserController.$inject = ["studentService","groupService","loginService"];

    function UserController(studentService, groupService, loginService) {
        var self = this;

        self.userId = 0;
        self.user = {};
        self.group_name = "";

        activate();

        function activate() {
            getUserInfo();
        }

        function getUserInfo() {
            loginService.isLogged()
                .then(function (response) {
                    self.userId = response.data.id;
                    studentService.getStudentById(self.userId)
                        .then(function (data) {
                            self.user = data[0];
                            groupService.getOneGroup(self.user.group_id).then(function (response) {
                                self.group_name = response.data[0].group_name;
                            });
                        });
                });
        }
    }
}());
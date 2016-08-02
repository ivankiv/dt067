(function(){
    'use strict';

    angular
        .module("app")
        .controller("AdminEditController", AdminEditController);

    AdminEditController.$inject = ["adminService","$state"];

    function AdminEditController(adminService,$state) {
        var self = this;
        self.edit = edit;
        self.hide = hide;
        self.update = update;
        self.remove = remove;
        self.list = [];
        self.show = false;
        self.password = "";
        self.password1 = "";
        self.currentObj = {};


        activate();

        function activate() {
            adminService.getAdmins().then(function (data) {
                self.list = data;
                self.password = "";
                self.password1 = "";
            });
        }

        function hide() {
            self.show = false;
            activate();
        }

        function edit(obj) {
            self.show = true;
            self.currentObj = obj;
        }

        function update(){
            if (self.password != ""){
                if (self.password == self.password1){
                    self.currentObj.password = self.password;
                }
                else {
                    alert("Паролі не співпадають");
                    return;
                }
            }
            adminService.editAdmin(self.currentObj)
                .then(activate);
            hide();
        }

        function remove(id) {
            adminService.deleteAdmin(id)
                .then(activate);
        }
    }
})();
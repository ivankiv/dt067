(function(){
    'use strict';

    angular
        .module("app")
        .controller("AdminEditController", AdminEditController);

    AdminEditController.$inject = ["adminService","$state", 'ngDialog'];

    function AdminEditController(adminService,$state, ngDialog) {
        var self = this;
        self.showEditForm = showEditForm;
        self.showCreateForm = showCreateForm;
        self.hide = hide;
        self.update = update;
        self.remove = remove;
        self.create = create;
        self.list = [];
        self.showEdit = false;
        self.showCreate = false;
        self.alreadyExist = false;
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

        function hide(param) {
            (param == "edit")? self.showEdit = false: self.showCreate = false;
            activate();
        }

        function showEditForm(obj) {
            self.showEdit = true;
            self.currentObj = obj;
        }

        function showCreateForm() {
            self.showCreate = true;
            self.currentObj = {};
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
            hide("edit");
        }

        function remove(id) {
            if (id == 1){
                alert("Цього адміна не дозволено видаляти");
                return;
            }
            ngDialog.openConfirm({
                template: 'app/partials/confirm-delete-dialog.html',
                plain: false
            }).
            then(function(){
                adminService.deleteAdmin(id).then(activate)
            })
        }

        function create(){
            if (self.password != ""){
                if (self.password == self.password1){
                    self.currentObj.password = self.password;
                }
                else {
                    alert("Паролі не співпадають");
                    return;
                }
            }
            self.list.forEach(
                function(x){
                    if(x.username==self.currentObj.username){
                        alert("Користувач з таким логіном вже існує");
                        self.alreadyExist = true;
                    }
                });
            if(self.alreadyExist) {
                self.alreadyExist =false;
                return;
            }
            adminService.createAdmin(self.currentObj)
                .then(activate);
            hide();
        }
    }
})();
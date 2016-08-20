(function(){
    'use strict';

    angular
        .module('app')
        .controller('AdminEditController', AdminEditController);

    AdminEditController.$inject = ['adminService','$uibModal', 'ngDialog'];

    function AdminEditController(adminService,$uibModal, ngDialog) {
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
            adminService.getAdmins().then(function (response) {
                self.list = response.data;
                self.password = "";
                self.password1 = "";
            });
        }

        function hide(param) {
            (param == "edit")? self.showEdit = false: self.showCreate = false;
            activate();
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

        function showCreateForm() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/admin-info/admin-create-form.html',
                controller: 'AdminModalController as admins',
                backdrop: false,
                resolve: {
                    currentObject: {}
                }
            });
            modalInstance.result.then(function() {
                ngDialog.open({template: '<div class="ngdialog-message"> \
						  Адміністратора створено!</div>'
                });
                activate();
            })
        }

        function showEditForm(admin) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/subject/edit-subject.html',
                controller: 'AdminModalController as admins',
                backdrop: false,
                resolve: {
                    currentObject: admin
                }
            });
            modalInstance.result.then(function() {
                ngDialog.open({template: '<div class="ngdialog-message"> \
						  Зміни внесено!</div>'
                });
                activate();
            })
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
}());
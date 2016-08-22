(function(){
    'use strict';

    angular
        .module('app')
        .controller('AdminEditController', AdminEditController);

    AdminEditController.$inject = ['adminService','$uibModal', 'ngDialog'];

    function AdminEditController(adminService,$uibModal, ngDialog) {
        var self = this;

        //Methods
        self.showEditForm = showEditForm;
        self.showCreateForm = showCreateForm;
        self.remove = remove;

        //Variables
        self.currentObj = {};
        self.password = "";
        self.password1 = "";
        self.list = [];

        activate();

        function activate() {
            adminService.getAdmins().then(function (response) {
                self.list = response.data;
            });
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
                ngDialog.open({template:
                    '<div class="ngdialog-message">Адміністратора створено!</div>'
                });
                activate();
            })
        }

        function showEditForm(admin) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/admin-info/admin-edit-form.html',
                controller: 'AdminModalController as admins',
                backdrop: false,
                resolve: {
                    currentObject: admin
                }
            });
            modalInstance.result.then(function() {
                ngDialog.open({template:
                    '<div class="ngdialog-message">Збережено!</div>'
                });
                activate();
            })
        }
    }
}());
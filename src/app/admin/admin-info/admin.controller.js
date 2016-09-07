(function(){
    'use strict';

    angular
        .module('app')
        .controller('AdminEditController', AdminEditController);

    AdminEditController.$inject = ['adminService','$uibModal'];

    function AdminEditController(adminService,$uibModal) {
        var self = this;

        //Methods
        self.showEditForm = showEditForm;
        self.showCreateForm = showCreateForm;
        self.remove = remove;

        //Variables
        self.currentObj = {};
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

            var modalInstance = $uibModal.open({
                templateUrl: 'app/modal/templates/confirm-delete-dialog.html',
                controller: 'modalController as modal',
                backdrop: true
            });
            modalInstance.result.then(function(){
                adminService.deleteAdmin(id).then(activate)
            });
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
                $uibModal.open({
                    templateUrl:'app/modal/templates/confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
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
                $uibModal.open({
                    templateUrl:'app/modal/templates/confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
                activate();
            })
        }
    }
}());
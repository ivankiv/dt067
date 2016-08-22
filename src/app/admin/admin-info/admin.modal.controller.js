(function(){
    'use strict';

    angular
        .module('app')
        .controller('AdminModalController', adminModalController);
    adminModalController.$inject = ['adminService', '$uibModalInstance', 'currentObject', 'ngDialog'];

    function adminModalController(adminService, $uibModalInstance, currentObject, ngDialog) {
        var self = this;

        //Variables
        self.alreadyExist = false;
        self.password = "";
        self.password1 = "";
        self.currentObject = currentObject;
        self.duplicateAdminsMessage = false;
        self.wasNotEditSubjectMessage = false;
        self.passwordConfirmation = false;
        self.wrongData = false;

        //Methods
        self.create = create;
        self.update = update;
        self.cancelForm = cancelForm;

        function create(){
            if (self.password != ""){
                if (self.password == self.password1){
                    self.currentObject.password = self.password;
                }
                else {
                    self.passwordConfirmation = true;
                    return;
                }
            }
            if(adminService.duplicateLogin(self.currentObject.username)){
                self.duplicateAdminsMessage = true;
                return;
            }
            adminService.createAdmin(self.currentObject)
                .then(complete, rejected);
        }

        function cancelForm () {
            $uibModalInstance.dismiss();
        }


        function update(){
            if (self.password != ""){
                if (self.password == self.password1){
                    self.currentObject.password = self.password;
                }
                else {
                    self.passwordConfirmation = true;
                    return;
                }
            }
            else {
                delete(self.currentObject.password);
            }
            if(adminService.duplicateLogin(self.currentObject.username)){
                self.duplicateAdminsMessage = true;
                return;
            }
            adminService.editAdmin(self.currentObject)
                .then(complete, rejected);
        }


        function complete(response) {
            if(response.status == 200 && response.data.response === "Failed to validate array") {
                self.wrongData = true;
                return;
            }
            if(response.data.response === "ok") {
                $uibModalInstance.close();
            }
        }

        function rejected(response) {
            console.log(response.data.response);
            console.log(response.status + " " + response.statusText);
        }

    }
}());
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

        //Methods
        self.create = create;
        self.cancelForm = cancelForm;

        function create(){
            adminService.createAdmin(self.currentObj)
                .then(createComplete, rejected);
            $uibModalInstance.close();
        }

        function cancelForm () {
            $uibModalInstance.dismiss();
        }

        function createComplete(response) {
            if(response.status == 200 && response.data ==="Failed to validate array") {
                self.duplicateAdminsMessage = true;
                return;
            }
            if (self.password != ""){
                if (self.password == self.password1){
                    self.currentObj.password = self.password;
                }
                else {
                    alert("Паролі не співпадають");
                    return;
                }
            }

            if(response.data.response === "ok" && response.data !=="Failed to validate array") {
                $uibModalInstance.close();
            }
        }

        function updateComplete(response) {
            if(response.status == 400) {
                self.duplicateSubjectsMessage = true;
                return;
            }

            if(response.status == 200 && response.data.response == 'error') {
                self.wasNotEditSubjectMessage = true;
            }
            if(response.data.response == 'ok') {
                self.currentSubject = {};
                $uibModalInstance.close();
                ngDialog.open({template: '<div class="ngdialog-message"> \
						  Зміни збережено!</div>',
                    plain: 'true'
                });
            }
        }



        function rejected(response) {
            console.log(response.data.response);
            console.log(response.status + " " + response.statusText);
        }

    }
}());
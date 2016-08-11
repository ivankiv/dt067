(function () {
    'use strict';
    angular.module('app')
        .controller('SpecialityModalController',specialityModalController);

    specialityModalController.$inject = ['specialityService','appConstants','$uibModalInstance','currentSpeciality','ngDialog'];

    function specialityModalController(specialityService,appConstants,$uibModalInstance,currentSpeciality,ngDialog) {
        var self = this;

        self.speciality = {speciality_name: "",speciality_code: ""};
        self.currentSpeciality = currentSpeciality;
        self.duplicateSpecialitiesMessage =false;
        self.wasNotEditSpecialityMessage = false;

        self.addSpeciality = addSpeciality;
        self.updateSpeciality = updateSpeciality;
        self.cancelForm = cancelForm;

        function addSpeciality() {
            specialityService.addSpeciality(self.speciality)
                .then(addSpecialityComplete,rejected);
        }
        function updateSpeciality() {
            specialityService.editSpeciality(appConstants.currentID,self.currentSpeciality)
                .then(updateComplete,rejected);
        }
        function cancelForm() {
            $uibModalInstance.dismiss();
        }
        function addSpecialityComplete(response) {
            if(response.status == 400){
                self.duplicateSpecialitiesMessage = true;
                return;
            }
            if(response.data.response == "ok"){
                self.speciality = {};
                $uibModalInstance.close(response);
            }
        }
        function updateComplete(response) {
            if(response.status == 400){
                self.duplicateSpecialitiesMessage = true;
                return;
            }
            if(response.status == 200 && response.data.response == 'error'){
                self.wasNotEditSpecialityMessage = true;
            }
            if(response.data.response == 'ok'){
                self.currentSpeciality = {};
                $uibModalInstance.close();
                ngDialog.open({
                   template:'<div class="ngdialog-message">Зміни збережено!</div>',
                    plain:true
                });
            }
        }
        function rejected(response) {
            console.log(response.data.response);
            console.log(response.status + " " + response.statusText);
        }
    }
}());

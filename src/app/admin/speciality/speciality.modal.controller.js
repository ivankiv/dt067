(function () {
    'use strict';
    angular.module('app')
        .controller('SpecialityModalController',specialityModalController);

    specialityModalController.$inject = ['specialityService','appConstants','$uibModalInstance','currentSpeciality','$uibModal'];

    function specialityModalController(specialityService,appConstants,$uibModalInstance,currentSpeciality,$uibModal) {
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
            if(response.status === 400){
                self.duplicateSpecialitiesMessage = true;
                return;
            }
            if(response.data.response === "ok"){
                self.speciality = {};
                $uibModalInstance.close(response);
            }
        }
        function updateComplete(response) {
            if(response.status === 400 || (response.status === 200 && response.data.response === 'error')){
                self.duplicateSpecialitiesMessage = true;
                return;
            }
            if(response.data.response === 'ok'){
                self.currentSpeciality = {};
                $uibModalInstance.close();
                $uibModal.open({
                   templateUrl: 'app/modal/templates/confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
            }
        }
        function rejected(response) {
        }
    }
}());

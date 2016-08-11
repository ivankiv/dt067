(function () {
    'use strict';
    angular.module('app')
        .controller('SpecialityController',specialityController);

    specialityController.$inject = ['specialityService','appConstants','$uibModal','ngDialog'];

    function specialityController(specialityService,appConstants,$uibModal,ngDialog) {
        var self = this;

        self.list = {};

        self.totalSpecialities = 0;
        self.showSearch = true;
        self.textSearch = "";
        self.begin = 0;
        self.currentPage = 1;
        self.specialitiesPerPage = 5;
        self.numberToDisplaySpecialitiesOnPage = [5,10,15,20];
        self.pageChanged = pageChanged;

        self.getSpecialities = getSpecialities;
        self.countSpecialities = countSpecialities;
        self.deleteSpeciality = deleteSpeciality;
        self.showAddSpecialityForm = showAddSpecialityForm;
        self.showEditSpecialityForm = showEditSpecialityForm;

        activate();

        function activate() {
            countSpecialities();
            getSpecialities();
        }

        function getSpecialities() {
            return specialityService.getSpecialities().then(function(response) {
                self.list = response.data;
            });
        }

        function countSpecialities() {
            specialityService.countSpecialities().then(function (response) {
               self.totalSpecialities = response.data.numberOfRecords;
            });
        }
        function pageChanged() {
            self.begin = ((self.currentPage - 1) * self.specialitiesPerPage);
            self.showSearch = (self.currentPage == 1) ? true : false;
            self.textSearch = (self.currentPage == 1) ? self.textSearch : "";
        }
        function deleteSpeciality(speciality_id) {
            ngDialog.openConfirm({
                templateUrl: 'app/partials/confirm-delete-dialog.html',
                plain:false
            }).then(function () {
               specialityService.deleteSpeciality(speciality_id).then(deleteSpecialityComplete);
            });
        }
        function deleteSpecialityComplete(response){
            if(response.data.response == 'ok'){
                ngDialog.open({
                    template:'<div class="ngdialog-message">Спеціальність успішно видалена!</div>',
                    plain:true
                });
                getSpecialities()
                    .then(countSpecialities)
                    .then(pageChanged);
            }
        }
        function showAddSpecialityForm() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/speciality/add-speciality.html',
                controller: 'SpecialityModalController as specialities',
                backdrop:false,
                resolve:{
                    currentSpeciality:{}
                }
            });
            modalInstance.result.then(function (response) {
               ngDialog.open({
                   template:'<div class="ngdialog-message">Спеціальність успішно додана!</div>'
               });
                getSpecialities()
                    .then(countSpecialities)
                    .then(pageChanged);
            });
        }
        function showEditSpecialityForm(speciality) {
            appConstants.currentID = speciality.speciality_id;

            var modalInstance = $uibModal.open({
                templateUrl:'app/admin/speciality/edit-speciality.html',
                controller: 'SpecialityModalController as specialities',
                backdrop:false,
                resolve:{
                    currentSpeciality:speciality
                }
            });
            modalInstance.result.then(function () {
               getSpecialities()
                   .then(countSpecialities)
                   .then(pageChanged);
            });
        }
    }
}());
(function () {
    'use strict';
    angular.module('app')
        .controller('SpecialityController',specialityController);

    specialityController.$inject = ['specialityService', 'loginService', 'appConstants','$uibModal','ngDialog'];

    function specialityController(specialityService, loginService, appConstants,$uibModal,ngDialog) {
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
            isLogged();
            getSpecialities().then(pageChanged);
        }

        function isLogged() {
            loginService.isLogged();
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
            self.showSearch = (self.currentPage === 1);
            self.textSearch = (self.currentPage === 1) ? self.textSearch : "";
        }
        function deleteSpeciality(speciality_id) {
            ngDialog.openConfirm({
                templateUrl: 'app/partials/confirm-delete-dialog.html',
                plain:false
            }).then(function () {
               specialityService.deleteSpeciality(speciality_id).then(deleteSpecialityComplete);
            });
        }
        function deleteSpecialityComplete(response) {
            if (response.status === 400) {
                ngDialog.open({
                    template: '<div class="ngdialog-message">Спеціальність містить групи,неможливе видалення!</div>',
                    plain: true
                })
            } else if (response.data.response === 'ok') {
                ngDialog.open({
                    template: '<div class="ngdialog-message">Спеціальність успішно видалена!</div>',
                    plain: true
                });
                activate();
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
                activate();
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
               activate();
            });
        }
    }
}());
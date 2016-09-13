(function () {
    'use strict';
    angular.module('app')
        .controller('SpecialityController',specialityController);

    specialityController.$inject = ['specialityService', 'loginService','$uibModal','appConstants'];

    function specialityController(specialityService, loginService ,$uibModal, appConstants) {
        var self = this;

        self.list = {};

        self.totalSpecialities = 0;
        self.showSearch = true;
        self.textSearch = "";
        self.begin = 0;
        self.currentPage = 1;
        self.specialitiesPerPage = appConstants.numberOfEntitiesPerPage;;
        self.numberToDisplaySpecialitiesOnPage = [5,10,15,20];
        self.pageChanged = pageChanged;

        self.getSpecialities = getSpecialities;
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
                self.totalSpecialities = response.data.length;
            });
        }

        function pageChanged() {
            self.begin = ((self.currentPage - 1) * self.specialitiesPerPage);
            self.showSearch = (self.currentPage === 1);
            self.textSearch = (self.currentPage === 1) ? self.textSearch : "";
        }
        function deleteSpeciality(speciality_id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modal/templates/confirm-delete-dialog.html',
                controller: 'modalController as modal',
                backdrop: true
            });
            modalInstance.result.then(function (response) {
                if (response){
                    specialityService.deleteSpeciality(speciality_id)
                        .then(deleteSpecialityComplete);
                } else {
                    return response;
                }
            });
        }
        function deleteSpecialityComplete(response) {
            if (response.status === 400) {
                $uibModal.open({
                    templateUrl: 'app/modal/templates/forbidden-confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
            }
            if (response.data.response === 'ok') {
                $uibModal.open({
                   templateUrl: 'app/modal/templates/confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
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
               $uibModal.open({
                  templateUrl:'app/modal/templates/confirm-dialog.html',
                   controller: 'modalController as modal',
                   backdrop: true
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
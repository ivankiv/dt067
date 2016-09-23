(function(){
    'use strict';

    angular.module('app')
        .controller('facultyController', facultyController);
        facultyController.$inject = ['loginService','facultyService', 'appConstants', '$uibModal'];

    function facultyController(loginService, facultyService, appConstants, $uibModal) {
        var self = this;

        //variables
        self.list = {};
        self.listAllFaculties = {};

        //Pagination
        self.totalFaculties = 0;
        self.showSearch = true;
        self.textSearch = "";
        self.begin = 0;
        self.currentPage = 1;
        self.facultiesPerPage = appConstants.numberOfEntitiesPerPage;;
        self.numberToDisplayFacultiesOnPage = [5,10,15,20];
        self.pageChanged = pageChanged;

        //Methods
        self.getFaculties = getFaculties;
        self.countFaculties = countFaculties;
        self.deleteFaculty = deleteFaculty;
        self.showAddFacultyForm = showAddFacultyForm;
        self.showEditFacultyForm = showEditFacultyForm;

        self.showErrorMessage = false;


        activate();

        function activate() {
            isLogged();
            countFaculties();
            getFaculties();
        }

        function isLogged() {
            loginService.isLogged();
        }

        function getFaculties() {
            facultyService.getFaculties().then(function (response) {
                self.list = response.data;
            })
        }

        function countFaculties() {
            facultyService.countFaculties().then(function (response) {
                self.totalFaculties = response.data.numberOfRecords;
            })
        }

        function deleteFaculty(faculty_id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modal/templates/confirm-delete-dialog.html',
                controller: 'modalController as modal',
                backdrop: true
            });
            modalInstance.result.then(function () {
                facultyService.deleteFaculty(faculty_id).then(deleteFacultyComplete);
            });
        }

        function pageChanged() {
            self.begin = ((self.currentPage - 1) * self.facultiesPerPage);
            self.showSearch = (self.currentPage == 1) ? true : false;
            self.textSearch = (self.currentPage == 1) ? self.textSearch  : "";
        }

        function deleteFacultyComplete(response) {
            if (response.data.response == "ok") {
                $uibModal.open({
                    templateUrl: 'app/modal/templates/confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
                activate();
            }
            if(response.status === 400) {
                $uibModal.open({
                    templateUrl: 'app/modal/templates/forbidden-confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
            }
        }

        function showAddFacultyForm() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/faculty/add-faculty.html',
                controller: 'facultyModalController as faculties',
                backdrop: false,
                resolve: {
                    currentFaculty: {}
                }
            });
            modalInstance.result.then(function(response) {
                $uibModal.open({
                    templateUrl: 'app/modal/templates/confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
                activate();
            })
        }

        function showEditFacultyForm(faculty) {
            appConstants.currentID = faculty.faculty_id;

            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/faculty/edit-faculty.html',
                controller: 'facultyModalController as faculties',
                backdrop: false,
                resolve: {
                  currentFaculty: faculty
                }
            });
            modalInstance.result.then(function() {
                pageChanged();
                activate();
            })
        }
    } 
}());
    
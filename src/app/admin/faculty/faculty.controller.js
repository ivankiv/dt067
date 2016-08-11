(function(){
    'use strict';

    angular.module('app')
        .controller('facultyController', facultyController);
        facultyController.$inject = ['facultyService', 'appConstants', '$uibModal', 'ngDialog'];

    function facultyController(facultyService, appConstants, $uibModal, ngDialog) {
        var self = this;

        //variables
        self.list = {};
        self.listAllFaculties = {};

        //Pagination
        self.totalFaculties = 0;
        self.currentPage = 1;
        self.facultiesPerPage = 10;
        var firstFacultyInList = 0;
        self.pageChanged = pageChanged;

        //Methods
        self.getAllFaculties = getAllFaculties;
        self.getRecordsRange = getRecordsRange;
        self.countFaculties = countFaculties;
        self.deleteFaculty = deleteFaculty;
        self.showAddFacultytForm = showAddFacultyForm;
        self.showEditFacultyForm = showEditFacultyForm;

        self.showErrorMessage = false;
        self.message = "Loading...";

        activate();

        function activate() {
            countFaculties();
            getRecordsRange()
        }

        function getAllFaculties() {
            facultyService.getAllFaculties().then(function (response) {
                self.listAllFaculties = response.data;
            })
        }

        function getRecordsRange() {
            facultyService.getRecordsRange(self.facultiesPerPage, firstFacultyInList).then(function (response) {
                self.list = response.data;
            })
        }

        function countFaculties() {
            facultyService.countFaculties().then(function (response) {
                self.totalFaculties = response.data.numberOfRecords;
            })
        }

        function deleteFaculty(faculty_id) {
            ngDialog.openConfirm({
                template: 'app/partials/confirm-delete-dialog.html',
                plain: false
            }).then(function () {
                facultyService.deleteFaculty(faculty_id).then(deleteFacultyComplete);
            });
        }

        function pageChanged() {
            var begin = ((self.currentPage - 1) * self.facultiesPerPage);
            facultyService.getRecordsRange(self.facultiesPerPage, begin).then(function (response) {
                self.list = response.data;
            })
        }

        function deleteFacultyComplete(response) {
            if (response.data.response == "ok") {
                ngDialog.open({
                    template: '<div class="ngdialog-message"> \
                    Факультет видалено успішно!</div>'
                });
                countFaculties();
                pageChanged();
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
                ngDialog.open({template: '<div class="ngdialog-message"> \
						  Факультет додано успішно!</div>'
                });
                countFaculties();
                pageChanged();
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
            })
        }
    } 
}());
    
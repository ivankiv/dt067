(function(){
    'use strict';

    angular.module('app')
        .controller('SubjectController', subjectController);
        subjectController.$inject = ['subjectService', 'appConstants', '$uibModal'];

        function subjectController(subjectService, appConstants, $uibModal) {
            var self = this;

        //variables
            self.list = {};
            self.listAllSubjects = {};

         //variables and methods for Pagination's panel
            self.totalSubjects = 0;
            self.currentPage = 1;
            self.subjectsPerPage = 10;
            var firstSubjectInList = 0;
            self.pageChanged = pageChanged;

         //variables to show error message
            self.showErrorMessage = false;
            self.message = "Loading...";

         //Methods
            self.getAllSubjects = getAllSubjects;
            self.getRecordsRange = getRecordsRange;
            self.countSubjects = countSubjects;
            self.deleteSubject = deleteSubject;
            self.showAddSubjectForm = showAddSubjectForm;
            self.showEditSubjectForm = showEditSubjectForm;

            activate();

            function activate() {
                countSubjects();
                getRecordsRange()
            }

            function getAllSubjects() {
                subjectService.getSubjects()
                    .then(getSubjectsComplete, rejected);
            }

            function getRecordsRange() {
                subjectService.getRecordsRange(self.subjectsPerPage, firstSubjectInList)
                    .then(getRecordsRangeComplete, getRecordsRangeFailed);
            }

            function countSubjects() {
                subjectService.countSubjects()
                    .then(countSubjectComplete, rejected);
            }

            function deleteSubject(subject_id) {
                subjectService.deleteSubject(subject_id)
                    .then(deleteSubjectComplete, rejected);
            }

            function pageChanged() {
                var begin = ((self.currentPage - 1) * self.subjectsPerPage);
                subjectService.getRecordsRange(self.subjectsPerPage, begin).then(getRecordsRangeComplete);
            }

            function getRecordsRangeComplete(response) {
                self.list = response.data;
            }

            function getRecordsRangeFailed(response) {
                self.showErrorMessage = true;
                self.message = "Error:" + " " + response.status + " " + response.statusText;
            }

            function getSubjectsComplete(response) {
                self.listAllSubjects = response.data;
            }

            function countSubjectComplete(response) {
                self.totalSubjects = response.data;
            }

            function deleteSubjectComplete(response) {
                if(response.data.response == "ok") {
                   countSubjects();
                   pageChanged();
                }
            }

            function showAddSubjectForm() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/add-subject.html',
                    controller: 'SubjectModalController as subjects',
                    resolve: {
                        currentSubject: {}
                    }
                });
                modalInstance.result.then(function() {
                    countSubjects();
                    pageChanged();
                })
            }

            function showEditSubjectForm(subject) {
                //we need this to get data of current subject and to pass it to SubjectModalController
                // to edit current subject
                appConstants.currentID = subject.subject_id;

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/edit-subject.html',
                    controller: 'SubjectModalController as subjects',
                    resolve: {
                        currentSubject: subject

                    }
                });
                modalInstance.result.then(function() {
                    pageChanged();
                })
            }

            function rejected(response) {
                console.log(response.data.response);
                console.log(response.status + " " + response.statusText);
            }
        }
})();
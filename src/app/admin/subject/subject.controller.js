(function(){
    'use strict';

    angular.module('app')
        .controller('SubjectController', subjectController);
        subjectController.$inject = ['subjectService', '$state'];

        var currentId = 0;

        function subjectController(subjectService, $state) {
            var self = this;

        //variables
            self.showForm = false;
            self.hideForm = hideForm;
            self.currentObj = {};
            self.list = {};
            self.listAllSubjects = {};
            self.subject = {subject_name: "", subject_description: ""};

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
            self.addSubject = addSubject;
            self.deleteSubject = deleteSubject;
            self.editSubject = editSubject;
            self.updateSubject = updateSubject;

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

            function addSubject() {
                subjectService.addSubject(self.subject)
                    .then(addSubjectComplete, rejected)
            }

            function deleteSubject(subject_id) {
                subjectService.deleteSubject(subject_id)
                    .then(deleteSubjectComplete, rejected);
            }

            function editSubject(subject) {
                currentId = subject.subject_id;
                self.currentObj = subject;
                self.showForm = true;
            }

            function updateSubject() {
                subjectService.editSubject(currentId, self.currentObj)
                    .then(updateComplete, rejected);
            }

            function hideForm() {
                self.showForm = false;
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

            function addSubjectComplete(response) {
                if(response.data.response = "ok") {
                    self.subject = {};
                    $state.go('admin-home.subject')
                }
            }

            function deleteSubjectComplete(response) {
                if(response.data.response == "ok") {
                    countSubjects();
                   pageChanged();
                }
            }

            function updateComplete(response) {
                if(response.data.response == 'ok') {
                    self.currentObj = {};
                    hideForm();
                }
            }

            function rejected(response) {
                console.log(response.data.response);
                console.log(response.status + " " + response.statusText);
            }

        }
})();
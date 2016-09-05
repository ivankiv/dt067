(function(){
    'use strict';

    angular.module('app')
        .controller('SubjectController', subjectController);
        subjectController.$inject = ['loginService', 'subjectService', '$uibModal'];

        function subjectController(loginService, subjectService, $uibModal) {
            var self = this;

            //variables
            self.list = {};

             //variables and methods for search and Pagination's panel
            self.totalSubjects = 0;
            self.showSearch = true;
            self.textSearch = "";
            self.begin = 0;
            self.currentPage = 1;
            self.subjectsPerPage = 5;
            self.numberToDisplaySubjectsOnPage = [5,10,15,20];
            self.pageChanged = pageChanged;

            //methods
            self.getSubjects = getSubjects;
            self.deleteSubject = deleteSubject;
            self.showAddSubjectForm = showAddSubjectForm;
            self.showEditSubjectForm = showEditSubjectForm;

            activate();

            function activate() {
                isLogged();
                getSubjects().then(pageChanged);
            }

            function isLogged() {
                loginService.isLogged();
            }

            function getSubjects() {
                return subjectService.getSubjects().then(function(response) {
                    self.list = response.data;
                    self.totalSubjects = response.data.length;
                });
            }

            function deleteSubject(subject_id) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/modal/templates/confirm-delete-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
                modalInstance.result.then(function() {
                    subjectService.deleteSubject(subject_id).then(deleteSubjectComplete);
                });
            }
            function deleteSubjectComplete(response) {
                if(response.data.response == "ok") {
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

            function pageChanged() {
                self.begin = ((self.currentPage - 1) * self.subjectsPerPage);
                self.showSearch = (self.currentPage == 1) ? true : false;
                self.textSearch = (self.currentPage == 1) ? self.textSearch  : "";
            }

            function showAddSubjectForm() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/add-subject.html',
                    controller: 'SubjectModalController as subjects',
                    backdrop: false,
                    resolve: {
                        currentSubject: {}
                    }
                });
                modalInstance.result.then(function() {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                    activate();
                })
            }

            function showEditSubjectForm(subject) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/edit-subject.html',
                    controller: 'SubjectModalController as subjects',
                    backdrop: false,
                    resolve: {
                    //the variable is needed to store data of current subject
                    // to fill up the form of editing subject
                        currentSubject: subject

                    }
                });
                modalInstance.result.then(function() {
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                    activate();
                })
            }
        }
}());
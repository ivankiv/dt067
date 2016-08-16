(function(){
    'use strict';

    angular.module('app')
        .controller('SubjectController', subjectController);
        subjectController.$inject = ['subjectService', 'appConstants', '$uibModal', 'ngDialog'];

        function subjectController(subjectService, appConstants, $uibModal, ngDialog) {
            var self = this;

        //variables
            self.list = {};

         //variables and methods for Pagination's panel
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
                getSubjects().then(pageChanged);
            }

            function getSubjects() {
                return subjectService.getSubjects().then(function(response) {
                    self.list = response.data;
                    self.totalSubjects = response.data.length;
                });
            }

            function deleteSubject(subject_id) {
                ngDialog.openConfirm({
                    template: 'app/partials/confirm-delete-dialog.html',
                    plain: false
                }).then(function() {
                    subjectService.deleteSubject(subject_id).then(deleteSubjectComplete);
                });
            }

            function pageChanged() {
                self.begin = ((self.currentPage - 1) * self.subjectsPerPage);
                self.showSearch = (self.currentPage == 1) ? true : false;
                self.textSearch = (self.currentPage == 1) ? self.textSearch  : "";
            }

            function deleteSubjectComplete(response) {
                if(response.data.response == "ok") {
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Предмет успішно видалено!</div>'
                    });
                    activate();
                }
                if(response.status === 400) {
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Неможливо видалити предмет який містить тести або записи в розкладі тестувань!</div>'
                    });
                }
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
                        ngDialog.open({template: '<div class="ngdialog-message"> \
						  Предмет успішно додано!</div>'
                        });
                        activate();
                })
            }

            function showEditSubjectForm(subject) {
            //we need this to get current ID of subject and to pass it to SubjectModalController
            // to edit current subject
                appConstants.currentID = subject.subject_id;

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
                    activate();
                })
            }
        }
}());
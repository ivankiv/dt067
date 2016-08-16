(function(){
    'use strict';

    angular.module('app')
        .controller('SubjectModalController', subjectModalController);
        subjectModalController.$inject = ['subjectService', 'appConstants', '$uibModalInstance', 'currentSubject', 'ngDialog'];

        function subjectModalController(subjectService, appConstants, $uibModalInstance,  currentSubject, ngDialog) {
            var self = this;

        //Variables
            self.subject = {subject_name: "", subject_description: ""};
            self.currentSubject = currentSubject;
            self.duplicateSubjectsMessage = false;
            self.wasNotEditSubjectMessage = false;

            //Methods
            self.addSubject = addSubject;
            self.updateSubject = updateSubject;
            self.cancelForm = cancelForm;

            function addSubject() {
                subjectService.addSubject(self.subject)
                    .then(addSubjectComplete, rejected)
            }

            function updateSubject() {
                subjectService.editSubject(appConstants.currentID, self.currentSubject)
                    .then(updateComplete, rejected);
            }

            function cancelForm () {
                $uibModalInstance.dismiss();
            }

            function addSubjectComplete(response) {
                if(response.status == 400) {
                    self.duplicateSubjectsMessage = true;
                    return;
                }

                if(response.data.response == "ok") {
                    self.subject = {};
                    $uibModalInstance.close();
                }
            }

            function updateComplete(response) {
                if(response.status == 400) {
                    self.duplicateSubjectsMessage = true;
                    return;
                }

                if(response.status == 200 && response.data.response == 'error') {
                    self.wasNotEditSubjectMessage = true;
                }
                if(response.data.response == 'ok') {
                    self.currentSubject = {};
                    $uibModalInstance.close();
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Зміни збережено!</div>',
                        plain: 'true'
                    });
                }
            }

            function rejected(response) {
                console.log(response.data.response);
                console.log(response.status + " " + response.statusText);
            }

        }
}());
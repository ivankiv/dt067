(function(){
    'use strict';

    angular.module('app')
        .controller('SubjectModalController', subjectModalController);
        subjectModalController.$inject = ['subjectService', 'appConstants', '$uibModalInstance', 'currentSubject'];

        function subjectModalController(subjectService, appConstants, $uibModalInstance,  currentSubject) {
            var self = this;

        //Variables
            self.subject = {subject_name: "", subject_description: ""};
            self.currentSubject = currentSubject;
            self.duplicateMessage = false;
            self.incorrectMessage = false;

            //Methods
            self.addSubject = addSubject;
            self.updateSubject = updateSubject;
            self.cancelForm = cancelForm;

            function addSubject() {
                if(!(/[а-яa-z]+/gi.test(self.subject.subject_name))) {
                    self.incorrectMessage = true;
                    return;
                }

                subjectService.addSubject(self.subject)
                    .then(addSubjectComplete, rejected)
            }

            function updateSubject() {
                if(!(/[а-яa-z]+/gi.test(self.currentSubject.subject_name))) {
                    self.incorrectMessage = true;
                    return;
                }
                subjectService.editSubject(appConstants.currentID, self.currentSubject)
                    .then(updateComplete, rejected);
            }

            function cancelForm () {
                $uibModalInstance.dismiss('cancel');
            }

            function addSubjectComplete(response) {
                if(response.status == 400) {
                    self.duplicateMessage = true;
                    return;
                }

                if(response.data.response = "ok") {
                    self.subject = {};
                    $uibModalInstance.close(response);
                }
            }

            function updateComplete(response) {
                if(response.status == 400) {
                    self.duplicateMessage = true;
                    return;
                }

                if(response.data.response == 'ok') {
                    self.currentSubject = {};
                    $uibModalInstance.close();
                }
            }

            function rejected(response) {
                console.log(response.data.response);
                console.log(response.status + " " + response.statusText);
            }

        }
})();
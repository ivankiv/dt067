(function(){
    'use strict';

    angular.module('app')
        .controller('SubjectModalController', subjectModalController);
        subjectModalController.$inject = ['subjectService', 'appConstants', '$uibModalInstance', 'currentSubject'];

        function subjectModalController(subjectService, appConstants, $uibModalInstance, currentSubject) {
            var self = this;

        //Variables
            self.subject = {subject_name: "", subject_description: ""};
            self.currentSubject = currentSubject;

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
                $uibModalInstance.dismiss('cancel');
            }

            function addSubjectComplete(response) {
                if(response.data.response = "ok") {
                    self.subject = {};
                    $uibModalInstance.close();
                }
            }

            function updateComplete(response) {
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
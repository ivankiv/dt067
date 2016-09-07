(function(){
    'use strict';

    angular.module('app')
        .controller('facultyModalController', facultyModalController);
        facultyModalController.$inject = ['facultyService',
            'appConstants', '$uibModalInstance', 'currentFaculty', '$uibModal'];

        function facultyModalController(facultyService, appConstants, $uibModalInstance,  currentFaculty, $uibModal) {
            var self = this;

        //Variables
            self.faculty = {faculty_name: "", faculty_description: ""};
            self.currentFaculty = currentFaculty;
            self.duplicateFacultysMessage = false;
            self.wasNotEditMessage = false;

            //Methods
            self.addFaculty = addFaculty;
            self.updateFaculty = updateFaculty;
            self.cancelForm = cancelForm;

            function addFaculty() {
                facultyService.addFaculty(self.faculty)
                    .then(addFacultyComplete, rejected)
            }

            function updateFaculty() {
                facultyService.editFaculty(appConstants.currentID, self.currentFaculty)
                    .then(updateComplete, rejected);
            }

            function cancelForm () {
                $uibModalInstance.dismiss('cancel');
            }

            function addFacultyComplete(response) {
                if(response.status == 400) {
                    self.duplicateFacultysMessage = true;
                    return;
                }

                if(response.data.response == "ok") {
                    self.faculty = {};
                    $uibModalInstance.close(response);
                }
            }

            function updateComplete(response) {
                if(response.status == 400 && response.data.response !== 'Error when update') {
                    self.duplicateFacultiesMessage = true;
                    return;
                }

                if(response.status == 400 && response.data.response == 'Error when update') {
                    self.wasNotEditMessage = true;
                }

                if(response.data.response == 'ok') {
                    self.currentFaculty = {};
                    $uibModalInstance.close();
                    $uibModal.open({
                        templateUrl: 'app/modal/templates/confirm-dialog.html',
                        controller: 'modalController as modal',
                        backdrop: true
                    });
                }
            }

            function rejected(response) {
            }

        }
}());

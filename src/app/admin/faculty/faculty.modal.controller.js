(function(){
    'use strict';

    angular.module('app')
        .controller('facultyModalController', facultyModalController);
        facultyModalController.$inject = ['facultyService', 'appConstants', '$uibModalInstance', 'currentFaculty', 'ngDialog'];

        function facultyModalController(facultyService, appConstants, $uibModalInstance,  currentFaculty, ngDialog) {
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
                if(response.status == 400) {
                    self.duplicateFacultiesMessage = true;
                    return;
                }

                if(response.status == 200 && response.data.response == 'error') {
                    self.wasNotEditMessage = true;
                }

                if(response.data.response == 'ok') {
                    self.currentFaculty = {};
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

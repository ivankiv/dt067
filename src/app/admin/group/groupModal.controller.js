(function () {
    'use strict';
    angular.module('app')
        .controller('groupModalController', groupModalController);

    groupModalController.$ingect = ['grouopService','facultyService', 'specialityService', 'appConstants', '$uibModalInstance', 'currentGroup', 'ngDialog'];

    function groupModalController(groupService, appConstants, facultyService, specialityService, $uibModalInstance,  currentGroup, ngDialog) {
        var self = this;
        self.currentGroup = currentGroup;
        self.duplicateGroupsMessage = false;
        self.incorrectEnteredDataMessage = false;
        self.specialityList = {};
        self.facultyList = {};

        self.group = currentGroup;
        self.addGroup = addGroup;
        self.cancelForm = cancelForm;
        self.updateGroup = updateGroup;
        self.getSpeciality = getSpeciality;
        self.getFaculty = getFaculty;

        activate();

        function activate() {
            getSpeciality();
            getFaculty();
        }

        function getSpeciality() {
            specialityService.getSpecialities().then( function(response) {
                self.specialityList = response.data;
            });
        }

        function getFaculty() {
            facultyService.getFaculties().then( function(response) {
                self.facultyList = response.data;
            });
        }

        function addGroup() {
            groupService.addGroup(self.group).then(addFinish, addError)
        }

        function cancelForm() {
            $uibModalInstance.dismiss('cancel');
        }

        function addFinish(response) {
            if(response.status == 400) {
                self.duplicateGroupsMessage = true;
                return;
            }

            if(response.data.response == "ok") {
                self.group = {};
                $uibModalInstance.close(response);
            }

        }
        function addError(response) {
            alert("Something went wrong");
            console.log(response)
        }

        function updateGroup() {
            delete self.group.faculty_name;
            delete self.group.speciality_name;
            groupService.editGroup(appConstants.currentID, self.group)
                .then(updateComplete, addError);
        }

        function updateComplete(response) {
            if(response.status == 400 || (response.status === 200 && response.data.response == 'error')) {
                self.duplicateGroupsMessage = true;
                return;
            }

            if(response.data.response == 'ok') {
                self.currentGroup = {};
                $uibModalInstance.close();
                ngDialog.open({template: '<div class="ngdialog-message"> \
						  Зміни збережено!</div>',
                    plain: 'true'
                });
            }
        }

    }


}());
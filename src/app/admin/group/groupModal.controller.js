(function () {
    'use strict';
    angular.module('app')
        .controller('groupModalController', groupModalController);

    groupModalController.$inject = ['groupService', 'appConstants', 'facultyService', 'specialityService', '$uibModalInstance', 'groupByOtherEntity', 'currentGroup', '$uibModal'];

    function groupModalController(groupService, appConstants, facultyService, specialityService, $uibModalInstance, groupByOtherEntity,  currentGroup, $uibModal) {
        var self = this;
        self.currentGroup = currentGroup;
        self.duplicateGroupsMessage = false;
        self.incorrectEnteredDataMessage = false;
        self.specialityList = {};
        self.facultyList = {};
        self.speciality_id = groupByOtherEntity.speciality_id;
        self.faculty_id = groupByOtherEntity.faculty_id;

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
            if (self.speciality_id) {
                self.group.speciality_id = self.speciality_id;
                groupService.addGroup(self.group).then(addFinish, addError)
            } else if (self.faculty_id) {
                self.group.faculty_id = self.faculty_id;
                groupService.addGroup(self.group).then(addFinish, addError)
            } else {
                groupService.addGroup(self.group).then(addFinish, addError)
            }
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
            alert("Ви не можете додати групу");
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
                $uibModal.open({
                    templateUrl: 'app/modal/templates/confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
            }
        }

    }


}());
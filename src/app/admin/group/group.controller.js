
(function(){
    'use strict';

    angular.module('app')
        .controller('GroupController', groupController);
    groupController.$inject = ['groupService', 'facultyService', 'specialityService', 'appConstants', '$uibModal', 'ngDialog'];

    function groupController(groupService, facultyService, specialityService, appConstants, $uibModal, ngDialog ) {
        var self = this;
        self.list = {};
        self.facultyList = {};
        self.specialityList = {};
        self.associativeSpeciality = {};
        self.associativeFaculty = {};

        self.totalSubjects = 0;
        self.showSearch = true;
        self.textSearch = "";
        self.begin = 0;
        self.totalGroups = 0;
        self.currentPage = 1;
        self.groupsPerPage = 10;
        self.pageChanged = pageChanged;


        self.getGroups = getGroups;
        self.countGroups = countGroups;
        self.deleteGroup = deleteGroup;
        self.showAddGroupForm = showAddGroupForm;
        self.showEditGroupForm = showEditGroupForm;
        self.addNewGroup = addNewGroup;
        self.getFaculty = getFaculty;
        self.getSpeciality = getSpeciality;
        self.pageChanged = pageChanged;


        activate();

        function activate() {
            getGroups();
            getFaculty();
            getSpeciality();
        }

        function getSpeciality() {
            specialityService.getSpecialities().then( function(response) {
                self.specialityList = response.data;
                for (var i = 0; i < self.specialityList.length; i++) {
                    self.associativeSpeciality[+self.specialityList[i].speciality_id] = self.specialityList[i].speciality_name;
                }
            });
        }

        function getFaculty() {
            facultyService.getFaculties().then( function(response) {
                self.facultyList = response.data;
                for (var i = 0; i < self.facultyList.length; i++) {
                    self.associativeFaculty[+self.facultyList[i].faculty_id] = self.facultyList[i].faculty_name;
                }
            });
        }

        function getGroups() {
            groupService.getGroups().then(function(response) {
                self.list = response.data;
                self.totalGroups = response.data.length;
            });
        }

        function pageChanged() {
            self.begin = ((self.currentPage - 1) * self.groupsPerPage);
            self.showSearch = (self.currentPage == 1) ? true : false;
            self.textSearch = (self.currentPage == 1) ? self.textSearch  : "";
        }

        function addNewGroup() {
            groupService.addGroup(self.group).then(function (response) {
                self.list = response.data;
            })
        }
        function showAddGroupForm() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/group/add-group.html',
                controller: 'groupModalController as groups',
                backdrop: false,
                resolve: {
                    currentGroup: {}
                }
            });
            modalInstance.result.then(function(response) {
                ngDialog.open({template: '<div class="ngdialog-message"> \
						  Групу успішно додано!</div>'
                });
                countGroups();
                pageChanged();
            })
        }
        function countGroups() {
            groupService.countGroups().then(function(response) {
                self.totalGroups = response.data;
            })
        }

        function deleteGroup(group_id) {
            console.log(group_id);
            ngDialog.openConfirm({
                template: 'app/admin/group/delete-group.html',
                plain: false
            }).then(function() {
                groupService.deleteGroup(group_id).then(deleteGroupComplete);
            });
        }

        function deleteGroupComplete(response) {
            if(response.data.response == "ok") {
                ngDialog.open({template: '<div class="ngdialog-message"> \
						  Групу видалено!</div>'
                });
                countGroups();
                pageChanged();
            }
        }
        function showEditGroupForm(group) {
            //we need this to get current ID of subject and to pass it to SubjectModalController
            // to edit current subject
            appConstants.currentID = group.group_id;

            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/group/edit-group.html',
                controller: 'groupModalController as groups',
                backdrop: false,
                resolve: {
                    //the variable is needed to store data of current subject
                    // to fill up the form of editing subject
                    currentGroup: group

                }
            });
            modalInstance.result.then(function() {
                pageChanged();
            })
        }


    }

}());
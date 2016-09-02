
(function(){
    'use strict';

    angular.module('app')
        .controller('GroupController', groupController);
    groupController.$inject = ['groupService', 'loginService', 'facultyService', 'specialityService', 'appConstants', '$uibModal', '$stateParams'];

    function groupController(groupService, loginService, facultyService, specialityService, appConstants, $uibModal, $stateParams) {
        var self = this;

        //variables

        self.list = {};
        self.facultyList = {};
        self.specialityList = {};
        self.associativeSpeciality = {};
        self.associativeFaculty = {};
        self.showMessageNoEntity = false;

        //variables for pagination panel and search

        self.totalSubjects = 0;
        self.showSearch = true;
        self.textSearch = "";
        self.begin = 0;
        self.totalGroups = 0;
        self.speciality_id = $stateParams.currentSpecialityId;
        self.faculty_id = $stateParams.faculty_id;
        self.currentPage = 1;
        self.groupsPerPage = 5;
        self.numberToDisplayGroupsOnPage = [5,10,15,20];

        //methods

        self.pageChanged = pageChanged;
        self.getGroups = getGroups;
        self.deleteGroup = deleteGroup;
        self.showAddGroupForm = showAddGroupForm;
        self.showEditGroupForm = showEditGroupForm;
        self.addNewGroup = addNewGroup;
        self.getFaculty = getFaculty;
        self.getSpeciality = getSpeciality;
        self.pageChanged = pageChanged;
        self.isLogged = isLogged;

        activate();

        function activate() {
            isLogged();
            getGroups()
                .then(getFaculty)
                .then(getSpeciality);
        }

        function isLogged() {
            loginService.isLogged();
        }

        function getSpeciality() {
            specialityService.getSpecialities().then( function(response) {
                self.specialityList = response.data;
                //we make substitute id and name
                for (var i = 0; i < self.specialityList.length; i++) {
                    self.associativeSpeciality[self.specialityList[i].speciality_id] = self.specialityList[i].speciality_name;
                }
                if(!self.showMessageNoEntity) {
                    self.list = self.list.map(function (speciality) {
                        speciality.speciality_name = self.associativeSpeciality[speciality.speciality_id];
                        return speciality;
                    });
                }
            });
        }

        function getFaculty() {
            facultyService.getFaculties().then( function(response) {
                self.facultyList = response.data;
                //we make substitute id and name
                for (var i = 0; i < self.facultyList.length; i++) {
                    self.associativeFaculty[self.facultyList[i].faculty_id] = self.facultyList[i].faculty_name;
                }
                if(!self.showMessageNoEntity) {
                    self.list = self.list.map(function (faculty) {
                        faculty.faculty_name = self.associativeFaculty[faculty.faculty_id];
                        return faculty;
                    });
                }
            });
        }

        function getGroups() {
            return groupService.getGroups(self.speciality_id, self.faculty_id).then(function(response) {
                self.list = response.data;
                self.totalGroups = response.data.length;
                (response.data.response === "no records") ? self.showMessageNoEntity = true : self.showMessageNoEntity = false;
            });
        }

        function pageChanged() {
            self.begin = ((self.currentPage - 1) * self.groupsPerPage);
            self.showSearch = (self.currentPage === 1) ? true : false;
            self.textSearch = (self.currentPage === 1) ? self.textSearch  : "";
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
                $uibModal.open({
                    templateUrl: 'app/modal/partials/confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
                activate();
                pageChanged();
            })
        }

        function deleteGroup(group_id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modal/partials/confirm-delete-dialog.html',
                controller: 'modalController as modal',
                backdrop: true
            });
            modalInstance.result.then(function(response) {
                if (response) {
                    groupService.deleteGroup(group_id).then(deleteGroupComplete);
                } else {
                    return response;
                }
            });
        }

        function deleteGroupComplete(response) {
            if(response.status === 400) {
                $uibModal.open({
                    templateUrl: 'app/modal/partials/forbidden-confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
            }

            if(response.data.response == "ok") {
                $uibModal.open({
                    templateUrl: 'app/modal/partials/confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
                activate();
                pageChanged();
            }
        }
        function showEditGroupForm(group) {
            //we need this to get current ID of group and to pass it to GroupModalController
            // to edit current group
            appConstants.currentID = group.group_id;

            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/group/edit-group.html',
                controller: 'groupModalController as groups',
                backdrop: false,
                resolve: {
                    //the variable is needed to store data of current group
                    // to fill up the form of editing group
                    currentGroup: group

                }
            });
            modalInstance.result.then(function() {
                activate();
                pageChanged();
            })
        }


    }

}());
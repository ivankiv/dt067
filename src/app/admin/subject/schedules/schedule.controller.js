(function(){
    'use strict';

    angular.module('app')
        .controller('ScheduleController', scheduleController);
        scheduleController.$inject = ['loginService', 'subjectService', 'scheduleService', 'groupService', '$stateParams', '$uibModal', 'ngDialog'];

        function scheduleController(loginService, subjectService, scheduleService, groupService, $stateParams, $uibModal, ngDialog) {
            var self = this;

            //varibles
            self.currentSubjectName = '';
            self.showMessageNoEntity = false;
            self.list = {};
            self.associativeSubject = {};
            self.associativeGroup = {};
            self.group_id = $stateParams.group_id;
            self.currentGroup = {};
self.subject_name = 'name';
            //methods
            self.getOneSubject = getOneSubject;
            self.getSubjects = getSubjects;
            self.getScheduleForSubject = getScheduleForSubject;
            self.getGroups = getGroups;
            self.deleteSchedule = deleteSchedule;
            self.showAddScheduleForm = showAddScheduleForm;
            self.showEditScheduleForm = showEditScheduleForm;
            self.getScheduleForGroup = getScheduleForGroup;

            activate();

            function activate() {
                isLogged();
                if (self.group_id) {
                    getGroups();
                    getScheduleForGroup();
                    getSubjects();
                } else {
                    getOneSubject();
                    getScheduleForSubject();
                    getGroups();
                }
            }

            function isLogged() {
                loginService.isLogged();
            }

            function getOneSubject() {
                subjectService.getOneSubject($stateParams.currentSubjectId).then(function(response) {
                    self.currentSubjectName = response.data[0].subject_name;
                })
            }

            function getScheduleForSubject() {
                scheduleService.getScheduleForSubject($stateParams.currentSubjectId).then(getScheduleForSubjectComplete)
            }
            function getScheduleForSubjectComplete(response) {
                if(response.data.response === 'no records') {
                    self.list = {};
                    self.showMessageNoEntity = true;
                } else {
                    self.list = response.data;
                }
            }

            function getGroups() {
                groupService.getGroups().then(function(response) {
                    angular.forEach(response.data, function(group) {
                        self.associativeGroup[group.group_id] = group.group_name;
                    });
                })
            }

            function getSubjects() {
                subjectService.getSubjects().then(function(response) {
                    angular.forEach(response.data, function(subject) {
                        self.associativeSubject[subject.subject_id] = subject.subject_name;
                    });
                });
            }

            function getScheduleForGroup() {
                scheduleService.getScheduleForGroup(self.group_id).then(function (response) {
                    self.list = response.data;
                    (response.data.response === "no records") ? self.showMessageNoEntity = true : self.showMessageNoEntity = false;
                });
            }

            function deleteSchedule(schedule_id) {
                ngDialog.openConfirm({
                    template: 'app/partials/confirm-delete-dialog.html',
                    plain: false
                }).then(function() {
                    scheduleService.deleteSchedule(schedule_id).then(function(response) {
                        if(response.data.response === 'ok') {
                            activate();
                        }
                    });
                })
            }

            function showAddScheduleForm() {
                self.currentGroup.group_id = self.group_id;
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/schedules/add-schedule.html',
                    controller: 'ScheduleModalController as schedules',
                    backdrop: false,
                    resolve: {
                        currentSchedule: {},
                        currentGroupId: self.currentGroup
                    }
                });
                modalInstance.result.then(function() {
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Додано новий запис!</div>'
                    });
                    self.showMessageNoEntity = false;
                    activate();
                })
            }

            function showEditScheduleForm(currentSchedule) {
                self.currentGroup.group_id = self.group_id;
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/schedules/edit-schedule.html',
                    controller: 'ScheduleModalController as schedules',
                    backdrop: false,
                    resolve: {
                        currentSchedule: currentSchedule,
                        currentGroupId: self.currentGroup
                    }
                });
                modalInstance.result.then(function() {
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Зміни збережено!</div>'
                    });
                    activate();
                })
            }
        }
}());
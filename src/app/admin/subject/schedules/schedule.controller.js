(function(){
    'use strict';

    angular.module('app')
        .controller('ScheduleController', scheduleController);
        scheduleController.$inject = ['subjectService', 'scheduleService', 'groupService', '$stateParams', '$uibModal', 'ngDialog'];

        function scheduleController(subjectService, scheduleService, groupService, $stateParams, $uibModal, ngDialog) {
            var self = this;

            //varibles
            self.currentSubjectName = '';
            self.showMessageNoEntity = false;
            self.list = {};
            self.associativeGroup = {};

            //methods
            self.getOneSubject = getOneSubject;
            self.getScheduleForSubject = getScheduleForSubject;
            self.getGroups = getGroups;
            self.showAddSheduleForm = showAddSheduleForm;

            activate();

            function activate() {
                getOneSubject();
                getScheduleForSubject();
                getGroups();
            }

            function getOneSubject() {
                subjectService.getOneSubject($stateParams.currentSubjectId).then(function(response) {
                    self.currentSubjectName = response.data[0].subject_name;
                })
            }

            function getScheduleForSubject() {
                scheduleService.getScheduleForSubject($stateParams.currentSubjectId).then(getScheduleForSubjectComplete)
            }

            function getGroups() {
                groupService.getGroups().then(function(response) {
                    angular.forEach(response.data, function(group) {
                        self.associativeGroup[group.group_id] = group.group_name;
                    });
                })
            }

            function showAddSheduleForm() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/schedules/add-schedule.html',
                    controller: 'ScheduleModalController as schedules',
                    backdrop: false,
                    resolve: {
                        currentShedule: {}
                    }
                });
                modalInstance.result.then(function() {
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Додано новий запис!</div>'
                    });
                    self.showMessageNoEntity = false;
                    getScheduleForSubject();
                })
            }

            function getScheduleForSubjectComplete(response) {
                if(response.data.response === 'no records') {
                    self.showMessageNoEntity = true;
                } else {
                    self.list = response.data;
                    console.log(self.list);
                }
            }
        }
}());
(function(){
    'use strict';

    angular.module('app')
        .controller('ScheduleModalController', scheduleModalController);
    scheduleModalController.$inject = ['scheduleService', 'groupService', '$stateParams', 'subjectService', '$uibModalInstance', 'currentSchedule', 'currentGroupId'];

        function scheduleModalController(scheduleService, groupService, $stateParams, subjectService,  $uibModalInstance,  currentSchedule, currentGroupId) {
            var self = this;

            //variables
            self.schedule = {};
            self.schedule.subject_id = $stateParams.currentSubjectId;
            self.currentSchedule = currentSchedule;
            self.groupList = {};
            self.subjectList = {};
            self.alreadyExistInSchedule = false;
            self.incorrectDateEntered = false;
            self.group_id =  currentGroupId.group_id;



            //->DatePicker
            self.DatePickerOpened = false;
            self.format = 'yyyy/MM/dd';
            self.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            };
            //<- the end of DatePicker

            //methods
            self.addSchedule = addSchedule;
            self.updateSchedule = updateSchedule;
            self.getGroups = getGroups;
            self.cancelForm = cancelForm;
            self.openDatePicker = openDatePicker;
            self.getSubjects = getSubjects;

            activate();

            function activate() {
                getGroups();
                getSubjects();
            }

            function getGroups() {
                groupService.getGroups().then(function(response) {
                    self.groupList = response.data;
                })
            }

            function getSubjects() {
                subjectService.getSubjects().then(function(response) {
                    self.subjectList = response.data;
                });
            }

            function addSchedule() {
                if(self.group_id) {
                    self.schedule.group_id = self.group_id;
                    scheduleService.addSchedule(self.schedule).then(addScheduleComplete)
                } else {
                    scheduleService.addSchedule(self.schedule).then(addScheduleComplete)
                }
            }

            function updateSchedule() {
                scheduleService.updateSchedule(currentSchedule.timetable_id, self.currentSchedule).then(updateScheduleComplete)
            }

            function addScheduleComplete (response) {
                if(response.status === 400) {
                    self.alreadyExistInSchedule = true;
                }

                if(response.data.response === 'ok') {
                    $uibModalInstance.close();
                    self.schedule = {subject_id: null, event_date: new Date()};
                }
            }

            function updateScheduleComplete(response) {
                if(response.data.response === 'Error when update') {
                    self.incorrectDateEntered = true;
                }

                if(response.data.response === 'ok') {
                    $uibModalInstance.close();
                    self.currentSchedule = {subject_id: null, event_date: new Date()};
                }
            }

            function openDatePicker() {
                self.DatePickerOpened = true;
            }

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && date.getDay() === 0;
            }

            function cancelForm() {
                $uibModalInstance.dismiss();
            }

    }
}());

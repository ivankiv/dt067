(function(){
    'use strict';

    angular.module('app')
        .controller('ScheduleModalController', scheduleModalController);
    scheduleModalController.$inject = ['scheduleService', 'groupService', '$stateParams', '$uibModalInstance', 'currentSchedule', 'ngDialog'];

        function scheduleModalController(scheduleService, groupService, $stateParams,  $uibModalInstance,  currentSchedule,  ngDialog) {
            var self = this;

            //variables
            self.schedule = {};
            self.schedule.subject_id = $stateParams.currentSubjectId;
            self.currentSchedule = currentSchedule;
            self.gpoupList = {};
            self.alreadyExistInSchedule = false;

            //->DatePicker
            self.DatePickerOpened = false;
            self.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1,
            };
            //<- the end of DatePicker

            //methods
            self.addSchedule = addSchedule;
            self.updateSchedule = updateSchedule;
            self.getGroups = getGroups;
            self.cancelForm = cancelForm;
            self.openDatePicker = openDatePicker;

            activate();

            function activate() {
                getGroups();
            }

            function getGroups() {
                groupService.getGroups().then(function(response) {
                    self.groupList = response.data;
                })
            }

            function addSchedule() {
                scheduleService.addSchedule(self.schedule).then(addScheduleComplete)
            }

            function updateSchedule() {
                scheduleService.updateSchedule(currentSchedule.timetable_id, self.currentSchedule).then(updateScheduleComplete)
            }

            function addScheduleComplete (response) {
                if(response.data.response === 'ok') {
                    $uibModalInstance.close();
                    self.schedule = {};
                }
                if(response.status === 400) {
                    self.alreadyExistInSchedule = true;
                }
            }

            function updateScheduleComplete(response) {
                if(response.data.response === 'ok') {
                    $uibModalInstance.close();
                    self.currentSchedule = {};
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

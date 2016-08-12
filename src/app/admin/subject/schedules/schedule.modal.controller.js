(function(){
    'use strict';

    angular.module('app')
        .controller('ScheduleModalController', scheduleModalController);
    scheduleModalController.$inject = ['scheduleService', '$stateParams', '$uibModalInstance', 'currentSchedule', 'ngDialog'];

        function scheduleModalController(scheduleService, $stateParams,  $uibModalInstance,  currentSchedule, ngDialog) {
            var self = this;

            //variables
            self.schedule = {};
            self.currentSchedule = currentSchedule;
            self.gpoupList = {};
            self.wasNotEditTestMessage = false;

            //methods
            self.addSchedule = addSchedule;
            self.updateSchedule = updateSchedule;
            self.getGroups = getGroups;
            self.cancelForm = cancelForm;

            activate();

            function activate() {
                getGroups();
            }

            function getGroups() {

            }

    }
}());

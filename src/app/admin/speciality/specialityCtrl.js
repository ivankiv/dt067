(function(){
    'use strict';

    angular.module('app')
        .controller('specialityCtrl', specialityController);
    specialityController.$inject = ['specialityService'];

    function specialityController(specialityService) {
        var self = this;
        self.list = {};
        self.speciality = {speciality_code: "", speciality_name: ""};
        self.totalSpecialities = 0;
        self.currentPage = 1;
        self.specialitiesPerPage = 10;
        var firstSpecialityInList = 0;
        self.pageChanged = pageChanged;
        self.showErrorMessage = false;
        self.message = "Loading...";
        self.addSpeciality = addSpeciality;

        activate();

        function activate() {
            specialityService.getRecordsRange(self.specialitiesPerPage, firstSpecialityInList)
                .then(getRecordsRangeComplete, getRecordsRangeFailed);

            specialityService.countSpecialities()
                .then(countSpecialityComplete, rejected);
        }

        function addSpeciality() {
            specialityService.addSpeciality(self.speciality)
                .then(addSpecialityComplete, rejected)
        }

        function getRecordsRangeComplete(response) {
            self.list = response.data;
        }

        function getRecordsRangeFailed(response) {
            self.showErrorMessage = true;
            self.message = "Error:" + " " + response.status + " " + response.statusText;
        }

        function countSpecialityComplete(response) {
            self.totalSpecialities = response.data;
        }

        function addSpecialityComplete(response) {
            if(response.data.response = "ok") {
                self.speciality = {};
            }
        }

        function pageChanged() {
            var begin = ((self.currentPage - 1) * self.specialitiesPerPage);
            console.log("begin: " + begin);
            specialityService.getRecordsRange(self.specialitiesPerPage, begin).then(getRecordsRangeComplete);
        }

        function rejected(response) {
            console.log(response.status + " " + response.statusText);
        }

    }
})();
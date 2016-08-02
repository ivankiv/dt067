(function(){
    'use strict';

    angular.module('app')
        .controller('facultyCtrl', facultyController);
    facultyController.$inject = ['facultyFactory'];

    function facultyController(facultyFactory) {
        var self = this;
        /******** the list of faculties*********/
        self.list = {};
        /******** the amount of faculties*********/
        self.totalFaculties = 0;
        self.currentPage = 1;
        self.pageChanged = pageChanged;
        /*********** message to get know what the error ***********/
        self.showErrorMessage = false;
        self.message = "Loading...";
        self.facultyPerPage = 10;
        var firstFacultyInList = 0;


        activate();

        function activate() {
            facultyFactory.getRecordsRange(self.facultyPerPage, firstFacultyInList )
                .then(getRecordsRangeComplete, getRecordsRangeFailed);

            facultyFactory.countFaculties().then(success,error);

        }

        facultyFactory.getFaculties().then(fullfilled, rejected);


        function pageChanged() {
            var begin = ((self.currentPage - 1) * self.facultyPerPage);
            facultyFactory.getRecordsRange(self.facultyPerPage, begin).then(getRecordsRangeComplete);
        }

        function success(response) {
            self.totalFaculties = response.data;
        }
        function error(response) {
            console.log(response.status + " " + response.statusText);
        }

        function fullfilled(response) {
            self.list = response.data;
            console.log(self.list)
        }
        function rejected(response) {
            self.showErrorMessage = true;
            self.message = "Error" + " " + response.status + " " + response.statusText;
        }
        function getRecordsRangeComplete(response) {
            self.list = response.data;
        }

        function getRecordsRangeFailed(response) {
            self.showErrorMessage = true;
            self.message = "Error:" + " " + response.status + " " + response.statusText;
        }
    }
})();
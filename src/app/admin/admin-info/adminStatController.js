(function(){
    'use strict';

    angular
        .module("app")
        .controller("adminStatController", adminStatController);

    adminStatController.$inject = ['adminStatisticService'];

    function adminStatController(adminStatisticService) {

        var self = this;
        self.facultiesQuantity = 0;
        self.specialitiesQuantity = 0;
        self.groupsQuantity = 0;
        self.studentsQuantity = 0;
        self.subjectsQuantity = 0;
        self.testsQuantity = 0;

        activate();

        function activate() {
            getFacultiesQuantity();
            getSpecialitiesQuantity();
            getGroupsQuantity();
            getStudentsQuantity();
            getSubjectsQuantity();
            getTestsQuantity();
        }

        function getFacultiesQuantity (){
            adminStatisticService.getFacultiesQuantity().then(function (data) {
                self.facultiesQuantity = data.data.numberOfRecords;
            });
        }

        function getSpecialitiesQuantity (){
            adminStatisticService.getSpecialitiesQuantity().then(function (data) {
                self.specialitiesQuantity = data.data.numberOfRecords;
            });
        }

        function getGroupsQuantity (){
            adminStatisticService.getGroupsQuantity().then(function (data) {
                self.groupsQuantity = data.data.numberOfRecords;
            });
        }

        function getStudentsQuantity (){
            adminStatisticService.getStudentsQuantity().then(function (data) {
                self.studentsQuantity = data.data.numberOfRecords;
            });
        }

        function getSubjectsQuantity (){
            adminStatisticService.getSubjectsQuantity().then(function (data) {
                self.studentsQuantity = data.data.numberOfRecords;
            });
        }

        function getTestsQuantity (){
            adminStatisticService.getSubjectsQuantity().then(function (data) {
                self.studentsQuantity = data.data.numberOfRecords;
            });
        }

    }
}());
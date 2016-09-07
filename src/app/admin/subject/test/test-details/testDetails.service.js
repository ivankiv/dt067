(function() {
    'use strict';

    angular.module('app')
        .factory('testDetailsService', testDetailsService);
        testDetailsService.$inject = ['$http', 'appConstants'];

        function testDetailsService ($http, appConstants) {
            return {
                getTestDetailsByTest: getTestDetailsByTest,
                addTestDetails: addTestDetails,
                editTestDetails: editTestDetails,
                deleteTestDetails: deleteTestDetails
            };

            function getTestDetailsByTest(test_id) {
                return $http.get(appConstants.getTestDetailsByTest + test_id)
                    .then(fulfilled, rejected);
            }

            function addTestDetails(data) {
                return $http.post(appConstants.addTestDetails, data)
                    .then(fulfilled, rejected);
            }

            function deleteTestDetails(id) {
                return $http.delete(appConstants.deleteTestDetails + id)
                    .then(fulfilled, rejected);
            }

            function editTestDetails(id, data) {
                return $http.post(appConstants.editTestDetails + id, data)
                    .then(fulfilled, rejected);
            }

            function fulfilled(response) {
                return response;
            }
            function rejected(response) {
                return response;
            }

            //->???????????????????????????????????????????????
            //This function filtered available level for select tag
            function getLevel(arrTestDetail){
                var level = [];
                var usedLevel = [];
                if (Array.isArray(arrTestDetail)){
                    arrTestDetail.forEach(function(item){
                        usedLevel.push(item.level);
                    })
                }
                for(var i = 1;i <= 7;i++){
                    level.push(i);
                }
                var availableLevel = level.filter(function (itemLevel) {
                    return usedLevel.every(function(usedItem){
                        return usedItem != itemLevel;     
                    });
                });
                
                return availableLevel;
            }
            
            //This function count how many tasks are available

            function availableTasks(arrTestDetail,maxQuantityOfTasks) {
                var countOfUsedTasks = 0;
                if(Array.isArray(arrTestDetail)){
                    arrTestDetail.forEach(function (item) {
                       countOfUsedTasks += parseInt(item.tasks);
                    });
                }
                return (parseInt(maxQuantityOfTasks) - countOfUsedTasks);
            }
            //<-???????????????????????????????????????????????
    }
}());


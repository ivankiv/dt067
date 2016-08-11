(function() {
    'use strict';

    angular.module('app')
        .factory('groupService', groupService);
        groupService.$inject = ['$http', 'appConstants'];

        function groupService ($http, appConstants) {
            return {
                getGroups: getGroups
            };

            function getGroups() {
                return $http.get(appConstants.getGroups)
                    .then(fulfilled, rejected);
            }

            function fulfilled(response) {
                return response;
            }
            function rejected(response) {
                return response;
            }
        }
}());
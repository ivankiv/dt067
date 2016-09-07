(function () {
    'use strict';

    angular.module('app')
        .factory('spinnerService',spinnerService);

    spinnerService.$inject = ['$q','$rootScope'];

    function spinnerService($q,$rootScope) {
        var iterator = 0;

        return {
            request:function (config) {
                iterator++;
                $rootScope.$broadcast("spinner_show");
                return config || $q.when(config)
            },
            response: function (response) {
                if((--iterator) === 0) {
                    $rootScope.$broadcast("spinner_hide");
                }
                return response || $q.when(response);
            },
            responseError: function (response) {
                if(!(--iterator)){
                    $rootScope.$broadcast("spinner_hide");
                }
                return $q.reject(response);
            }
        };
    }
}());

(function () {
    'use strict';

    angular.module('app')
        .directive('spinner',spinner);

    function spinner() {
        return {
            link:function ($scope,element) {
                $scope.$on("spinner_show",function () {
                    if (element.hasClass("hidden")){
                        element.removeClass("hidden")
                    }
                });
                return $scope.$on("spinner_hide",function () {
                    if (!element.hasClass("hidden")){
                        element.addClass("hidden")
                    }
                });
            }
        }
    }
}());

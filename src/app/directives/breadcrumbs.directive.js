(function () {
    'use strict';
    angular.module('app')
        .directive('breadcrumbs', function () {
            return {
                restrict: 'EA',
                replace: false,
                scope: {
                    itemDisplayNameResolver: '&'
                },
                templateUrl: 'app/directives/templates/breadcrumbs-directive.html',
                controller: ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {

                    var defaultResolver = function (state) {

                        var displayName = state.ncyBreadcrumb.label || state.name;

                        return displayName;
                    };

                    var isCurrent = function(state){
                        return $state.$current.name === state.name;
                    };

                    var setNavigationState = function () {
                        $scope.$navigationState = {
                            currentState: $state.$current,
                            params: $stateParams,
                            getDisplayName: function (state) {

                                if ($scope.hasCustomResolver) {
                                    return $scope.itemDisplayNameResolver({
                                        defaultResolver: defaultResolver,
                                        state: state,
                                        isCurrent: isCurrent(state)
                                    });
                                }
                                else {
                                    return defaultResolver(state);
                                }
                            },
                            isCurrent: function (state) {

                                return isCurrent(state);
                            }
                        }
                    };

                    $scope.$on('$stateChangeSuccess', function () {
                        setNavigationState();
                    });

                    setNavigationState();
                }],
                link: function (scope, element, attrs, controller) {
                    scope.hasCustomResolver = angular.isDefined(attrs['itemDisplayNameResolver']);
                }
            };
        });

})();
(function() {
    var moduleName = 'breadcrumbsDirective';
    var templateUrl = 'directives/uiBreadcrumbs/uiBreadcrumbs.tpl.html';
    var module;
    try {
        module = angular.module(moduleName);
    } catch(err) {
        module = angular.module(moduleName, ['ui.router']);
    }

    module.directive('uiBreadcrumbs', ['$interpolate', '$state', function($interpolate, $state) {
        return {
            restrict: 'E',
            templateUrl: function(elem, attrs) {
                return attrs.templateUrl || templateUrl;
            },
            scope: {
                displaynameProperty: '@',
                abstractProxyProperty: '@?'
            },
            link: function(scope) {
                scope.displayName = [];
                if ($state.$current.name !== '') {
                    updateBreadcrumbsArray();
                }
                scope.$on('$stateChangeSuccess', function() {
                    updateBreadcrumbsArray();
                });

                function updateBreadcrumbsArray() {
                    var workingState;
                    var displayName;
                    var breadcrumbs = [];
                    var currentState = $state.$current;

                    while(currentState && currentState.name !== '') {
                        workingState = getWorkingState(currentState);
                        if (workingState) {
                            displayName = getDisplayName(workingState);

                            if (displayName !== false && !stateAlreadyInBreadcrumbs(workingState, breadcrumbs)) {
                                breadcrumbs.push({
                                    displayName: displayName,
                                    route: workingState.name
                                });
                            }
                        }
                        currentState = currentState.parent;
                    }
                    breadcrumbs.reverse();
                    scope.displayName = breadcrumbs;
                }

                function getWorkingState(currentState) {
                    var proxyStateName;
                    var workingState = currentState;
                    if (currentState.abstract === true) {
                        if (typeof scope.abstractProxyProperty !== 'undefined') {
                            proxyStateName = getObjectValue(scope.abstractProxyProperty, currentState);
                            if (proxyStateName) {
                                workingState = $state.get(proxyStateName);
                            } else {
                                workingState = false;
                            }
                        } else {
                            workingState = false;
                        }
                    }
                    return workingState;
                }

                function getDisplayName(currentState) {
                    var interpolationContext;
                    var propertyReference;
                    var displayName;

                    if (!scope.displaynameProperty) {
                        return currentState.name;
                    }
                    propertyReference = getObjectValue(scope.displaynameProperty, currentState);

                    if (propertyReference === false) {
                        return false;
                    } else if (typeof propertyReference === 'undefined') {
                        return currentState.name;
                    } else {
                        interpolationContext =  (typeof currentState.locals !== 'undefined') ? currentState.locals.globals : currentState;
                        displayName = $interpolate(propertyReference)(interpolationContext);
                        return displayName;
                    }
                }

                function getObjectValue(objectPath, context) {
                    var i;
                    var propertyArray = objectPath.split('.');
                    var propertyReference = context;

                    for (i = 0; i < propertyArray.length; i ++) {
                        if (angular.isDefined(propertyReference[propertyArray[i]])) {
                            propertyReference = propertyReference[propertyArray[i]];
                        } else {
                            return undefined;
                        }
                    }
                    return propertyReference;
                }

                function stateAlreadyInBreadcrumbs(state, breadcrumbs) {
                    var i;
                    var alreadyUsed = false;
                    for(i = 0; i < breadcrumbs.length; i++) {
                        if (breadcrumbs[i].route === state.name) {
                            alreadyUsed = true;
                        }
                    }
                    return alreadyUsed;
                }
            }
        };
    }]);
}());
angular.module('app')
    .run(runApp);

runApp.$inject = ['$rootScope','$state', 'USER_ROLES', 'loginService' ];
function runApp($rootScope, $state, USER_ROLES, loginService){

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams)
    {

        if ((fromState.name == 'user.results' ||  fromState.name == 'user') && toState.name == 'test')
        {
            event.preventDefault();
            $state.go('user');
        }
        else $rootScope.previousState = fromState.name;

        if (toState.data && toState.data.authorizedRole) {
            loginService.isAuthorized().then(function() {
                if (toState.name.indexOf("admin") !== -1 && localStorage.userRole === USER_ROLES.ADMIN) {
                    $state.go(toState, toParams);
                } else if (toState.name.indexOf("user") !== -1 && localStorage.userRole === USER_ROLES.USER) {
                    $state.go(toState, toParams);
                } else {
                    event.preventDefault();
                    $state.go("login");
                }
            });
        }
    });
}
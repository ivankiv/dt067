angular.module('app')
    .run(runApp);

runApp.$inject = ['$rootScope','$state', 'defineUser', 'loginService' ];
function runApp($rootScope, $state, defineUser, loginService){

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams)
    {

        if ((fromState.name == 'user.results' ||  fromState.name == 'user') && toState.name == 'test')
        {
            event.preventDefault();
            $state.go('user');
        }
        else $rootScope.previousState = fromState.name;

        if (toState.data && toState.data.role) {
            loginService.authorizeRole().then(function() {
                if (toState.data.role === "admin" && localStorage.userRole === defineUser.admin) {
                    $state.go(toState, toParams);
                } else if (toState.data.role === "student" && localStorage.userRole === defineUser.user) {
                    $state.go(toState, toParams);
                } else {
                    event.preventDefault();
                    localStorage.removeItem("userRole");
                    $state.go("login");
                }
            });
        }
    });
}
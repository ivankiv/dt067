angular.module('app')
    .run(runApp);

runApp.$inject = ['$rootScope','$state'];
function runApp($rootScope,$state){

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams)
    {

        if (fromState.name == 'user.results' && toState.name == 'test')
        {
            event.preventDefault();
            $state.go('user');
        }
        else $rootScope.previousState = fromState.name;
    });
}
angular.module('app')
    .config(configApp);

    configApp.$inject = ['$stateProvider', '$urlRouterProvider', 'ngDialogProvider' ];

    function configApp($stateProvider, $urlRouterProvider, ngDialogProvider) {

        ngDialogProvider.setDefaults({
            plain: true,
            showClose: true,
            closeByDocument: true,
            closeByEscape: true
        });

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'app/auth/login.html',
                controller: 'LoginCtrl as login'
            })

            .state('admin-home', {
                url: '/admin',
                templateUrl: 'app/admin/admin-home.html'
            })

            .state('admin-home.subject', {
                url: '/subject',
                views: {
                    'content': {
                        templateUrl: 'app/admin/subject/subject.html',
                        controller: 'SubjectController as subjects'
                    }
                }
            })

            .state('admin-home.speciality', {
                url: '/speciality',
                views: {
                    'content': {
                        templateUrl: 'app/admin/speciality/speciality.html',
                        controller: 'specialityCtrl as speciality'
                    }
                }
            })

            .state('admin-home.faculty', {
                url: '/faculty',
                views: {
                    'content': {
                        templateUrl: 'app/admin/faculty/faculty.html',
                        controller: 'facultyCtrl as faculty'
                    }
                }
            })

            .state('admin-home.admin', {
                url: '/edit-admin',
                views: {
                    'content': {
                        templateUrl: 'app/admin/admin-info/admin.html',
                        controller: 'AdminEditController as admins'
                    }
                }
            });
}
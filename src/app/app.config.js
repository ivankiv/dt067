angular.module('app')
    .config(configApp);

configApp.$inject = ['$stateProvider', '$urlRouterProvider', 'ngDialogProvider' ];

function configApp($stateProvider, $urlRouterProvider, ngDialogProvider) {

    ngDialogProvider.setDefaults({
        plain: true,
        showClose: true,
        closeByDocument: false,
        closeByEscape: true,
        closeByNavigation: true
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

        .state('admin-home.schedule', {
            url: '/subject/:currentSubjectId/schedule',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/schedules/schedule.html',
                    controller: 'ScheduleController as schedules'
                }
            }
        })

        .state('admin-home.groups', {
            url: '/group',
            views: {
                'content': {
                    templateUrl: 'app/admin/group/groups.html'
                    // controller: 'SubjectController as subjects'
                }
            }
        })

        .state('admin-home.test', {
            url: '/subject/:currentSubjectId/test',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/test/test.html',
                    controller: 'TestController as tests'
                }
            }
        })

        .state('admin-home.speciality', {
            url: '/speciality',
            views: {
                'content': {
                    templateUrl: 'app/admin/speciality/speciality.html',
                    controller: 'SpecialityController as specialities'
                }
            }
        })

        .state('admin-home.faculty', {
            url: '/faculty',
            views: {
                'content': {
                    templateUrl: 'app/admin/faculty/faculty.html',
                    controller: 'facultyController as faculties'
                }
            }
        })

        .state('admin-home.newFaculty', {
            url: '/newFaculty',
            views: {
                'content': {
                    templateUrl: 'app/admin/faculty/faculty-add.html',
                    controller: 'facultyController as faculties'
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
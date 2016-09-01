angular.module('app')
    .config(configApp);


configApp.$inject = ['$stateProvider', '$urlRouterProvider', 'ngDialogProvider', '$breadcrumbProvider'];

function configApp($stateProvider, $urlRouterProvider, ngDialogProvider, $breadcrumbProvider) {


    ngDialogProvider.setDefaults({
        plain: true,
        showClose: true,
        closeByDocument: false,
        closeByEscape: true,
        closeByNavigation: true
    });

    $breadcrumbProvider.setOptions({
        prefixStateName: 'admin-home',
        template: 'bootstrap3'
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('login', {
            url: '/',
            templateUrl: 'app/auth/login.html',
            controller: 'loginController as login'
        })

        .state('user', {
            url: '/user',
            templateUrl: 'app/user/user.html',
            controller: 'UserController as user'
        })

        .state('test', {
            url: '/tests/test/:questionIndex',
            templateUrl: 'app/user/tests/test-player/test-player.html',
            controller: 'TestPlayerController as player'
        })

        .state('admin-home', {
            url: '/admin',
            templateUrl: 'app/admin/admin-home.html',
            controller: 'adminStatController as stat',
            ncyBreadcrumb: {
                label: 'Головна'
            }
        })

        .state('admin-home.subject', {
            url: '/subject',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/subject.html',
                    controller: 'SubjectController as subjects'
                }
            },
            ncyBreadcrumb: {
                label: 'Предмети'
            }
        })

        .state('admin-home.schedule', {
            url: '/subject/:currentSubjectId/schedule',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/schedules/schedule.html',
                    controller: 'ScheduleController as schedules'
                }
            },
            ncyBreadcrumb: {
                label: 'Розклад',
                parent: 'admin-home.subject'
            }
        })

        .state('admin-home.scheduleByGroupId', {
            url: '/group/:group_id/schedule',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/schedules/schedule.html',
                    controller: 'ScheduleController as schedules'
                }
            },
            ncyBreadcrumb: {
                label: 'Розклад',
                parent: 'admin-home.groups'
            }
        })

        .state('admin-home.groups', {
            url: '/group',
            views: {
                'content': {
                    templateUrl: 'app/admin/group/groups.html',
                    controller: 'GroupController as groups'
                }
            },
            ncyBreadcrumb: {
                label: 'Групи'
            }
        })

        .state('admin-home.groupsBySpeciality',{
            url:'/speciality/:currentSpecialityId/groups',
            views:{
                'content':{
                    templateUrl:'app/admin/group/groups.html',
                    controller:'GroupController as groups'
                }
            },
            ncyBreadcrumb: {
                label: 'Групи',
                parent: 'admin-home.speciality'
            }
        })

        .state('admin-home.groupsByFaculty',{
            url:'/faculty/:faculty_id/groups',
            views:{
                'content':{
                    templateUrl:'app/admin/group/groups.html',
                    controller:'GroupController as groups'
                }
            },
            ncyBreadcrumb: {
                label: 'Групи',
                parent: 'admin-home.faculty'
            }
        })

        .state('admin-home.test', {
            url: '/subject/:currentSubjectId/test',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/test/test.html',
                    controller: 'TestController as tests'
                }
            },
            ncyBreadcrumb: {
                label: 'Тести',
                parent: 'admin-home.subject'
            }
        })

        .state('admin-home.questions', {
            url: '/subject/:currentSubjectId/test/:currentTestId/questions',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/test/questions/questions.html',
                    controller: 'QuestionsController as questions'
                }
            },
            ncyBreadcrumb: {
                label: 'Питання',
                parent: 'admin-home.test'
            }
        })

        .state('admin-home.answers', {
            url: '/subject/:currentSubjectId/test/:currentTestId/questions/:questionId/answers',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/test/answers/answers.html',
                    controller: 'AnswersController as answers'
                }
            },
            ncyBreadcrumb: {
                label: 'Відповіді'
            }
        })

        .state('admin-home.testDetails', {
            url: '/subject/:currentSubjectId/test/:currentTestId/details',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/test/test-details/test-details.html',
                    controller: 'TestDetailsController as testDetails'
                }
            },
            ncyBreadcrumb: {
                label: 'Деталі тесту',
                parent: 'admin-home.test'
            }
        })

        .state('admin-home.speciality', {
            url: '/speciality',
            views: {
                'content': {
                    templateUrl: 'app/admin/speciality/speciality.html',
                    controller: 'SpecialityController as specialities'
                }
            },
            ncyBreadcrumb: {
                label: 'Спеціальності'
            }
        })

        .state('admin-home.faculty', {
            url: '/faculty',
            views: {
                'content': {
                    templateUrl: 'app/admin/faculty/faculty.html',
                    controller: 'facultyController as faculties'
                }
            },
            ncyBreadcrumb: {
                label: 'Факультет'
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
            },
            ncyBreadcrumb: {
                label: 'Адміни'
            }
        })

        .state('admin-home.student', {
            url: '/edit-student',
            views: {
                'content': {
                    templateUrl: 'app/admin/group/student/student.html',
                    controller: 'StudentEditController as students'
                }
            },
            ncyBreadcrumb: {
                label: 'Студенти'
            }
        })

        .state('admin-home.studentByGroup', {
            url: '/group/:group_id/students',
            views: {
                'content': {
                    templateUrl: 'app/admin/group/student/student.html',
                    controller: 'StudentEditController as students'
                }
            },
            ncyBreadcrumb: {
                label: 'Студенти',
                parent: 'admin-home.groups'
            }
        })

        .state('user.tests', {
                url: '/:groupId/tests',
                views: {
                    'content': {
                        templateUrl: 'app/user/tests/tests.html',
                        controller: 'TestsController as tests'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Тести'
                }
            });
}
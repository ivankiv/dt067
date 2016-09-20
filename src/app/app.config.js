angular.module('app')
    .config(configApp);

configApp.$inject = ['$stateProvider', '$urlRouterProvider', '$breadcrumbProvider', 'defineUser' ,'$httpProvider', 'ChartJsProvider'];

function configApp($stateProvider, $urlRouterProvider, $breadcrumbProvider , defineUser , $httpProvider, ChartJsProvider) {

    $httpProvider.interceptors.push('spinnerService');

    $breadcrumbProvider.setOptions({
        prefixStateName: 'admin-home',
        template: 'bootstrap3'
    });

    $urlRouterProvider.otherwise('/');

    ChartJsProvider.setOptions({
        chartColors: ['#FF5252', '#FF8A80'],
        responsive: false
    });

    ChartJsProvider.setOptions('line', {
        showLines: true
    });

    $stateProvider

        .state('login', {
            url: '/',
            templateUrl: 'app/auth/login.html',
            controller: 'loginController as login'
        })

        .state('user', {
            url: '/user',
            templateUrl: 'app/user/user.html',
            controller: 'UserController as user',
            data: {
                role: defineUser.user
            }
        })

        .state('test', {
            url: '/tests/test/:questionIndex',
            templateUrl: 'app/user/tests/test-player/test-player.html',
            controller: 'TestPlayerController as player',
            data: {
                role: defineUser.user
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
            data: {
                role: defineUser.user
            }
        })

        .state('user.results', {
            url: '/result',
            views: {
                'content': {
                    templateUrl: 'app/user/result.html',
                    controller: 'ResultUserController as result'
                }
            },
            data: {
                role: defineUser.user
            }
        })



        .state('admin-home', {
            url: '/admin',
            templateUrl: 'app/admin/admin-home.html',
            controller: 'adminStatController as stat',
            ncyBreadcrumb: {
                label: 'Головна'
            },
            data: {
                role: defineUser.admin
            }
        })

        .state('admin-home.result', {
            url: '/result/:group_id',
            views: {
                'content': {
                    templateUrl: 'app/admin/result/result.html',
                    controller: 'ResultController as result'
                }
            },
            ncyBreadcrumb: {
                label: 'Результати групи'
            },
            data: {
                role: defineUser.admin
            }
        })

        .state('admin-home.test-result', {
            url: '/:group_id/result/:test_id',
            views: {
                'content': {
                    templateUrl: 'app/admin/result/test-result.html',
                    controller: 'TestResultController as result'
                }
            },
            ncyBreadcrumb: {
                label: 'Результати тесту'
            },
            data: {
                role: defineUser.admin
            }
        })

        .state('admin-home.test-stats-result', {
            url: '/:group_id/result/:test_id/graphicalStatistics',
            views: {
                'content': {
                    templateUrl: 'app/admin/result/graphicalStatistics.html',
                    controller: 'TestResultController as result'
                }
            },
            ncyBreadcrumb: {
                label: 'Графік результатів'
            },
            data: {
                role: defineUser.admin
            }
        })

        .state('admin-home.config', {
            url: '/config',
            views: {
                'content': {
                    templateUrl: 'app/admin/config/config.html',
                    controller: 'ConfigController as config'
                }
            },
            ncyBreadcrumb: {
                label: 'Налаштування'
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
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
                label: 'Відповіді',
                parent: 'admin-home.questions'
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
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
                label: 'Факультети'
            },
            data: {
                role: defineUser.admin
            }
        })

        .state('admin-home.newFaculty', {
            url: '/newFaculty',
            views: {
                'content': {
                    templateUrl: 'app/admin/faculty/faculty-add.html',
                    controller: 'facultyController as faculties'
                }
            },
            data: {
                role: defineUser.admin
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
                label: 'Адміністратори'
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
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
            },
            data: {
                role: defineUser.admin
            }
        });
}
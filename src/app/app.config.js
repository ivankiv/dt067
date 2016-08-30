angular.module('app')
    .config(configApp);

configApp.$inject = ['$stateProvider', '$urlRouterProvider', 'ngDialogProvider','breadcrumbsDirective' ];

function configApp($stateProvider, $urlRouterProvider, breadcrumbsDirective, ngDialogProvider) {

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
            controller: 'loginController as login'
        })

        .state('user', {
            url: '/user',
            templateUrl: 'app/user/user.html',
            controller: 'UserController as user'
        })

        .state('test-player', {
            url: '/test-player/:currentTestId',
            templateUrl: 'app/user/tests/test-player/test-player.html',
            controller: 'TestPlayerController as player'
        })

        .state('admin-home', {
            url: '/admin',
            templateUrl: 'app/admin/admin-home.html',
            controller: 'adminStatController as stat',
            data: {
                displayName: 'Головна'

            }
        })
//////////////
        .state('admin-home.test_player', {
            url: '/test_player',
            views: {
                'content': {
                    templateUrl: 'app/user/tests/test-player/test-player.html',
                    controller: 'TestPlayerController as testPlayer'
                }
            }
        })
///////////////
        .state('admin-home.subject', {
            url: '/subject',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/subject.html',
                    controller: 'SubjectController as subjects'
                }
            },
            data: {
                displayName: 'Предмети'
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
            data: {
                displayName: 'Розклад'
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
            data: {
                displayName: 'Розклад'
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
            data: {
                displayName: 'Групи'
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
            data: {
                displayName: 'Групи'
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
            data: {
                displayName: 'Групи'
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
            data: {
                displayName: 'Тести'
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
            data: {
                displayName: 'Питання'
            }
        })

        .state('admin-home.answers', {
            url: '/subject/:currentSubjectId/test/:currentTestId/questions/:questionsId/answers',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/test/answers/answers.html',
                    controller: 'AnswersController as answers'
                }
            },
            data: {
                displayName: 'Відповіді'
            }
        })

        .state('admin-home.testDetails', {
            url: '/subject/:currentSubjectId/test/:currentTestId/details',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/test/test-details/test-details.html',
                    controller: 'TestDetailsController as testDetails'
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
            },
            data: {
                displayName: 'Спеціальності'
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
            data: {
                displayName: 'Факультет'
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
            data: {
                displayName: 'Адміни'
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
            data: {
                displayName: 'Студенти'
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
            data: {
                displayName: 'Студенти'
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
                    displayName: 'Тести'
                }
            });
}
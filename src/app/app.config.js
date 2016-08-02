angular.module('app')
    .config(function($stateProvider, $urlRouterProvider) {
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

        .state('admin-home.subjectNew', {
            url: '/newSubject',
            views: {
                'content': {
                    templateUrl: 'app/admin/subject/add-subject.html',
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
        })
        // .state('StatisticSystem', {
        //     url: '/StatisticSystem',
        //     templateUrl: 'src/app/admin/StatisticSystem.html'
        // })
        //
        // .state('GroupsAndStudents', {
        //     url: '/GroupsAndStudents',
        //     templateUrl: 'src/app/admin/group/GroupsAndStudents.html'
        // })
        //
        // .state('Subjects', {
        //     url: '/Subjects',
        //     templateUrl: 'admin/subject/Subjects.html'
        // })
        //
        // .state('StudentsInGroup', {
        //     url: '/StudentsInGroup',
        //     templateUrl: 'src/app/admin/group/StudentsInGroup.html'
        // })
        // .state('TimeTableTesting', {
        //     url: '/TimeTableTesting',
        //     templateUrl: 'admin/subject/TimeTableTesting.html'
        // })
        // .state('AddNewTimeTable', {
        //     url: '/AddNewTimeTable',
        //     templateUrl: 'views/admin/templates/AddNewTimeTable.html'
        // })
        // .state('TestsOfSubject', {
        //     url: '/TestsOfSubject',
        //     templateUrl: 'admin/subject/TestsOfSubject.html'
        // })
        // .state('RegistrNewTest', {
        //     url: '/RegistrNewTest',
        //     templateUrl: 'admin/subject/RegistrNewTest.html'
        // })
        // .state('MoreOptionsForTest', {
        //     url: '/MoreOptionsForTest',
        //     templateUrl: 'admin/subject/MoreOptionsForTest.html'
        // })
        // .state('RegistrationTestTask', {
        //     url: '/RegistrationTestTask',
        //     templateUrl: 'admin/subject/RegistrationTestTask.html'
        // })
        // .state('GroupRoots', {
        //     url: '/GroupRoots',
        //     templateUrl: 'src/app/admin/user/edit-admin.html'
        // })
        //  .state('RegisterNewAnministr', {
        //     url: '/RegisterNewAnministr',
        //     templateUrl: 'src/app/admin/admin-info/RegisterNewAnministr.html'
        // })
    ;

    $urlRouterProvider.otherwise('/');

});
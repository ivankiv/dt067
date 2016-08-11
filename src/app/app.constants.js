(function(){
    'use strict';

    angular.module('app')

        .constant('appConstants', {
            currentID: '',
            logInURL: 'http://dtapi.local/login/index',
            logOutURL: 'http://dtapi.local/login/logout',
            IsLoggedURL: 'http://dtapi.local/login/isLogged',

            getSubjects: 'http://dtapi.local/subject/getRecords',
            getOneSubject: 'http://dtapi.local/subject/getRecords/', // + id of subject
            getRangeOfSubjects: 'http://dtapi.local/subject/getRecordsRange',
            countSubjects: 'http://dtapi.local/subject/countRecords',
            addSubject: 'http://dtapi.local/subject/insertData',
            editSubject: 'http://dtapi.local/subject/update/',
            delSubject: 'http://dtapi.local/subject/del/',

            getScheduleForGroup: 'http://dtapi.local/timeTable/getTimeTablesForGroup/',
            getScheduleForSubject: 'http://dtapi.local/timeTable/getTimeTablesForSubject/',

            getGroups: 'http://dtapi.local/group/getRecords',

            getTests: 'http://dtapi.local/test/getRecords',
            getTestsById: 'http://dtapi.local/test/getTestsBySubject/',
            countTests: 'http://dtapi.local/test/countRecords',
            addTest: 'http://dtapi.local/test/insertData',
            editTest: 'http://dtapi.local/test/update/',
            delTest: 'http://dtapi.local/test/del/',

            getSpecialities: 'http://dtapi.local/speciality/getRecords',
            getRangeOfSpecialities: 'http://dtapi.local/speciality/getRecordsRange',
            countSpecialities: 'http://dtapi.local/speciality/countRecords',
            addSpeciality: 'http://dtapi.local/speciality/insertData',
            editSpeciality: 'http://dtapi.local/speciality/update/',
            delSpeciality: 'http://dtapi.local/speciality/del/',

            getFaculties: 'http://dtapi.local/faculty/getRecords',
            getRangeOfFaculties: 'http://dtapi.local/faculty/getRecordsRange',
            countFaculties: 'http://dtapi.local/faculty/countRecords',
            addFaculty: 'http://dtapi.local/faculty/insertData',
            editFaculty: 'http://dtapi.local/faculty/update/',
            delFaculty: 'http://dtapi.local/faculty/del/',

            getAdmins: 'http://dtapi.local/AdminUser/getRecords',
            editAdmins: '/AdminUser/update/',
            delAdmins: '/AdminUser/del/',
            addAdmins:'/AdminUser/insertData'

        })

    ;
}());

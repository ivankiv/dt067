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
            editSubject: 'http://dtapi.local/subject/update/', // + id of subject
            delSubject: 'http://dtapi.local/subject/del/', // + id of subject

            getScheduleForGroup: 'http://dtapi.local/timeTable/getTimeTablesForGroup/', // + id of group
            getScheduleForSubject: 'http://dtapi.local/timeTable/getTimeTablesForSubject/', // + id of subject
            deleteSchedule: 'http://dtapi.local/timeTable/del/', // + id of timeTable
            addSchedule: 'http://dtapi.local/timeTable/insertData',
            editSchedule: 'http://dtapi.local/timeTable/update/', // + id of timeTable

            getTests: 'http://dtapi.local/test/getRecords',
            getTestsById: 'http://dtapi.local/test/getTestsBySubject/',
            countTests: 'http://dtapi.local/test/countRecords',
            addTest: 'http://dtapi.local/test/insertData',
            editTest: 'http://dtapi.local/test/update/',
            delTest: 'http://dtapi.local/test/del/',

            getTestDetailsByTest: 'http://dtapi.local/testDetail/getTestDetailsByTest/', // + id of test
            addTestDetails: 'http://dtapi.local/testDetail/insertData',
            editTestDetails: 'http://dtapi.local/testDetail/update/', // + id of testDetails
            deleteTestDetails: 'http://dtapi.local/testDetail/del/', // + id of testDetails

            getQuestionsRangeByTest: 'http://dtapi.local/question/getRecordsRangeByTest/', // + id of test
            countQuestionsByTest: 'http://dtapi.local/question/countRecordsByTest/', // + id of test

            getAnswersByQuestionID: 'http://dtapi.local/answer/getAnswersByQuestion/',  // get answer id

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

            getGroups: 'http://dtapi.local/group/getRecords',
            getRangeOfGroups: 'http://dtapi.local/group/getRecordsRange',
            getOneGroup: 'http://dtapi.local/group/getRecords/',
            countGroups: 'http://dtapi.local/group/countRecords',
            addGroup: 'http://dtapi.local/group/insertData',
            editGroup: 'http://dtapi.local/group/update/',
            delGroup: 'http://dtapi.local/group/del/',

            getAdmins: 'http://dtapi.local/AdminUser/getRecords',
            editAdmins: '/AdminUser/update/',
            delAdmins: '/AdminUser/del/',
            addAdmins:'/AdminUser/insertData',

            getStudents: 'http://dtapi.local/student/getRecords',
            countStudents: 'http://dtapi.local/student/countRecords',
            editStudent: 'http://dtapi.local/student/update/',
            delStudent: 'http://dtapi.local/student/del/',
            addStudents:'http://dtapi.local/student/insertData',
            getStudentsByGroupId:'http://dtapi.local/student/getStudentsByGroup/'
        });
}());

(function(){
    'use strict';
        var baseUrl = 'http://dtapi.local/';
    angular.module('app')

        .constant('appConstants', {
            logInURL: baseUrl + 'login/index',
            logOutURL: baseUrl + 'login/logout',
            isLoggedURL: baseUrl + 'login/isLogged',

            getSubjects: baseUrl + 'subject/getRecords',
            getOneSubject: baseUrl + 'subject/getRecords/', // + id of subject
            getRangeOfSubjects: baseUrl + 'subject/getRecordsRange',
            countSubjects: baseUrl + 'subject/countRecords',
            addSubject: baseUrl + 'subject/insertData',
            editSubject: baseUrl + 'subject/update/', // + id of subject
            delSubject: baseUrl + 'subject/del/', // + id of subject

            getScheduleForGroup: baseUrl + 'timeTable/getTimeTablesForGroup/', // + id of group
            getScheduleForSubject: baseUrl + 'timeTable/getTimeTablesForSubject/', // + id of subject
            deleteSchedule: baseUrl + 'timeTable/del/', // + id of timeTable
            addSchedule: baseUrl + 'timeTable/insertData',
            editSchedule: baseUrl + 'timeTable/update/', // + id of timeTable

            getTests: baseUrl + 'test/getRecords',
            getTestBySubjectId: baseUrl + 'test/getTestsBySubject/',
            countTests: baseUrl + 'test/countRecords',
            addTest: baseUrl + 'test/insertData',
            editTest: baseUrl +  'test/update/',
            delTest: baseUrl + 'test/del/',

            getTestDetailsByTest: baseUrl + 'testDetail/getTestDetailsByTest/', // + id of test
            addTestDetails: baseUrl + 'testDetail/insertData',
            editTestDetails: baseUrl + 'testDetail/update/', // + id of testDetails
            deleteTestDetails: baseUrl + 'testDetail/del/', // + id of testDetails

            getQuestionById:baseUrl +  'question/getRecords/', // + id of question,
            getQuestionsRangeByTest: baseUrl +  'question/getRecordsRangeByTest/', // + id of test
            countQuestionsByTest: baseUrl + 'question/countRecordsByTest/', // + id of test
            delQuestions: baseUrl + 'question/del/', // + id of question
            addQuestion: baseUrl + 'question/insertData',
            editQuestion: baseUrl + 'question/update/',
            getQuestionsByLevelRand: baseUrl + 'question/getQuestionsByLevelRand/', // + id

            getAnswersByQuestionID: baseUrl + '/answer/getAnswersByQuestion/',  // get question id
            deleteAnswers: baseUrl + 'answer/del/', // + id of answer
            getQuestionByQuestionID: baseUrl + 'question/getRecords/', // + question id
            addAnswer: baseUrl + 'answer/insertData',
            editAnswer: baseUrl + 'answer/update/',

            getSpecialities: baseUrl + 'speciality/getRecords',
            getRangeOfSpecialities: baseUrl + 'speciality/getRecordsRange',
            countSpecialities: baseUrl + 'speciality/countRecords',
            addSpeciality: baseUrl +  'speciality/insertData',
            editSpeciality: baseUrl + 'speciality/update/',
            delSpeciality: baseUrl + 'speciality/del/',

            getFaculties: baseUrl + 'faculty/getRecords',
            getRangeOfFaculties: baseUrl + 'faculty/getRecordsRange',
            countFaculties: baseUrl + 'faculty/countRecords',
            addFaculty: baseUrl + 'faculty/insertData',
            editFaculty: baseUrl + 'faculty/update/',
            delFaculty: baseUrl + 'faculty/del/',

            getGroups: baseUrl + 'group/getRecords',
            getRangeOfGroups: baseUrl + 'group/getRecordsRange',
            getOneGroup: baseUrl + 'group/getRecords/',                      // + id of group
            countGroups: baseUrl + 'group/countRecords',
            addGroup: baseUrl + 'group/insertData',
            editGroup: baseUrl + 'group/update/',                            // + id of group
            delGroup: baseUrl + 'group/del/',                                // + id of group
            getGroupsBySpeciality: baseUrl + 'group/getGroupsBySpeciality/', // + id of speciality
            getGroupsByFaculty: baseUrl + 'group/getGroupsByFaculty/',       // + id of faculty

            getAdmins: baseUrl + 'AdminUser/getRecords',
            editAdmins: '/AdminUser/update/',
            delAdmins: '/AdminUser/del/',
            addAdmins:'/AdminUser/insertData',

            getStudents: baseUrl + 'student/getRecords',
            countStudents: baseUrl + 'student/countRecords',
            editStudent: baseUrl + 'student/update/',
            delStudent: baseUrl + 'student/del/',
            addStudents: baseUrl + 'student/insertData',
            getStudentsByGroupId:baseUrl + 'student/getStudentsByGroup/',

            saveTestPlayerData: baseUrl + 'TestPlayer/saveData/',
            getTestPlayerData: baseUrl + 'TestPlayer/getData/',
            resetSessionData: baseUrl + 'TestPlayer/resetSessionData/',
            getServerTime: baseUrl + 'TestPlayer/getTimeStamp',
            getEndTime: baseUrl + 'TestPlayer/getEndTime/',
            saveEndTime: baseUrl + 'TestPlayer/saveEndTime/',
            saveResult: baseUrl + 'result/insertData/',

            getAnswersListByQuestionId: baseUrl + 'SAnswer/getAnswersByQuestion/',

            checkAnswers: baseUrl + 'SAnswer/checkAnswers/',
            addTestResult: baseUrl + 'Result/insertData/',
            delTestResult: baseUrl + 'Result/del/', // + id of session
            getTestResultByStudentId: baseUrl + 'Result/getRecordsbyStudent/', // + id of student
            countTestPassesByStudent: baseUrl + 'result/countTestPassesByStudent/', // + id`s of student and test
            startTestInfoInLog: baseUrl + 'log/startTest/', // + <user_id>/<test_id>

            maxNumberOfStudents:(localStorage.NumberOfStudents)?JSON.parse(localStorage.NumberOfStudents):200
        })
        .constant("defineUser", {
                admin: "admin",
                user: "student"
        });
}());

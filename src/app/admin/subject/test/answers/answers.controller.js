(function(){
    'use strict';

    angular.module('app')
        .controller('AnswersController', answersController);
    answersController.$inject = ['answersService', '$stateParams', '$uibModal'];

    function answersController (answersService, $stateParams, $uibModal) {
        var self = this;

        //variables
        self.currentSubjectId = $stateParams.currentSubjectId;
        self.currentTestId = $stateParams.currentTestId;
        self.list = {};
        self.showMessageNoEntity = false;
        self.question_id = $stateParams.questionId;
        self.true_answers = ['Не вірно', 'Вірно'];
        self.isAnswerTrue = false;
        self.isAnswers = true;


        //methods
        self.getAnswersByQuestionID = getAnswersByQuestionID;
        self.deleteAnswers = deleteAnswers;
        self.showAddAnswerForm = showAddAnswerForm;
        self.ShowLargeAnswerPhotoForQuestion = ShowLargeAnswerPhotoForQuestion;
        self.showEditAnswerForm = showEditAnswerForm;

        activate();

        function activate() {
            getAnswersByQuestionID();
            getQuestionByQuestionID();
        }


        function getAnswersByQuestionID() {
            answersService.getAnswersByQuestion(self.question_id)
                .then(getAnswersByQuestionComplete)
        }


        function getAnswersByQuestionComplete(response) {
            if(response.data.response === 'no records') {
                self.showMessageNoEntity = true;
            } else {
                if(self.CurrentQuestionType === '1') {
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].true_answer == '1') {
                            self.isAnswerTrue = true;
                            break;
                        } else if(response.data[i].true_answer == '0'){
                            self.isAnswerTrue = false;
                        }
                    }
                }
                self.list = response.data;
            }
        }

        function getQuestionByQuestionID() {
            answersService.getQuestionByQuestionID(self.question_id)
                .then(getQuestionByQuestionIDComplete)
                .then(getAnswersByQuestionID)
        }

        function getQuestionByQuestionIDComplete(response) {
            self.CurrentQuestionType = response.data[0].type;
            if(response.data.response === 'no records') {
                self.showMessageNoEntity = true;
            } else {
                self.question_text = response.data[0].question_text;
                if (response.data[0].type === '1'){
                    self.questiontype = 'Простий вибір';
                }else{
                    self.questiontype = 'Мульти вибір';
                }
            }
            return self.CurrentQuestionType;
        }

        function deleteAnswers(answer_id) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/modal/templates/confirm-delete-dialog.html',
                controller: 'modalController as modal',
                backdrop: true
            });
            modalInstance.result.then(deleteAnswers);

            function deleteAnswers() {
                answersService.deleteAnswers(answer_id).then(function(response) {
                    if(response.data.response === 'ok') {
                        activate();
                    }
                });
            }
        }

        function showAddAnswerForm() {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/subject/test/answers/add-answer.html',
                controller: 'AnswersModalController as answers',
                backdrop: false,
                resolve: {
                    currentAnswer: {},
                    answerSrc: {},
                    isAnswerTrue: {isAnswerTrue: self.isAnswerTrue}
                }
            });
            modalInstance.result.then(function() {
                $uibModal.open({
                    templateUrl: 'app/modal/templates/confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
                self.showMessageNoEntity = false;
                activate();
            })

        }
        function ShowLargeAnswerPhotoForQuestion(answer) {
            if(answer.attachment !== '') {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/test/answers/show-large-answer-photo-for-question.html',
                    controller: 'AnswersModalController as answers',
                    backdrop: true,
                    resolve: {
                        currentAnswer: {},
                        answerSrc: answer,
                        isAnswerTrue: {isAnswerTrue: self.isAnswerTrue}
                    }
                });
            }
        }

        function showEditAnswerForm(currentAnswer) {
            var modalInstance = $uibModal.open({
                templateUrl: 'app/admin/subject/test/answers/edit-answer.html',
                controller: 'AnswersModalController as answers',
                backdrop: false,
                resolve: {
                    currentAnswer: currentAnswer,
                    answerSrc: {},
                    isAnswerTrue: {isAnswerTrue: self.isAnswerTrue}
                }
            });
            modalInstance.result.then(function() {
                $uibModal.open({
                    templateUrl: 'app/modal/templates/confirm-dialog.html',
                    controller: 'modalController as modal',
                    backdrop: true
                });
                self.showMessageNoEntity = false;
                activate();
            })
        }

    }
}());
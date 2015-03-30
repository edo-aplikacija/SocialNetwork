'use strict';

// <auth-basic-info> 
angular.module('mainApp').directive('authBasicInfo',
    ['AUTH_PROFILE_TEMPLATES', 'USER_FORM_VALIDATION', 'authBasicInfoService',
function (AUTH_PROFILE_TEMPLATES, USER_FORM_VALIDATION, authBasicInfoService) {
        return {
            restrict: 'E',
            scope: {
                basicInfo: '=data',
            },
            transclude: false,
            replace: true,
            templateUrl: AUTH_PROFILE_TEMPLATES + 'authBasicInfo.html',
            controller: function ($scope) {

                // VISIBILITY
                $scope.basicVisibilityError = undefined;
                $scope.editBasicVisibility = false;
                $scope.changedBasicVisibility = undefined;
                $scope.allowedBasicVisibility = USER_FORM_VALIDATION.VISIBILITY;
                $scope.enableEditBasicVisibility = function (visibleTo) {
                    $scope.changedBasicVisibility = visibleTo;
                    $scope.editBasicVisibility = true;
                }
                $scope.updateBasicVisibility = function (data) {
                    var form = {
                        'fieldToUpdate': 'visibleTo',
                        'valueToUpdate': data
                    };
                    authBasicInfoService.update(form).$promise.then(
                        function (response) {
                            // success
                            $scope.basicInfo.visibleTo = response.data;
                            $scope.editBasicVisibility = false;
                            $scope.basicVisibilityError = undefined;
                        },
                        function (response) {
                            // error
                            $scope.basicVisibilityError = response.message;
                        }
                    );
                }
                $scope.cancelBasicVisibility = function () {
                    $scope.editBasicVisibility = false;
                }
                $scope.closeBasicVisibilityError = function () {
                    $scope.basicVisibilityError = undefined;
                }
                
                // GENDER
                $scope.genderError = undefined;
                $scope.editGender = false;
                $scope.changedGender = undefined;
                $scope.allowedGenders = USER_FORM_VALIDATION.GENDER;
                $scope.enableEditGender = function (gender) {
                    $scope.changedGender = gender;
                    $scope.editGender = true;
                }
                $scope.updateGender = function (data) {
                    var form = {
                        'fieldToUpdate': 'gender',
                        'valueToUpdate': data
                    };
                    authBasicInfoService.update(form).$promise.then(
                        function (response) {
                            // success
                            $scope.basicInfo.gender = response.data;
                            $scope.editGender = false;
                            $scope.genderError = undefined;
                        },
                function (response) {
                            // error
                            $scope.genderError = response.message;
                        }
                    );
                }
                $scope.cancelGender = function () {
                    $scope.editGender = false;
                }
                $scope.closeGenderError = function () {
                    $scope.genderError = undefined;
                }
                
                // BIRTHDAY
                // init datepicker
                var minDate = new Date();
                minDate.setFullYear(minDate.getFullYear() - USER_FORM_VALIDATION.BIRTHDAY_MIN_YEAR);
                $scope.minBirthday = minDate;
                var maxDate = new Date();
                maxDate.setFullYear(maxDate.getFullYear() - USER_FORM_VALIDATION.BIRTHDAY_MAX_YEAR);
                $scope.maxBirthday = maxDate;
                var initDate = new Date();
                
                $scope.birthdayError = undefined;
                $scope.editBirthday = false;
                $scope.changedBirthday = initDate;
                $scope.enableEditBirthday = function (birthday) {
                    $scope.changedBirthday = birthday;
                    $scope.editBirthday = true;
                }
                $scope.updateBirthday = function (data) {
                    var form = {
                        'fieldToUpdate': 'birthday',
                        'valueToUpdate': data
                    };
                    authBasicInfoService.update(form).$promise.then(
                        function (response) {
                            // success
                            $scope.basicInfo.birthday = response.data;
                            $scope.editBirthday = false;
                            $scope.birthdayError = undefined;
                        },
                function (response) {
                            // error
                            $scope.birthdayError = response.message;
                        }
                    );
                }
                $scope.cancelBirthday = function () {
                    $scope.editBirthday = false;
                }
                $scope.closeBirthdayError = function () {
                    $scope.birthdayError = undefined;
                } 
            }
        };

    }]);
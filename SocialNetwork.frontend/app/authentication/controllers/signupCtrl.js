'use strict';

angular.module('mainApp').controller('signupCtrl',
['$scope', '$state','USER_FORM_VALIDATION', 'authService', 'authDataService',
	function ($scope, $state, USER_FORM_VALIDATION, authService, authDataService) {
        
        if (authDataService.isAuthenticated() === true) {
            $state.go('authProfile');
        } else {
            // init datepicker
            var minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - USER_FORM_VALIDATION.BIRTHDAY_MIN_YEAR);
            $scope.minBirthday = minDate;
            var maxDate = new Date();
            maxDate.setFullYear(maxDate.getFullYear() - USER_FORM_VALIDATION.BIRTHDAY_MAX_YEAR);          
            $scope.maxBirthday = maxDate;
            var initBirthday = new Date();
            initBirthday.setFullYear(initBirthday.getFullYear() - 18);
                                                        
            // init fields
            $scope.credentials = {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmPassword: '',
                gender: 'Male',
                birthday: initBirthday
            };           
            $scope.allowedGenders = USER_FORM_VALIDATION.GENDER;
            
            // main function                   
            $scope.signup = function (credentials) {
                console.log('credentials', credentials)
                if (credentials.firstname && credentials.lastname && credentials.email && credentials.password && credentials.confirmPassword && credentials.gender) {
                    // user has fill out all fields
                    if (passwordValidation(credentials.password, credentials.confirmPassword)) {
                        $scope.signupError = undefined;
                        // try to register user
                        authService.signup(credentials).then(
                            function (credentials) {
                                // success
                                $state.go('authProfile');
                            },
                            function (error) {
                                // errorr
                                console.log('Sign API error', error);
                                $scope.signupError = error;
                            }
                        );
                    }
                } else {
                    $scope.signupError = 'Oops! Please fill out all fields above.';
                }
            };
            
            // helper functions
            $scope.closeSignupError = function () {
                $scope.signupError = undefined;
            };

            var passwordValidation = function (password, confirmPassword) {
                if (password.length < USER_FORM_VALIDATION.PASSWORD_MIN_LENGTH) {
                    $scope.signupError = 'Oops! Minimal password length is ' + USER_FORM_VALIDATION.PASSWORD_MIN_LENGTH + ' characters.';
                    return false;
                } else if (password.length > USER_FORM_VALIDATION.PASSWORD_MAX_LENGTH) {
                    $scope.signupError = 'Oops! Maximal password length is ' + USER_FORM_VALIDATION.PASSWORD_MAX_LENGTH + ' characters.';
                    return false;
                } else if (password !== confirmPassword) {
                    $scope.signupError = "Oops! Confirm password doesn't match.";
                    return false;
                } else {
                    return true;
                }
            };
        }
    }]);
'use strict';

angular.module('mainApp').controller('loginCtrl',
		['$scope', '$state', 'authService', 'authDataService',
		 function ($scope, $state, authService, authDataService) {
        
        if (authDataService.isAuthenticated() === true) {
            // maybe change to home
            $state.go('authProfile');
        } else {
            // Login fields
            $scope.credentials = {
                email: '',
                password: ''
            };
            // Login 
            $scope.login = function (credentials) {
                if (credentials.email && credentials.password) {
                    // user has fill out form
                    authService.login(credentials).then(
                        function () {
                            // success
                            //authDataService.setAuthenticated();
                            $scope.credentials.email = '';
                            $scope.credentials.password = '';
                            $state.go('authProfile');
                        },
                        function (error) {
                            // error                           
                            // display user error message
                            $scope.loginError = error;
                        }
                    );
                } else {
                    // user didn't fill out login form
                    $scope.loginError = 'Oops! Please fill out fields below.';
                }
            };
            
            $scope.closeLoginError = function () {
                $scope.loginError = undefined;
            };
        }
    }]);
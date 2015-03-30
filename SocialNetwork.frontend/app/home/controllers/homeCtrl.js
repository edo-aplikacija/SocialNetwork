'use strict';

angular.module('mainApp').controller('homeCtrl',
['$scope', '$state', 'AUTH_TEMPLATES', 'authDataService',
	function ($scope, $state, AUTH_TEMPLATES, authDataService) {

        if (authDataService.isAuthenticated() === true) {
            $state.go('authProfile');
        } else {
            $scope.signUpTemplate = AUTH_TEMPLATES + 'signup.html';


        }        
    }]);
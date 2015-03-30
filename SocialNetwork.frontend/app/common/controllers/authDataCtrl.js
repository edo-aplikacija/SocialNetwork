'use strict';
angular.module('mainApp').controller('authDataCtrl',
		['$scope', 'AUTH_TEMPLATES', 'authDataService',
		 function ($scope, AUTH_TEMPLATES, authDataService) {
        
        // Tracking if user data has changed 
        $scope.$watch(function () { return authDataService.getUser() }, function (obj) {
            $scope.currentUser = obj;
            console.log('currentUser', $scope.currentUser)

        }, true);
        
        // Tracking if user 'authenticated' has changed value
        $scope.$watch(function () {
            // this will return 'true' or 'false'
            return authDataService.isAuthenticated()
        }, function (obj) {
            // binding result
            $scope.isAuthenticated = obj;

        }, true);

        $scope.loginTemplate = AUTH_TEMPLATES + 'login.html';

    }]);
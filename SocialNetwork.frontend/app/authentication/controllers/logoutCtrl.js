'use strict';

angular.module('mainApp').controller('logoutCtrl',
		['$scope', '$state', 'authService', 'authDataService',
		 function ($scope, $state, authService, authDataService) {
		     // Logout 
		     $scope.logout = function () {
		         authService.logout().then(
						 function () {
						     // success				     
						     $state.go('home');
						 },
						 function () {
						     // error 
						     $scope.error = error;
						 }
				 );
		     };
		 }]);
'use strict';

angular.module('mainApp').controller('authProfileCtrl',
		['$scope', '$state', '$rootScope', 'authProfileService', 'authDataService',
		 function ($scope, $state, $rootScope, authProfileService, authDataService) {
       
        var loadUserData = function () {
            authProfileService.get().$promise.then(
                function (response) {
                    // success
                    console.log('profile', response);
                    $scope.authUserData = response.data;
                    $scope.authUserFullname = $scope.authUserData.nameInfo.firstname + ' ' + $scope.authUserData.nameInfo.lastname;
                    $state.go('authProfile.timeline');
                }
            );
        }
        loadUserData();
                            		     
    }]);
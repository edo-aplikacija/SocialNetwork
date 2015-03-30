'use strict';

angular.module('mainApp').controller('authAboutMeCtrl',
		['$scope', '$state', '$rootScope', 'authAboutMeService',
		 function ($scope, $state, $rootScope, authAboutMeService) {
        
        var loadAboutMeInfo = function () {
            authAboutMeService.get().$promise.then(
                function (response) {
                    // success
                    $scope.authAboutMeInfo = response.data;
                },
                function (response) {
                    // error
                }
            );
        };
        loadAboutMeInfo();
                            		     
    }]);
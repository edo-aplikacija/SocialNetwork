'use strict';

// <auth-location-info> 
angular.module('mainApp').directive('authLocationInfo',
    ['AUTH_PROFILE_TEMPLATES', 'USER_FORM_VALIDATION', 'authBasicInfoService',
function (AUTH_PROFILE_TEMPLATES, USER_FORM_VALIDATION, authBasicInfoService) {
        return {
            restrict: 'E',
            scope: {
                locationInfo: '=data',
            },
            transclude: false,
            replace: true,
            templateUrl: AUTH_PROFILE_TEMPLATES + 'authLocationInfo.html',
            controller: function ($scope) {
                
                // VISIBLE TO
                $scope.locationVisibilityError = undefined;
                $scope.editLocationVisibility = false;
                $scope.changedLocationVisibility = undefined;
                $scope.allowedLocationVisibility = USER_FORM_VALIDATION.VISIBILITY;
                $scope.enableEditLocationVisibility = function (visibleTo) {
                    $scope.changedLocationVisibility = visibleTo;
                    $scope.editLocationVisibility = true;
                }
                $scope.updateLocationVisibility = function (data) {
                    var form = {
                        'fieldToUpdate': 'visibleTo',
                        'valueToUpdate': data
                    };
                    authBasicInfoService.update(form).$promise.then(
                        function (response) {
                            // success
                            $scope.locationInfo.visibleTo = response.data;
                            $scope.editLocationVisibility = false;
                            $scope.locationVisibilityError = undefined;
                        },
                        function (response) {
                            // error
                            $scope.locationVisibilityError = response.message;
                        }
                    );
                }
                $scope.cancelLocationVisibility = function () {
                    $scope.editLocationVisibility = false;
                }
                $scope.closeLocationVisibilityError = function () {
                    $scope.locationVisibilityError = undefined;
                }
                
                // HOMETOWN
                $scope.hometownError = undefined;
                $scope.editHometown = false;
                $scope.changedHometown = undefined;
                $scope.allowedHometowns = USER_FORM_VALIDATION.GENDER;
                $scope.enableEditHometown = function (hometown) {
                    $scope.changedHometown = hometown;
                    $scope.editHometown = true;
                }
                $scope.updateHometown = function (data) {
                    var form = {
                        'fieldToUpdate': 'hometown',
                        'valueToUpdate': data
                    };
                    authBasicInfoService.update(form).$promise.then(
                        function (response) {
                            // success
                            $scope.basicInfo.hometown = response.data;
                            $scope.editHometown = false;
                            $scope.hometownError = undefined;
                        },
                function (response) {
                            // error
                            $scope.hometownError = response.message;
                        }
                    );
                }
                $scope.cancelHometown = function () {
                    $scope.editHometown = false;
                }
                $scope.closeHometownError = function () {
                    $scope.hometownError = undefined;
                }
                
                
                
                $scope.emptyField = function (data) {
                    console.log('emptyField', data)
                    if (data === undefined) {
                        return true;
                    } else {
                        return false;
                    }
                }               
            }
        };

    }]);
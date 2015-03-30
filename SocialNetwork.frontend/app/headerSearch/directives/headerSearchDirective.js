'use strict';

// <header-search> 
angular.module('mainApp').directive('headerSearch',
    ['HEADER_SEARCH_TEMPLATES', 'headerSearchService', 'authDataService',
        function (HEADER_SEARCH_TEMPLATES, headerSearchService, authDataService) {
    return {
        // only matches element name, or 'A','C' for attribute, class or combination 'EAC', 'EA'
        restrict: 'E',

        // grabbing data from template
        scope: {
            currentUser: '=data',
        },

        // set to true if you what to inject some html in directive and div in header-search.html
        transclude: false,

        // if we want to replace header-search element with div, also wrap all in div to make work
        replace: true,

        templateUrl: HEADER_SEARCH_TEMPLATES + 'header-search.html',

        controller: function ($scope, $state, $timeout, headerSearchService, authDataService) {
            //console.log('headerSearchDirective', $scope.currentUser);

            // init data
            $scope.newHeaderSeachText = '';
            $scope.headerSearchResult = undefined;
            $scope.headerSearchNoResult = undefined;

            $scope.updateHeaderSeachText = function (data) {

                $scope.newHeaderSeachText = data;
            }

            var timeoutPromise;
            var delayInMs = 1000;
            $scope.$watch('newHeaderSeachText', function (newHeaderSeachText) {
                $timeout.cancel(timeoutPromise);
                if (newHeaderSeachText.length > 1) {
                    timeoutPromise = $timeout(function () {
                        loadHeaderSearhData(newHeaderSeachText);
                    }, delayInMs);
                } else {
                    $scope.headerSearchResult = undefined;
                    $scope.headerSearchNoResult = undefined;
                }
            }, true);

            var loadHeaderSearhData = function (searchText) {
                headerSearchService.query({ searchText: searchText }).$promise.then(
                    function (response) {
                        // success
                        if (response.length < 1) {
                            $scope.headerSearchNoResult = "Nema rezultata!";
                        } else {
                            $scope.headerSearchResult = response;
                            $scope.headerSearchNoResult = undefined;
                        }
                    },
                    function () {
                        // error
                    }
                    );
            }

            $scope.goToProfilePreview = function (user) {
                var isAuth = authDataService.isAuthenticated();
                var slug = user.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                if (isAuth) {
                    // state go to profile preview
                    $state.go('previewProfile', { userId: user.profileID, name: slug });
                } else {
                    // state go to login
                    $state.go('login');
                }
                $scope.headerSearchResult = undefined;
                $scope.headerSearchNoResult = undefined;
                $scope.headerSearchText = undefined;
            }

        }
    };

}]);
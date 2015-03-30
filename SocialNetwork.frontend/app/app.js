'use strict';
/* global app: true */

var mainApp = angular.module('mainApp', [
    'ngResource',
    'ui.router',
    'LocalStorageModule',
    'ui.bootstrap',
    'angularUtils.directives.dirPagination',
    'igTruncate',
    'angularFileUpload',
]);

// CONSTANTS
// In production change to api location http://www.example.com/
//  common
mainApp.constant('API_SERVER', 'http://localhost:8080/api/');
mainApp.constant('COMMON_TEMPLATES', 'app/common/views/');
// home
mainApp.constant('HOME_TEMPLATES', 'app/home/views/');
// headerSearch
mainApp.constant('HEADER_SEARCH_TEMPLATES', 'app/headerSearch/views/');
// authentication
mainApp.constant('AUTH_TEMPLATES', 'app/authentication/views/');
// authProfile
mainApp.constant('AUTH_PROFILE_TEMPLATES', 'app/authProfile/views/');

mainApp.constant('USER_FORM_VALIDATION', {
    'PASSWORD_MIN_LENGTH': 6,
    'PASSWORD_MAX_LENGTH': 30,
    'BIRTHDAY_MAX_YEAR': 0,
    'BIRTHDAY_MIN_YEAR': 100,
    'GENDER': [
        'Male', 'Female'
    ],
    'VISIBILITY': [
        'All',
        'Friends',
        'Only me'
    ]
});


mainApp.config(['$httpProvider', '$urlRouterProvider', '$stateProvider', 'HOME_TEMPLATES', 'AUTH_TEMPLATES', 'AUTH_PROFILE_TEMPLATES',
                function ($httpProvider, $urlRouterProvider, $stateProvider, HOME_TEMPLATES, AUTH_TEMPLATES, AUTH_PROFILE_TEMPLATES) {
        
        $httpProvider.interceptors.push('authInterceptor');
        
        $urlRouterProvider.otherwise('/');
        
        $stateProvider
             // home
             .state('home', {
                controller: 'homeCtrl',
                url: '/',
                templateUrl: HOME_TEMPLATES + 'home.html',
            })
            // authentication
            .state('home.signup', {
                controller: 'signupCtrl',
                templateUrl: AUTH_TEMPLATES + 'signup.html',
            })
            .state('home.login', {
                controller: 'loginCtrl',
                templateUrl: AUTH_TEMPLATES + 'login.html',
            })
            // authProfile
            .state('authProfile', {
                controller: 'authProfileCtrl',
                templateUrl: AUTH_PROFILE_TEMPLATES + 'authProfile.html',
                url: '/profile',
            })
            .state('authProfile.timeline', {
                controller: 'authTimelineCtrl',
                templateUrl: AUTH_PROFILE_TEMPLATES + 'authTimeline.html',
                url: '/timeline',
            })
            .state('authProfile.aboutMe', {
                controller: 'authAboutMeCtrl',
                templateUrl: AUTH_PROFILE_TEMPLATES + 'authAboutMe.html',
                url: '/about-me',
            })
    }]);
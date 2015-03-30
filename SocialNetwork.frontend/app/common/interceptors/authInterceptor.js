'use strict';

angular.module('mainApp').factory('authInterceptor',
		['$q', '$injector', 'authDataService',
		 function ($q, $injector, authDataService) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                var checkToken = authDataService.getToken();
                // Setting up header for request to protected views
                // we must send token that we recived on login
                if (checkToken !== undefined) {
                    config.headers.Authorization = 'JWT ' + checkToken;
                }
                return config;
            },
            response: function (response) {              
                if (response.status === 200 && response.data !== undefined) {
                    var token = response.data.token || '';
                    if (token !== '') {
                        authDataService.setToken(token);
                        authDataService.setAuthenticated();
                    }                    
                }
                return response;
            },
            // if user isn't authorized send him to login view
            responseError: function (response) {
                if (response.status === 401) {                   
                    // delete token
                    authDataService.destroyToken();
                    // delete user data
                    authDataService.destroyUser();
                    // set authenticated to false
                    authDataService.disableAuthenticated();
                    
                    $injector.get('$state').transitionTo('login');
                    return $q.reject();
                }
                return $q.reject(response);
            }
        };
    }]);
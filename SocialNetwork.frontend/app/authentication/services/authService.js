'use strict';

angular.module('mainApp').factory('authService',
		['$http', '$q', 'authDataService', 'API_SERVER',
		 function ($http, $q, authDataService, API_SERVER) {
        
        // Login 
        this.login = function (credentials) {
            var defered = $q.defer();
            var url = API_SERVER + 'login';
            var dataToSend = 'grant_type=password&email=' + credentials.email + '&password=' + credentials.password;
            
            $http.post(url, dataToSend, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }).then(               
                function (response) {
                    // success
                    console.log('authService login', response);
                    defered.resolve();
                },
				function (response) {
                    // error
                    console.log('authService login error', response);
                    defered.reject(response.data.message);
                }
            );
            return defered.promise;
        };
        
        // Signup 
        this.signup = function (credentials) {
            var defered = $q.defer();
            var url = API_SERVER + 'signup';
            var dataToSend = credentials;
            
            $http.post(url, dataToSend).then(
                function (response) {
                    // success
                    defered.resolve();
                },
				function (response) {
                    // error
                    defered.reject(response.data.message);
                }
            );
            return defered.promise;
        };
        
        // Change password
        this.changePassword = function (credentials) {
            var defered = $q.defer();
            var url = API_SERVER + 'change-password';
            var dataToSend = credentials;
            
            $http.post(url, dataToSend).then(
                function (response) {
                    defered.resolve();
                },
						 function () {
                    defered.reject();
                }
            );
            return defered.promise;
        }
        
        // Loguot
        this.logout = function () {
            var defered = $q.defer();
            // delete token
            authDataService.destroyToken();
            // delete user data
            authDataService.destroyUser();
            // set authenticated to false
            authDataService.disableAuthenticated();
            
            defered.resolve();
            
            return defered.promise;
        };
        
        return this;
    }]);
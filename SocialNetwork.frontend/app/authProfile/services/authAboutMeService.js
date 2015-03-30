'use strict';

angular.module('mainApp').factory('authAboutMeService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {
        return $resource(API_SERVER + 'auth-about-me-info', {}, {});
    }]);
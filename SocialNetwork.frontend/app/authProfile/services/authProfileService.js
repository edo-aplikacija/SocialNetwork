'use strict';

angular.module('mainApp').factory('authProfileService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {
        // ONLY GET
        return $resource(API_SERVER + 'auth-profile', null, {});
    }]);
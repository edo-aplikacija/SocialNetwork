'use strict';

angular.module('mainApp').factory('authBasicInfoService',
		['$resource', 'API_SERVER',
		 function ($resource, API_SERVER) {
        return $resource(API_SERVER + 'auth-basic-info', {}, {
            update: {
                method: 'PUT'
            }
        });
    }]);
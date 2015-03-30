'use strict';

angular.module('mainApp').factory('headerSearchService',
		['$resource', 'API_SERVER',
            // ONLY GET(QUERY)
		 function ($resource, API_SERVER) {
		     return $resource(API_SERVER + 'header-search', { searchText: '@searchText' }, {
		     });
		 }]);
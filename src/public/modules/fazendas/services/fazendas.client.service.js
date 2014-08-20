'use strict';

//Fazendas service used to communicate Fazendas REST endpoints
angular.module('fazendas').factory('Fazendas', ['$resource',
	function($resource) {
		return $resource('fazendas/:fazendaId', { fazendaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
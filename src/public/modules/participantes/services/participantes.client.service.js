'use strict';

//Participantes service used to communicate Participantes REST endpoints
angular.module('participantes').factory('Participantes', ['$resource',
	function($resource) {
		return $resource('participantes/:participanteId', { participanteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
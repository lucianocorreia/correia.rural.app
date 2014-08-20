'use strict';

//Setting up route
angular.module('participantes').config(['$stateProvider',
	function($stateProvider) {
		// Participantes state routing
		$stateProvider.
		state('listParticipantes', {
			url: '/participantes',
			templateUrl: 'modules/participantes/views/list-participantes.client.view.html'
		}).
		state('createParticipante', {
			url: '/participantes/create',
			templateUrl: 'modules/participantes/views/create-participante.client.view.html'
		}).
		state('viewParticipante', {
			url: '/participantes/:participanteId',
			templateUrl: 'modules/participantes/views/view-participante.client.view.html'
		}).
		state('editParticipante', {
			url: '/participantes/:participanteId/edit',
			templateUrl: 'modules/participantes/views/edit-participante.client.view.html'
		});
	}
]);
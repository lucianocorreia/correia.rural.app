'use strict';

//Setting up route
angular.module('fazendas').config(['$stateProvider',
	function($stateProvider) {
		// Fazendas state routing
		$stateProvider.
		state('listFazendas', {
			url: '/fazendas',
			templateUrl: 'modules/fazendas/views/list-fazendas.client.view.html'
		}).
		state('createFazenda', {
			url: '/fazendas/create',
			templateUrl: 'modules/fazendas/views/create-fazenda.client.view.html'
		}).
		state('viewFazenda', {
			url: '/fazendas/:fazendaId',
			templateUrl: 'modules/fazendas/views/view-fazenda.client.view.html'
		}).
		state('editFazenda', {
			url: '/fazendas/:fazendaId/edit',
			templateUrl: 'modules/fazendas/views/edit-fazenda.client.view.html'
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('participantes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Participantes', 'participantes', 'dropdown', '/participantes(/create)?');
		Menus.addSubMenuItem('topbar', 'participantes', 'List Participantes', 'participantes');
		Menus.addSubMenuItem('topbar', 'participantes', 'New Participante', 'participantes/create');
	}
]);
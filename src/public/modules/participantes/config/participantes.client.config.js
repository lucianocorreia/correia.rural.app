'use strict';

// Configuring the Articles module
angular.module('participantes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Participantes', 'participantes', 'dropdown', '/participantes(/create)?');
		Menus.addSubMenuItem('topbar', 'participantes', 'Listar Participantes', 'participantes');
		Menus.addSubMenuItem('topbar', 'participantes', 'Cadastrar Participante', 'participantes/create');
	}
]);
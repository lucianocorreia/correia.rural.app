'use strict';

// Configuring the Articles module
angular.module('fazendas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Fazendas', 'fazendas', 'dropdown', '/fazendas(/create)?');
		Menus.addSubMenuItem('topbar', 'fazendas', 'Listar Fazendas', 'fazendas');
		Menus.addSubMenuItem('topbar', 'fazendas', 'Cadastrar Fazenda', 'fazendas/create');
	}
]);
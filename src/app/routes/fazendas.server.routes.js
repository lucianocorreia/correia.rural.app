'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var fazendas = require('../../app/controllers/fazendas');

	// Fazendas Routes
	app.route('/fazendas')
		.get(fazendas.list)
		.post(users.requiresLogin, fazendas.create);

	app.route('/fazendas/:fazendaId')
		.get(fazendas.read)
		.put(users.requiresLogin, fazendas.hasAuthorization, fazendas.update)
		.delete(users.requiresLogin, fazendas.hasAuthorization, fazendas.delete);

	// Finish by binding the Fazenda middleware
	app.param('fazendaId', fazendas.fazendaByID);
};
'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var participantes = require('../../app/controllers/participantes');

	// Participantes Routes
	app.route('/participantes')
		.get(participantes.list)
		.post(users.requiresLogin, participantes.create);

	app.route('/participantes/:participanteId')
		.get(participantes.read)
		.put(users.requiresLogin, participantes.hasAuthorization, participantes.update)
		.delete(users.requiresLogin, participantes.hasAuthorization, participantes.delete);

	// Finish by binding the Participante middleware
	app.param('participanteId', participantes.participanteByID);
};
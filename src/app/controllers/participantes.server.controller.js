'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Participante = mongoose.model('Participante'),
	_ = require('lodash');

/**
 * Create a Participante
 */
exports.create = function(req, res) {
	var participante = new Participante(req.body);
	participante.user = req.user;

	participante.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(participante);
		}
	});
};

/**
 * Show the current Participante
 */
exports.read = function(req, res) {
	res.jsonp(req.participante);
};

/**
 * Update a Participante
 */
exports.update = function(req, res) {
	var participante = req.participante ;

	participante = _.extend(participante , req.body);

	participante.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(participante);
		}
	});
};

/**
 * Delete an Participante
 */
exports.delete = function(req, res) {
	var participante = req.participante ;

	participante.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(participante);
		}
	});
};

/**
 * List of Participantes
 */
exports.list = function(req, res) { Participante.find().sort('-created').populate('user', 'displayName').exec(function(err, participantes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(participantes);
		}
	});
};

/**
 * Participante middleware
 */
exports.participanteByID = function(req, res, next, id) { Participante.findById(id).populate('user', 'displayName').exec(function(err, participante) {
		if (err) return next(err);
		if (! participante) return next(new Error('Failed to load Participante ' + id));
		req.participante = participante ;
		next();
	});
};

/**
 * Participante authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.participante.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Fazenda = mongoose.model('Fazenda'),
	_ = require('lodash');

/**
 * Create a Fazenda
 */
exports.create = function(req, res) {
	var fazenda = new Fazenda(req.body);
	fazenda.user = req.user;

	fazenda.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fazenda);
		}
	});
};

/**
 * Show the current Fazenda
 */
exports.read = function(req, res) {
	res.jsonp(req.fazenda);
};

/**
 * Update a Fazenda
 */
exports.update = function(req, res) {
	var fazenda = req.fazenda ;

	fazenda = _.extend(fazenda , req.body);

	fazenda.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fazenda);
		}
	});
};

/**
 * Delete an Fazenda
 */
exports.delete = function(req, res) {
	var fazenda = req.fazenda ;

	fazenda.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fazenda);
		}
	});
};

/**
 * List of Fazendas
 */
exports.list = function(req, res) { Fazenda.find().sort('-created').populate('user', 'displayName').exec(function(err, fazendas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fazendas);
		}
	});
};

/**
 * Fazenda middleware
 */
exports.fazendaByID = function(req, res, next, id) { Fazenda.findById(id).populate('user', 'displayName').exec(function(err, fazenda) {
		if (err) return next(err);
		if (! fazenda) return next(new Error('Failed to load Fazenda ' + id));
		req.fazenda = fazenda ;
		next();
	});
};

/**
 * Fazenda authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fazenda.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
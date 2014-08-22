'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Participante Schema
 */
var ParticipanteSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Participante name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    tipo: {
        type: String,
        uppercase: true,
        enum: ['F', 'P']
    }

});

mongoose.model('Participante', ParticipanteSchema);
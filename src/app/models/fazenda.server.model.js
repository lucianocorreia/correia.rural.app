'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Fazenda Schema
 */
var FazendaSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Fazenda name',
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
    endereco: {
        type: String,
        default: '',
        trim: true
    },
    complemento: {
        type: String,
        default: '',
        trim: true
    },
    cidade: {
        type: String,
        default: '',
        trim: true
    },
    uf: {
        type: String,
        default: '',
        trim: true
    }
});

FazendaSchema.method('getEnderecoCompleto', function() {
    var enderecoCompleto = this.endereco;
    if(this.complemento)
        enderecoCompleto += ', ' + this.complemento;
    return enderecoCompleto;
});

mongoose.model('Fazenda', FazendaSchema);
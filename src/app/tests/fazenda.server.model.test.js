'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Fazenda = mongoose.model('Fazenda');

/**
 * Globals
 */
var user, fazenda;

/**
 * Unit tests
 */
describe('Fazenda Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			fazenda = new Fazenda({
				name: 'Fazenda Name',
				user: user,
                endereco: 'Rua teste',
                complemento: "n 123"
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return fazenda.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			fazenda.name = '';

			return fazenda.save(function(err) {
				should.exist(err);
				done();
			});
		});

        it('should return complete address', function(done) {
            var enderecoCompleto = fazenda.getEnderecoCompleto();

            enderecoCompleto.should.equal(fazenda.endereco + ', ' + fazenda.complemento);
            done();
        });
	});

	afterEach(function(done) { 
		Fazenda.remove().exec();
		User.remove().exec();

		done();
	});
});
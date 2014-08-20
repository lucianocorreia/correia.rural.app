'use strict';

(function() {
	// Fazendas Controller Spec
	describe('Fazendas Controller Tests', function() {
		// Initialize global variables
		var FazendasController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Fazendas controller.
			FazendasController = $controller('FazendasController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Fazenda object fetched from XHR', inject(function(Fazendas) {
			// Create sample Fazenda using the Fazendas service
			var sampleFazenda = new Fazendas({
				name: 'New Fazenda'
			});

			// Create a sample Fazendas array that includes the new Fazenda
			var sampleFazendas = [sampleFazenda];

			// Set GET response
			$httpBackend.expectGET('fazendas').respond(sampleFazendas);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fazendas).toEqualData(sampleFazendas);
		}));

		it('$scope.findOne() should create an array with one Fazenda object fetched from XHR using a fazendaId URL parameter', inject(function(Fazendas) {
			// Define a sample Fazenda object
			var sampleFazenda = new Fazendas({
				name: 'New Fazenda'
			});

			// Set the URL parameter
			$stateParams.fazendaId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/fazendas\/([0-9a-fA-F]{24})$/).respond(sampleFazenda);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.fazenda).toEqualData(sampleFazenda);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Fazendas) {
			// Create a sample Fazenda object
			var sampleFazendaPostData = new Fazendas({
				name: 'New Fazenda'
			});

			// Create a sample Fazenda response
			var sampleFazendaResponse = new Fazendas({
				_id: '525cf20451979dea2c000001',
				name: 'New Fazenda'
			});

			// Fixture mock form input values
			scope.name = 'New Fazenda';

			// Set POST response
			$httpBackend.expectPOST('fazendas', sampleFazendaPostData).respond(sampleFazendaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Fazenda was created
			expect($location.path()).toBe('/fazendas/' + sampleFazendaResponse._id);
		}));

		it('$scope.update() should update a valid Fazenda', inject(function(Fazendas) {
			// Define a sample Fazenda put data
			var sampleFazendaPutData = new Fazendas({
				_id: '525cf20451979dea2c000001',
				name: 'New Fazenda'
			});

			// Mock Fazenda in scope
			scope.fazenda = sampleFazendaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/fazendas\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/fazendas/' + sampleFazendaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid fazendaId and remove the Fazenda from the scope', inject(function(Fazendas) {
			// Create new Fazenda object
			var sampleFazenda = new Fazendas({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Fazendas array and include the Fazenda
			scope.fazendas = [sampleFazenda];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/fazendas\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFazenda);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.fazendas.length).toBe(0);
		}));
	});
}());
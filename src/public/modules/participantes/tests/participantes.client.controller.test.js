'use strict';

(function() {
	// Participantes Controller Spec
	describe('Participantes Controller Tests', function() {
		// Initialize global variables
		var ParticipantesController,
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

			// Initialize the Participantes controller.
			ParticipantesController = $controller('ParticipantesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Participante object fetched from XHR', inject(function(Participantes) {
			// Create sample Participante using the Participantes service
			var sampleParticipante = new Participantes({
				name: 'New Participante'
			});

			// Create a sample Participantes array that includes the new Participante
			var sampleParticipantes = [sampleParticipante];

			// Set GET response
			$httpBackend.expectGET('participantes').respond(sampleParticipantes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.participantes).toEqualData(sampleParticipantes);
		}));

		it('$scope.findOne() should create an array with one Participante object fetched from XHR using a participanteId URL parameter', inject(function(Participantes) {
			// Define a sample Participante object
			var sampleParticipante = new Participantes({
				name: 'New Participante'
			});

			// Set the URL parameter
			$stateParams.participanteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/participantes\/([0-9a-fA-F]{24})$/).respond(sampleParticipante);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.participante).toEqualData(sampleParticipante);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Participantes) {
			// Create a sample Participante object
			var sampleParticipantePostData = new Participantes({
				name: 'New Participante'
			});

			// Create a sample Participante response
			var sampleParticipanteResponse = new Participantes({
				_id: '525cf20451979dea2c000001',
				name: 'New Participante'
			});

			// Fixture mock form input values
			scope.name = 'New Participante';

			// Set POST response
			$httpBackend.expectPOST('participantes', sampleParticipantePostData).respond(sampleParticipanteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Participante was created
			expect($location.path()).toBe('/participantes/' + sampleParticipanteResponse._id);
		}));

		it('$scope.update() should update a valid Participante', inject(function(Participantes) {
			// Define a sample Participante put data
			var sampleParticipantePutData = new Participantes({
				_id: '525cf20451979dea2c000001',
				name: 'New Participante'
			});

			// Mock Participante in scope
			scope.participante = sampleParticipantePutData;

			// Set PUT response
			$httpBackend.expectPUT(/participantes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/participantes/' + sampleParticipantePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid participanteId and remove the Participante from the scope', inject(function(Participantes) {
			// Create new Participante object
			var sampleParticipante = new Participantes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Participantes array and include the Participante
			scope.participantes = [sampleParticipante];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/participantes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleParticipante);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.participantes.length).toBe(0);
		}));
	});
}());
'use strict';

// Participantes controller
angular.module('participantes').controller('ParticipantesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Participantes',
	function($scope, $stateParams, $location, Authentication, Participantes) {
		$scope.authentication = Authentication;

		// Create new Participante
		$scope.create = function() {
			// Create new Participante object
			var participante = new Participantes ({
				name: this.name,
                tipo: this.tipo
			});

			// Redirect after save
			participante.$save(function(response) {
				$location.path('participantes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Participante
		$scope.remove = function( participante ) {
			if ( participante ) { participante.$remove();

				for (var i in $scope.participantes ) {
					if ($scope.participantes [i] === participante ) {
						$scope.participantes.splice(i, 1);
					}
				}
			} else {
				$scope.participante.$remove(function() {
					$location.path('participantes');
				});
			}
		};

		// Update existing Participante
		$scope.update = function() {
			var participante = $scope.participante ;

			participante.$update(function() {
				$location.path('participantes/' + participante._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Participantes
		$scope.find = function() {
			$scope.participantes = Participantes.query();
		};

		// Find existing Participante
		$scope.findOne = function() {
			$scope.participante = Participantes.get({
				participanteId: $stateParams.participanteId
			});
		};
	}
]);
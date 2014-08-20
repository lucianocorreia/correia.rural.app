'use strict';

// Fazendas controller
angular.module('fazendas').controller('FazendasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Fazendas',
	function($scope, $stateParams, $location, Authentication, Fazendas ) {
		$scope.authentication = Authentication;

		// Create new Fazenda
		$scope.create = function() {
			// Create new Fazenda object
			var fazenda = new Fazendas ({
				name: this.name,
                endereco: this.endereco,
                complemento: this.complemento,
                cidade: this.cidade,
                uf: this.uf
			});

			// Redirect after save
			fazenda.$save(function(response) {
				$location.path('fazendas/' + response._id);

				// Clear form fields
				$scope.name = '';
                $scope.endereco = '';
                $scope.complemento = '';
                $scope.cidade = '';
                $scope.uf = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Fazenda
		$scope.remove = function( fazenda ) {
			if ( fazenda ) { fazenda.$remove();

				for (var i in $scope.fazendas ) {
					if ($scope.fazendas [i] === fazenda ) {
						$scope.fazendas.splice(i, 1);
					}
				}
			} else {
				$scope.fazenda.$remove(function() {
					$location.path('fazendas');
				});
			}
		};

		// Update existing Fazenda
		$scope.update = function() {
			var fazenda = $scope.fazenda ;

			fazenda.$update(function() {
				$location.path('fazendas/' + fazenda._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Fazendas
		$scope.find = function() {
			$scope.fazendas = Fazendas.query();
		};

		// Find existing Fazenda
		$scope.findOne = function() {
			$scope.fazenda = Fazendas.get({ 
				fazendaId: $stateParams.fazendaId
			});
		};

        $scope.getEnderecoCompleto = function(fazenda) {
            if(fazenda){
                var enderecoCompleto = fazenda.endereco;

                if(fazenda.complemento)
                    enderecoCompleto += ', ' + fazenda.complemento;

                if(fazenda.cidade)
                    enderecoCompleto += ', ' + fazenda.cidade;

                if(fazenda.uf)
                    enderecoCompleto += ', ' + fazenda.uf;

                return enderecoCompleto;
            }
            else return 'objeto fazenda não encontrado';
        };
	}
]);
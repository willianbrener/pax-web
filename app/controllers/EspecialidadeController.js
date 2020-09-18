app.controller('EspecialidadeController', ['$rootScope', '$scope', '$location', '$http', 'URL_SERVER', function($rootScope, $scope, $location, $http, URL_SERVER) {

    $scope.especialidade = {};
    $scope.especialidades = [];
    $scope.titulo_formulario = "Nova especialidade";

    $scope.save = function(especialidade){
        if(especialidade && especialidade.id){
            $http.put(URL_SERVER + 'especialidades/'+ especialidade.id +'/update', especialidade)
            .success(function(data){
                if(data.changedRows != null && data.changedRows > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao alterar: " + data.message);
                }
            });
        }else{
            $http.post(URL_SERVER + 'especialidades/save', especialidade)
            .success(function(data){
                if(data.insertId != null && data.insertId > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao inserir: " + data.message);
                }
            });
        }
    }

    $scope.delete = function(especialidade){
        if(especialidade && especialidade.id){
            $http.delete(URL_SERVER + 'especialidades/'+ especialidade.id +'/delete')
            .success(function(data){
                if(data.affectedRows != null && data.affectedRows > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao deletar: " + data.message);
                }
            });
        }
    }

    $scope.edit = function(especialidade){
        if(angular.isDefined(especialidade)){
            $scope.especialidade = {};
            $scope.especialidade.id = especialidade.id;
            $scope.especialidade.descricao = especialidade.descricao;
            $scope.titulo_formulario = "Editar especialidade";
        }
    }

    $scope.getAll = function(){
        $http.get(URL_SERVER + 'especialidades/findAll')
        .success(function(data){
            $scope.especialidades = data;
        });
    }

    $scope.init = function() {
        $scope.getAll();
        $scope.especialidade = {};
        $scope.especialidades = [];
        $scope.titulo_formulario = "Nova especialidade";
    }

    $scope.init();

}]);
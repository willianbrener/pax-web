app.controller('ConvenioController', ['$rootScope', '$scope', '$location', '$http', 'URL_SERVER', function($rootScope, $scope, $location, $http, URL_SERVER) {

    $scope.convenio = {};
    $scope.convenios = [];
    $scope.titulo_formulario = "Novo convenio";

    $scope.save = function(convenio){
        if(convenio && convenio.id){
            $http.put(URL_SERVER + 'convenios/'+ convenio.id +'/update', convenio)
            .success(function(data){
                if(data.changedRows != null && data.changedRows > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao alterar ");
                    console.info(data);
                }
            });
        }else{
            $http.post(URL_SERVER + 'convenios/save', convenio)
            .success(function(data){
                if(data.insertId != null && data.insertId > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao inserir: ");
                    console.info(data);
                }
            });
        }
    }

    $scope.delete = function(convenio){
        if(convenio && convenio.id){
            $http.delete(URL_SERVER + 'convenios/'+ convenio.id +'/delete')
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

    $scope.edit = function(convenio){
        if(angular.isDefined(convenio)){
            $scope.convenio = {};
            $scope.convenio.id = convenio.id;
            $scope.convenio.descricao = convenio.descricao;
            $scope.titulo_formulario = "Editar convenio";
        }
    }

    $scope.getAll = function(){
        $http.get(URL_SERVER + 'convenios/findAll')
        .success(function(data){
            $scope.convenios = data;
        });
    }

    $scope.init = function() {
        $scope.getAll();
        $scope.convenio = {};
        $scope.convenios = [];
        $scope.titulo_formulario = "Novo convenio";
    }

    $scope.init();

}]);
app.controller('PerfilController', ['$rootScope', '$scope', '$location', '$http', 'URL_SERVER', function($rootScope, $scope, $location, $http, URL_SERVER) {
    
    $scope.perfil = {};
    $scope.perfis = [];
    $scope.titulo_formulario = "Novo perfil";

    $scope.save = function(perfil){
        if(perfil && perfil.id){
            $http.put(URL_SERVER + 'perfis/'+ perfil.id +'/update', perfil)
            .success(function(data){
                if(data.changedRows != null && data.changedRows > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao alterar: " + data.message);
                }
            });
        }else{
            $http.post(URL_SERVER + 'perfis/save', perfil)
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

    $scope.delete = function(perfil){
        if(perfil && perfil.id){
            $http.delete(URL_SERVER + 'perfis/'+ perfil.id +'/delete')
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

    $scope.edit = function(perfil){
        if(angular.isDefined(perfil)){
            $scope.perfil = {};
            $scope.perfil.id = perfil.id;
            $scope.perfil.descricao = perfil.descricao;
            $scope.perfil.nivel = perfil.nivel;
            $scope.titulo_formulario = "Editar perfil";
        }
    }

    $scope.getAll = function(){
        $http.get(URL_SERVER + 'perfis/findAll')
        .success(function(data){
            $scope.perfis = data;
        });
    }

    $scope.init = function() {
        $scope.getAll();
        $scope.perfil = {};
        $scope.perfis = [];
        $scope.titulo_formulario = "Novo perfil";
    }

    $scope.init();

}]);
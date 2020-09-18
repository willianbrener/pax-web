app.controller('UsuarioController', ['$rootScope', '$scope', '$location', '$http', 'URL_SERVER', function($rootScope, $scope, $location, $http, URL_SERVER) {

    $scope.usuario = {};
    $scope.usuarios = [];
    $scope.titulo_formulario = "Novo usuario";

    $scope.save = function(usuario){
        if(usuario && usuario.id){
            $http.put(URL_SERVER + 'usuarios/'+ usuario.id +'/update', usuario)
            .success(function(data){
                if(data.changedRows != null && data.changedRows > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao alterar: " + data.message);
                }
            });
        }else{
            $http.post(URL_SERVER + 'usuarios/save', usuario)
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

    $scope.delete = function(usuario){
        if(usuario && usuario.id){
            $http.delete(URL_SERVER + 'usuarios/'+ usuario.id +'/delete')
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

    $scope.edit = function(usuario){
        if(angular.isDefined(usuario)){
            $scope.usuario = {};
            $scope.usuario.id = usuario.id;
            $scope.usuario.nome = usuario.nome;
            $scope.usuario.nome_usuario = usuario.nome_usuario;
            $scope.usuario.senha = usuario.senha;
            $scope.usuario.perfil_id = usuario.perfil_id;
            $scope.titulo_formulario = "Editar usuario";
        }
    }

    $scope.getAll = function(){
        $http.get(URL_SERVER + 'usuarios/findAll')
        .success(function(data){
            $scope.usuarios = data;
        });
    }

    $scope.init = function() {
        $scope.getAll();
        $scope.usuario = {};
        $scope.usuarios = [];
        $scope.titulo_formulario = "Novo usuario";
    }

    $scope.init();

}]);
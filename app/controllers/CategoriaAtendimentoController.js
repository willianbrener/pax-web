app.controller('CategoriaAtendimentoController', ['$rootScope', '$scope', '$location', '$http', 'URL_SERVER', function($rootScope, $scope, $location, $http, URL_SERVER) {

    $scope.categoriaAtendimento = {};
    $scope.categoriasAtendimento = [];
    $scope.titulo_formulario = "Novo Categoria de Atendimento";

    $scope.save = function(categoriaAtendimento){
        if(categoriaAtendimento && categoriaAtendimento.id){
            $http.put(URL_SERVER + 'categoriasAtendimento/'+ categoriaAtendimento.id +'/update', categoriaAtendimento)
            .success(function(data){
                if(data.changedRows != null && data.changedRows > 0){
                    $scope.init();
                }else{
                    console.info("Erro ao alterar: " + data.sqlMessage);
                    console.info(data);
                }
            });
        }else{
            $http.post(URL_SERVER + 'categoriasAtendimento/save', categoriaAtendimento)
            .success(function(data){
                if(data.insertId != null && data.insertId > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao inserir: " + data.sqlMessage);
                }
            });
        }
    }

    $scope.delete = function(categoriaAtendimento){
        if(categoriaAtendimento && categoriaAtendimento.id){
            $http.delete(URL_SERVER + 'categoriasAtendimento/'+ categoriaAtendimento.id +'/delete')
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

    $scope.edit = function(categoriaAtendimento){
        if(angular.isDefined(categoriaAtendimento)){
            $scope.categoriaAtendimento = {};
            $scope.categoriaAtendimento.id = categoriaAtendimento.id;
            $scope.categoriaAtendimento.descricao = categoriaAtendimento.descricao;
            $scope.titulo_formulario = "Editar Categoria de Atendimento";
        }
    }

    $scope.getAll = function(){
        $http.get(URL_SERVER + 'categoriasAtendimento/findAll')
        .success(function(data){
            $scope.categoriasAtendimento = data;
        });
    }

    $scope.init = function() {
        $scope.getAll();
        $scope.categoriaAtendimento = {};
        $scope.categoriasAtendimento = [];
        $scope.titulo_formulario = "Novo Categoria Atendimento";
    }

    $scope.init();

}]);
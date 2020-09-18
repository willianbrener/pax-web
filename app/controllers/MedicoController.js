app.controller('MedicoController', ['$rootScope', '$scope', '$location', '$http', 'URL_SERVER', function($rootScope, $scope, $location, $http, URL_SERVER) {

    $scope.medico = {};
    $scope.medico.especialidades = [];
    $scope.medicos = [];
    $scope.titulo_formulario = "Novo médico";
    $scope.desc_botao_save = "cadastrar";
    $scope.especialidades = [];
    $scope.especialidadesSelecionadas = [];


    $scope.save = function(medico){
        if(medico && medico.id){
            $http.put(URL_SERVER + 'medicos/'+ medico.id +'/update', medico)
            .success(function(data){
                if(data.changedRows != null && data.changedRows > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao alterar: " + data.sqlMessage);
                    console.info(data);
                }
            });
        }else{
            $http.post(URL_SERVER + 'medicos/save', medico)
            .success(function(data){
                if(data.insertId != null && data.insertId > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao inserir: " + data.sqlMessage);
                    console.info(data);
                }
            });
        }
    }

    $scope.delete = function(medico){
        if(medico && medico.id){
            $http.delete(URL_SERVER + 'medicos/'+ medico.id +'/delete')
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

    $scope.edit = function(medico){
        if(angular.isDefined(medico) && angular.isDefined(medico.id)){
            $http.get(URL_SERVER + 'medicos/'+ medico.id )
            .success(function(data){
                console.info(data);
                $scope.medico = {};
                $scope.medico.id = data.id;
                $scope.medico.nome = data.nome;
                $scope.medico.telefone = data.telefone;
                $scope.medico.especialidades = data.especialidades;
                $scope.titulo_formulario = "Editar médico";
                $scope.desc_botao_save = "Atualizar";
            });            
        }
    }

    $scope.mostraEspecialidades = function(medico){
        if(angular.isDefined(medico) && angular.isDefined(medico.id)){
            $http.get(URL_SERVER + 'medicos/'+ medico.id )
                .success(function(data){
                    $scope.especialidadesMedico = [];
                    $scope.especialidadesMedico = data.especialidades;

                    $("#modalEspecialidades").modal("show");
                });
        }
    }

    $scope.getAll = function(){
        $http.get(URL_SERVER + 'medicos/findAll')
        .success(function(data){
            $scope.medicos = data;
        });
    }

    $scope.getAllEspecialidades = function(){
        $http.get(URL_SERVER + 'especialidades/findAll')
        .success(function(data){
            $scope.especialidades = data;
        });
    }

    $scope.init = function() {
        $scope.getAll();
        $scope.getAllEspecialidades();
        $scope.medico = {};
        $scope.medico.especialidades = [];
        $scope.medicos = [];
        $scope.titulo_formulario = "Novo médico";
    }

    $scope.init();

}]);
app.controller('EventoController', ['$rootScope', '$scope', '$location', '$http', 'URL_SERVER', function($rootScope, $scope, $location, $http, URL_SERVER) {

    $scope.evento = {};
    $scope.eventos = [];
    $scope.titulo_formulario = "Novo evento";

    $scope.save = function(evento){
        if(evento != null && evento.data && evento.data != null){
            evento.data = $scope.formataStringData(evento.data);
        }

        if(evento && evento.id){
            $http.put(URL_SERVER + 'eventos/'+ evento.id +'/update', evento)
            .success(function(data){
                if(data.changedRows != null && data.changedRows > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao alterar: " + data.message);
                }
            });
        }else{
            $http.post(URL_SERVER + 'eventos/save', evento)
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

    $scope.delete = function(evento){
        if(evento && evento.id){
            $http.delete(URL_SERVER + 'eventos/'+ evento.id +'/delete')
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

    $scope.edit = function(evento){
        if(angular.isDefined(evento)){
            $scope.evento = {};
            $scope.evento.id = evento.id;
            $scope.evento.titulo = evento.titulo;
            $scope.evento.descricao = evento.descricao;
            $scope.evento.data = $scope.dataAtualFormatada(new Date(evento.data));
            $scope.titulo_formulario = "Editar evento";
        }
    }

    $scope.getAll = function(){
        $http.get(URL_SERVER + 'eventos/findAll')
        .success(function(data){
            $scope.eventos = data;
        });
    }

    $scope.formataStringData = function(data) {
        var dia  = data.split("/")[0];
        var mes  = data.split("/")[1];
        var ano  = data.split("/")[2];
      
        return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    }

    $scope.dataAtualFormatada = function(data) {
            var dia  = data.getDate().toString();
            var diaF = (dia.length == 1) ? '0'+dia : dia;
            var mes  = (data.getMonth()+1).toString(); //+1 pois no getMonth Janeiro começa com zero.
            var mesF = (mes.length == 1) ? '0'+mes : mes;
            var anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }

    $scope.init = function() {
        $scope.getAll();
        $scope.evento = {};
        $scope.eventos = [];
        $scope.titulo_formulario = "Novo evento";
        
    }
    

    $scope.init();

}]);
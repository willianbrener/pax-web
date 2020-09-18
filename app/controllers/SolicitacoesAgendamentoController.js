app.controller('SolicitacoesAgendamentoController', ['$rootScope', '$scope', '$location', '$http', 'URL_SERVER', function($rootScope, $scope, $location, $http, URL_SERVER) {

    $scope.solicitacao = {};
    $scope.solicitacoes = [];
    $scope.edicao = false;
    $scope.detalhamento = false;
    

    $scope.save = function(evento){
        $http.put(URL_SERVER + 'solicitacoesAgendamento/'+ evento.id +'/update', evento)
        .success(function(data){
            if(data.changedRows != null && data.changedRows > 0){
                console.info(data);
                $scope.init();
            }else{
                console.info("Erro ao alterar: " + data.message);
            }
        });
    }

    $scope.delete = function(evento){
        if(evento && evento.id){
            $http.delete(URL_SERVER + 'solicitacoesAgendamento/'+ evento.id +'/delete')
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

    $scope.detalhar = function(solicitacao){
        if(angular.isDefined(solicitacao)){
            $scope.solicitacao = solicitacao;
            $scope.solicitacao.data = $scope.dataAtualFormatada(new Date(solicitacao.data));
            $scope.titulo_formulario = "Informações de Solicitação de Agendamento";
            $scope.detalhamento = true;
        }
    }

    $scope.getAll = function(){
        $http.get(URL_SERVER + 'solicitacoesAgendamento/findAll')
        .success(function(data){
            $scope.solicitacoes = data;
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

    $scope.cancelaEdicao = function(){
        $scope.init();
    }

    $scope.init = function() {
        $scope.getAll();
        $scope.solicitacao = {};
        $scope.solicitacoes = [];
        $scope.titulo_formulario = "Solicitações de Pagamentos por Clientes";
        $scope.edicao = false;
        $scope.detalhamento = false;
        
    }
    

    $scope.init();

}]);
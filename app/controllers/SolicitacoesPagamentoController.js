app.controller('SolicitacoesPagamentoController', ['$rootScope', '$scope', '$location', '$http', '$modal', 'URL_SERVER', function($rootScope, $scope, $location, $http, $modal, URL_SERVER) {

    $scope.solicitacao = {};
    $scope.solicitacoes = [];
    $scope.page = 1;
	$scope.totalCount = 0;
    $scope.itemsPerPage = 10;
    $scope.totalItems = 0;
    
    $scope.edicao = false;

    $scope.delete = function(solicitacao){
        if(solicitacao && solicitacao.id){
            $http.delete(URL_SERVER + 'solicitacoesPagamento/'+ solicitacao.id +'/delete')
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

    $scope.atualizaStatusSolicitacao = function(solicitacao, status){
        if(angular.isDefined(solicitacao) && angular.isDefined(status)){
            solicitacao.status = status;

            if(solicitacao.data != null){
                solicitacao.data = new Date(solicitacao.data).toMysqlFormat();
            }

            if(solicitacao.dataAgendamento != null){
                solicitacao.dataAgendamento = new Date(solicitacao.dataAgendamento).toMysqlFormat();
            }
            $http.put(URL_SERVER + 'solicitacoesPagamento/'+ solicitacao.id +'/update', solicitacao)
            .success(function(data){
                if(data.changedRows != null && data.changedRows > 0){
                    console.info(data);
                    $scope.init();
                }else{
                    console.info("Erro ao alterar: " + data.message);
                }
            });
        }
    }

    $scope.informacoes = function(solicitacao){
        $scope.solicitacaoSelecionada = {};
        if(angular.isDefined(solicitacao)){
            $scope.solicitacaoSelecionada = solicitacao;
            console.info($scope.solicitacaoSelecionada);
            $('#exampleModal').modal('show');
        }
    }

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.edit = function(solicitacao){
        if(angular.isDefined(solicitacao)){
            $scope.solicitacao = solicitacao;
            $scope.solicitacao.data = $scope.dataAtualFormatada(new Date(solicitacao.data));
            $scope.titulo_formulario = "Informações de Solicitação";
            $scope.edicao = true;
        }
    }

    $scope.getAll = function(){
        $http.get(URL_SERVER + 'solicitacoesPagamento/findAllPaginate/'+$scope.itemsPerPage+'/'+ $scope.pageNumber)
        .success(function(result){
            $scope.solicitacoes = result.data;
            $scope.pageNumber = result.page;
            $scope.itemsPerPage = result.itemsPerPage;
            $scope.totalItems = result.total;
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
        
    }
    

    $scope.init();

}]);
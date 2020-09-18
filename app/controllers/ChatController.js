app.controller('ChatController', ['$rootScope', '$scope', '$location', '$http', 'URL_SERVER', '$interval', function($rootScope, $scope, $location, $http, URL_SERVER, $interval) {
    $scope.user = {};
    $scope.message = '';
    $scope.emAtendimento = false;
    $scope.mensagens = [];
    $scope.atendimentos = [];
    $scope.atendimentoSelecionado = {};
    $scope.isStartedTimer = false;
    var promise;
    $scope.campoMensagem = "";


    $scope.fecharAtendimento = function(){
        $interval.cancel(promise);
        $scope.init();
    }

    $scope.enviaMensagem = function(){
        if($scope.atendimentoSelecionado && $scope.atendimentoSelecionado.id){
            var mensagem = {
                "conteudo": $scope.campoMensagem,
                "tipoMensagem": "A",
                "uuidTelefone": null,
                "idAtendimento": $scope.atendimentoSelecionado.id,
            };

            $http.post(URL_SERVER + 'mensagemChat/save', mensagem).success(function(result){
                $scope.campoMensagem = "";
                $scope.buscaMensagens();
            });
        }
    }

    $scope.selecionaAtendimento = function(atendimento) {
        if(atendimento.dataFechamento == null && atendimento.dataInicio != null && atendimento.id != null){
            $http.put(URL_SERVER + 'atendimentoChat/'+atendimento.id+'/update', atendimento).success(function(result){
                $scope.atendimentoSelecionado = result.atendimento;
                $scope.emAtendimento = true;
                $scope.buscaMensagens();

                promise = $interval(function(){
                    $scope.buscaMensagens();
                }, 3000, 0, null);
            });
        }
    }

    $scope.buscaMensagens = function(){
        $http.get(URL_SERVER + 'mensagemChat/getByAgendamento/'+$scope.atendimentoSelecionado.id).success(function(data){
            $scope.mensagens = data;
        });
    }

    $scope.getAllAtendimentos = function() {
        $http.get(URL_SERVER + 'atendimentoChat/findAll').success(function(data){
            console.info(data)
            $scope.atendimentos = data;
        });
    }

    $scope.init = function() {
        $scope.mensagens = [];
        $scope.getAllAtendimentos();
        $scope.emAtendimento = false;
        $scope.atendimentoSelecionado = {};
    }

    $scope.init();

}]);
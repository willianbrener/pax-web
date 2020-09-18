var app = angular.module('app', ['ngCookies']);

app.constant('URL_BASE', { local: "http://localhost:3001/", prod: "http://localhost:3001/"} );
//app.constant('URL_SERVER', "http://157.245.133.37:3001/" );
app.constant('URL_SERVER', "http://localhost:3001/" );

app.service('LoginService', function($http, $location) {
    this.autenticar = function(autenticacao) {
        return $http({
            url: $location.$$protocol+'://'+$location.$$host+ ':3001/auth/login?cpf='+autenticacao.cpf+'&senha='+autenticacao.senha,
            method: "GET"
        });
    }

});

app.controller('LoginController', function($scope, $rootScope, $http, $cookies, LoginService, $window, $location) {
    $scope.autenticacao = {};


    $scope.autenticar = function() {
        if (angular.isDefined($scope.autenticacao)) {
            LoginService.autenticar($scope.autenticacao)
                .then(function(response) {
                    if(angular.isDefined(response.data)){
                        localStorage.setItem('dadosUsuario', JSON.stringify(response.data));
                        $window.location.href = $window.location.origin + "/";
                    }
                }).catch(function(err){

            });
        }
    };

    $scope.init = function() {
        $scope.autenticacao = {};
    };

    $scope.init();
});
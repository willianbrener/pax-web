app.controller('TabController', ['$rootScope', '$scope', '$location', '$localStorage', 'AuthenticationService', '$window', '$cookies', function($rootScope, $scope, $location, $localStorage, AuthenticationService, $window, $cookies) {

    $scope.nomeUsuarioLogado = "";


    $scope.logout = function() {
        $cookies.dadosUsuario = null;
        localStorage.removeItem('dadosUsuario');
        $window.location.href = "login";
    };

    $scope.init = function(){
        if($cookies.dadosUsuario != "null" && $cookies.dadosUsuario != null){
            $scope.nomeUsuarioLogado = JSON.parse($cookies.dadosUsuario).nome;
        }
    };
    

    $scope.init();
}]);
app.controller('SidebarController', ['$rootScope', '$scope', '$location', '$localStorage', 'AuthenticationService', '$window', '$cookies', function($rootScope, $scope, $location, $localStorage, AuthenticationService, $window, $cookies) {


    $scope.logout = function() {
        $cookies.dadosUsuario = null;
        localStorage.removeItem('dadosUsuario');
        $window.location.href = "login";
    };



    $scope.init = function(){

    };


    $scope.init();
}]);
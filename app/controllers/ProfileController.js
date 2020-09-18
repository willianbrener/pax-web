app.controller('ProfileController', ['$rootScope', '$scope', '$localStorage', 'AuthenticationService', function($rootScope, $scope, $localStorage, AuthenticationService) {

    $scope.usuario = {};
    
    $scope.profile = function() {
        var id = JSON.parse(atob($scope.token.split('.')[1])).id;
        AuthenticationService.profile(id, function(res) {
            $scope.usuario = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
    };
    
    $scope.init = function(){
        $scope.profile();
    };
    
    $scope.token = $localStorage.token;

    $scope.init();
}]);
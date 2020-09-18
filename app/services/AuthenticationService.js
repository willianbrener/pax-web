'use strict';

app.factory('AuthenticationService', ['$http', '$localStorage', function($http, $localStorage){
    var baseUrl = "http://localhost:3001";

    function changeUser(user) {
        console.info(currentUser);
        angular.extend(currentUser, user);
    }

    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getUserFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    var currentUser = getUserFromToken();

    return {
        login: function(data, success, error) {
            $http.post(baseUrl + '/auth/login', data).success(success).error(error)
        },
        profile: function(id, success, error) {
            $http.get(baseUrl + '/auth/profile/'+id , {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(success).error(error)
        },
        logout: function(success) {
            changeUser({});
            delete $localStorage.token;
            success();
        }
    };
}]);
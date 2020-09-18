'use strict';

app.factory('LoginService', function() {
    var admin = '1';
    var pass = '1';
    var isAuthenticated = false;

    return {
        login : function(username, password) {
            isAuthenticated = username === admin && password === pass;
            return isAuthenticated;
        },
        isAuthenticated : function() {
            return isAuthenticated;
        }
    };

});
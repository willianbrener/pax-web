'use strict';

var obj;

obj = {
  'FIREBASE_KEY': 'AIzaSyBUPtWSIjrJZaN8O',
  'DOMAIN': 'realtime-chatapp.firebaseapp.com',
  'DB_URL': 'https://realtime-chatapp.firebaseio.com',
  'DB_BUCKET': 'realtime-chatapp.appspot.com'
};

const app = angular.module('app', [
    'ngStorage',
    'ngRoute',
    'ngCookies',
    'angular-loading-bar',
    'angularMoment',
    'angularUtils.directives.dirPagination',
    'ui.multiselect',
    'ui.bootstrap'
]);

// noinspection JSUnresolvedVariable
app.run(function($rootScope, $cookies, $http, $window, $location) {
    let dadosUsuario = localStorage.getItem('dadosUsuario');

    if (dadosUsuario != null) {
        $cookies.dadosUsuario = dadosUsuario;
        localStorage.removeItem('dadosUsuario');
    }else if($cookies != null && (angular.isUndefined($cookies.dadosUsuario) || $cookies.dadosUsuario == null || $cookies.dadosUsuario == "null")){
        $window.location.href = "login"
    }

    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        let loggedIn = $cookies.dadosUsuario != "null";
        let restrictedPage = $.inArray($location.path(), [ '/login' ]) === -1;

        if (restrictedPage && !loggedIn) {
            $window.location.href = "login"
        }
    });
});

app.factory('AuthInterceptor', function($rootScope, $cookies) {
    return {
        'request': function(config) {
            config.headers = config.headers || {};
            var usuarioCookie = angular.isDefined($cookies.dadosUsuario) && $cookies.dadosUsuario != null ? JSON.parse($cookies.dadosUsuario) : {};
            var encodedToken = usuarioCookie.jwt;
            config.headers.Authorization = encodedToken;

            return config;
        }
    };
});

app.factory('RequisitionErrorInterceptor', function($window) {
    return {
        responseError: function(rejection) {
            if(rejection.status === 401 || rejection.status === 403 || rejection.status === '401' || rejection.status === '403'){
                $window.location.href = 'login/';
            }

            return rejection;
        }
    };
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $httpProvider.interceptors.push('RequisitionErrorInterceptor');
}]);


app.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'views/home.html',
            controller: 'TabController'
        }).
        when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        }).
        when('/categoriaAtendimento', {
            templateUrl: 'views/categoria_atendimento.html',
            controller: 'CategoriaAtendimentoController'
        }).
        when('/convenio', {
            templateUrl: 'views/convenio.html',
            controller: 'ConvenioController'
        }).
        when('/especialidade', {
            templateUrl: 'views/especialidade.html',
            controller: 'EspecialidadeController'
        }).
        when('/medico', {
            templateUrl: 'views/medico.html',
            controller: 'MedicoController'
        }).
        when('/perfil', {
            templateUrl: 'views/perfil.html',
            controller: 'PerfilController'
        }).
        when('/usuario', {
            templateUrl: 'views/usuario.html',
            controller: 'UsuarioController'
        }).
        when('/evento', {
            templateUrl: 'views/evento.html',
            controller: 'EventoController'
        }).
        when('/chat', {
            templateUrl: 'views/chat/chat.html',
            controller: 'ChatController'
        }).
        when('/solicitacoes_pagamentos', {
            templateUrl: 'views/solicitacoes_pagamento.html',
            controller: 'SolicitacoesPagamentoController'
        }).
        when('/solicitacoes_agendamentos', {
            templateUrl: 'views/solicitacoes_agendamento.html',
            controller: 'SolicitacoesAgendamentoController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

app.directive("datePickerInit", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            $(elem).datepicker({
                autoHide: true,
                language: 'pt-BR',
                format: 'dd/mm/yyyy',
                setDate: new Date()
              });
        }
    }
}]);


app.constant('URL_BASE', { local: "http://localhost:3001/", prod: "http://localhost:3001/"} );
//app.constant('URL_SERVER', "http://157.245.133.37:3001/" );
app.constant('URL_SERVER', "http://192.168.0.13:3001/" );

app.constant('CONFIG', obj);

/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 29/04/15
 * Time: 19:21
 * To change this template use File | Settings | File Templates.
 */
var myApp = angular.module("MyApp", [
    'ngRoute',
    'ngCookies',
    'toastr',
        'btford.socket-io',
    'authentication.service',
    'login.controller',
    'register.controller',
    'home.controller',
    'menu.controller',
    'socket.service',
    'chat.controller',
        'connectedUsers.controller',

    'dashboard.controller'
])
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: '/angular/views/home.html',
                controller: 'homeCtrl'

            });
        $routeProvider.
            when('/dashboard', {
                templateUrl: '/angular/views/dashboard.html',
                controller: 'dashboardCtrl'

            });
       //* $routeProvider.
          /*  when('/timeline', {
                templateUrl: '/main/webapp/app/js/modules/timeline_global/timeline_global.html'
                // controller: 'Ctrl'

            });
        $routeProvider.
            when('/profile', {
                templateUrl: '/main/webapp/app/js/modules/profile/profile.html',
                controller: 'profileCtrl'

            });*/

    }]);
/*.factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost:8000');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }
    };
    });*/
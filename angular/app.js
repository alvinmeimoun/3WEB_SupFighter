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
    'login.controller',
    'register.controller',
    'authentication.service',
    'home.controller',
    'menu.controller'
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
                templateUrl: '/angular/views/dashboard.html'
                // controller: 'Ctrl'

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

    }])

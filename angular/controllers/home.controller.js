/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 02/05/15
 * Time: 10:15
 * To change this template use File | Settings | File Templates.
 */


angular.module('home.controller', [
        'login.controller',
        'register.controller',
        'authentication.service'
    ])
// Controlleur de la page home
    .controller("homeCtrl", function($scope, $http, $location , AuthenticationService) {

        // Si l'utilisateur est authentifié,  on le redirige vers la page dashboard
        if(typeof(AuthenticationService.GetCredentials()) !== "undefined")
        {
            $location.path('/dashboard');
        }
    });
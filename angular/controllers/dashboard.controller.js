/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 02/05/15
 * Time: 10:31
 * To change this template use File | Settings | File Templates.
 */

angular.module('dashboard.controller', [
'chat.controller',
        'authentication.service',
        'connectedUsers.controller',
        'listOfInvitations.controller',
        'quickFightButton.controller',
        'ladderBoard.controller',
        'socket.service',
        'ui.bootstrap'
    ])
// Controlleur de la page Dashboard
    .controller("dashboardCtrl", function($scope, $http, $location , AuthenticationService , $modal, $log) {
        // On vérifie que l'utilisateur est authentifié, sinon on le redirige vers la page d'accueil
        if(typeof(AuthenticationService.GetCredentials()) === "undefined")
        {
            $location.path('/');
        }

        var goToGame = false;
        var modalInstance = "";
        //socket.emit('login' , AuthenticationService.GetCredentials().currentUser);
        socket.emit('users');


    });


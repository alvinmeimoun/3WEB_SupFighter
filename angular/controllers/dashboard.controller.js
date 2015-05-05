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
        'socket.service'
    ])
// Controlleur de la page Dashboard
    .controller("dashboardCtrl", function($scope, $http, $location , AuthenticationService ) {
        // On vérifie que l'utilisateur est authentifié, sinon on le redirige vers la page d'accueil
        if(typeof(AuthenticationService.GetCredentials()) === "undefined")
        {
            $location.path('/');
        }
        //var socket = io();
        //console.log(socket);
        //var usersList = [];
        // Nous envoyons une requête au serveur pour récupérer la liste des utilisateurs connectés
        /*var intervalID = setInterval(function () {
            $scope.$apply(function () {*/
        /*socket.emit('sendInvite');
        socket.on('sendInvite', function(invite){
            for (var i in invite)
            {
                if(invite.hasOwnProperty(i))
                {
                    /*console.log(invite[i].ToUser.id );
                    console.log(AuthenticationService.GetCredentials().currentUser.id );*/
                   /* if(invite[i].ToUser.id === AuthenticationService.GetCredentials().currentUser.id)
                    console.log(JSON.stringify(invite[i]));
                   // clearInterval(intervalID);

                }
            }


        });*/
       /* });
        }, 5000);*/




    });
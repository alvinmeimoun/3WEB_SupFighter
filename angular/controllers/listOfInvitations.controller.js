/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 04/05/15
 * Time: 18:51
 * To change this template use File | Settings | File Templates.
 */
angular.module('listOfInvitations.controller', [

        'authentication.service',
        'socket.service'
    ])
// Controlleur d'un formulaire de login
    .controller("invitationsCtrl", function($scope, $http, $location , AuthenticationService ) {
        var states = ['Accept', 'Accepted', 'Deny', 'Denied'];
        var socket = io();
        //console.log(socket);
        var invitationsList = [];
        // Nous envoyons une requête au serveur pour récupérer la liste des invitations
        socket.emit('sendInvite');
        socket.on('sendInvite', function(invite){
            for (var i in invite)
            {
                if(invite.hasOwnProperty(i)){
                    if(invite[i].ToUser.id === AuthenticationService.GetCredentials().currentUser.id)
                    {
                        if(invitationsList.length != 0)
                        {
                        // console.log("invitations : " + invitationsList);
                        invitationsList.forEach(function(item)
                        {
                            if(invite[i].fromUser.id != item.fromUser.id )
                              //  invite[i].invitState = states[0];
                                invitationsList.push(invite[i]);
                        });
                        }
                        else
                        {
                            invitationsList.push(invite[i]);
                        }
                    }
                }
            }

            $scope.listOfInvitations = invitationsList;
        });

        // Fonction permettant d'envoyer un callback socket d accept d'invite
        $scope.acceptInvite = function(index,invite)
        {

            invite.response = "accepted";
            socket.emit('sendResponse',invite);
            $scope.listOfInvitations[index].invitState = states[1];
        };
        // Fonction permettant de refuser un callback socket d accept d'invite
        $scope.denyInvite = function(index,invite)
        {
            invite.response = "deny";
            socket.emit('sendResponse',invite);
        }

    })

.directive('invitations',function( AuthenticationService) {
    return {
        restrict: 'E',
        //scope: true,
        replace: true,
        templateUrl: '/angular/views/listOfInvitations.html',
        link: function(scope, elem, attrs ) {

        }
    };

    });
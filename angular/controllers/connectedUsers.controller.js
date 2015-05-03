/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 03/05/15
 * Time: 11:10
 * To change this template use File | Settings | File Templates.
 */

angular.module('connectedUsers.controller', [
 'authentication.service',
 'socket.service'

])


.controller('connectedCtrl', function($scope,$location,$http, AuthenticationService, mySocket)
    {

        var socket = io();
        //console.log(socket);
        var usersList = [];
        $scope.states = ['Invite','Send'];
        var invitedUser = null;
        $scope.disable = false;
        // Nous envoyons une requête au serveur pour récupérer la liste des utilisateurs connectés
        socket.emit('users');
        socket.on('users', function(users){
                for (var i in users)
                    {
                        if(users.hasOwnProperty(i))
                        {
                            if(users[i].username === AuthenticationService.GetCredentials().currentUser.username)
                            {
                                users.splice(i,1);

                            }
                            else
                            {
                                usersList[i] = users[i];
                                usersList[i].state = $scope.states[0];
                            }

                        }
                    }

            $scope.listOfUsers = usersList;
        });
        // On met une boucle à intervalle régulier pour récupérer la liste des utilisateurs en temps réel
        setInterval(function () {
            $scope.$apply(function () {
                var usersList = [];
                socket.emit('users');
                socket.on('users', function(users)
                {

                    for (var i in users)
                    {
                        if(users.hasOwnProperty(i))
                        {
                            if(users[i].username === AuthenticationService.GetCredentials().currentUser.username)
                            {
                                users.splice(i,1);

                            }
                            else
                            {

                                if( invitedUser !== null)
                                {
                                if( users[i].id === invitedUser.id)
                                {
                                    users[i].state = $scope.states[1];
                                    usersList[i] =  users[i];

                                }
                                $scope.disable = true;
                                usersList[i] = users[i];
                                }
                                else
                                {
                                    usersList[i] = users[i];
                                    $scope.disable = false;

                                }

                              //  $scope.disabled = false;

                            }

                        }
                    }
                    $scope.listOfUsers = usersList;
                });

            });
        }, 5000);

        // Fonction permettant d'envoyer une invitation à un joueur voulu
        $scope.sendInvite = function(index,item)
        {
            invitedUser = item;
            console.log(item);
            var invite = { "fromUser" : AuthenticationService.GetCredentials().currentUser, "ToUser" : item, "response" : "" };
            socket.emit('sendInvite',invite);
            $scope.listOfUsers[index].state = $scope.states[1];

            invitedUser.state = $scope.states[1];
            $scope.disable = true;
        }

    })

.directive('connected' , function()
    {
        return {
            restrict: 'E',
            //scope: true,
            replace: true,
            templateUrl: '/angular/views/connectedUsers.html',
            link: function(scope, elem, attrs ) {

            }
        };

    });
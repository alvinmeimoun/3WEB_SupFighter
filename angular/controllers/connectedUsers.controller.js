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

        //var socket = io();
        //console.log(socket);
        var usersList = [];
        var states = ['Invite','Send'];
        $scope.states = states;
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
                               // usersList[i].state = users[i].state;
                                if (users[i].state == $scope.states[0])
                                {
                                    usersList[i].state = $scope.states[0];
                                    usersList[i].disable = false;

                                }
                                else
                                {
                                    usersList[i].state = $scope.states[1];
                                    usersList[i].disable = true;
                                }
                            }
                           // usersList[i].state = $scope.states[0];
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
                                usersList[i] = users[i];
                                //usersList[i].state = users[i].state;
                                if ($scope.listOfUsers.length !== 0)
                                {
                                    if ($scope.listOfUsers[i].state == $scope.states[1])
                                    {

                                        usersList[i].state = $scope.states[1];
                                        usersList[i].disable = true;
                                    }
                                    else
                                    {
                                        usersList[i].state = $scope.states[0];
                                        usersList[i].disable = false;
                                    }
                                }
                                else {
                                    if (users.state == $scope.states[1])
                                    {

                                        usersList[i].state = $scope.states[1];
                                        usersList[i].disable = true;
                                    }
                                    else
                                    {
                                        usersList[i].state = $scope.states[0];
                                        usersList[i].disable = false;
                                    }
                                }

                            }

                        }
                    }

                    $scope.listOfUsers = usersList;
                });

            });
        }, 1000);

        // Fonction permettant d'envoyer une invitation à un joueur voulu
        $scope.sendInvite = function(index,item)
        {
            //invitedUser = item;
            console.log(item);
            var user = item;
            //socket.emit('updateUserState',user);
            var invite = { "fromUser" : AuthenticationService.GetCredentials().currentUser, "ToUser" : item, "response" : ""  };
            socket.emit('sendInvite',invite);

            $scope.listOfUsers[index].state = $scope.states[1];
            $scope.listOfUsers[index].disable = true;

           // invitedUser.state = $scope.states[1];
           // $scope.disable = true;
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
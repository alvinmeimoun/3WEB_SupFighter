/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 02/05/15
 * Time: 13:46
 * To change this template use File | Settings | File Templates.
 */


angular.module('chat.controller', [
        'authentication.service',
        'socket.service',
        'ui.bootstrap'
    ])
// Controlleur du chat
    .controller("chatCtrl", function($scope, $http, $location, AuthenticationService,mySocket, $modal ) {
        var socket = io();
        // On set l'username dans le local storage pour son utilisation dans le chat
        var username = AuthenticationService.GetCredentials().currentUser.username;
      //  var socket = io();
        var messages = [];
        $scope.isOpen = 0;
        localStorage.setItem("user", username);
        socket.on('chat message', function(msg)
        {
            console.log(msg);
            if (messages.length !== 0)
            {
                if(messages[messages.length - 1].text !== msg){
                    messages.push({ text: msg});
                    $scope.messagesList = messages;
                }
            }
            else
            {
                messages.push({ text: msg});
                $scope.messagesList = messages;
            }
        });

        // Fonction permettant d'envoyer un message vià le chat
        $scope.sendMessage = function(){
            // Concaténation des messages avec l'username
            $scope.completedMessage =   username +  ' - ' + $scope.msg;
            // Emission de notre event socket IO pour envoyer notre message
            socket.emit('chat message', $scope.completedMessage );
            $scope.msg = "";

            if (socket)
            {

                if(window.localStorage)
                {
                    if(localStorage.getItem("messages"))
                    {
                        console.log("local storage items : " + typeof(localStorage.getItem("messages")));
                      var  msgs = localStorage.getItem("messages");

                        $scope.messagesList = msgs;
                      // $scope.messages.(item);

                    }
                }
                socket.on('chat message', function(msg)
                {
                    console.log(msg);
                    if (messages.length !== 0)
                    {
                        if(messages[messages.length - 1].text !== msg){
                            messages.push({ text: msg});
                            $scope.messagesList = messages;
                        }
                    }
                    else
                    {
                        messages.push({ text: msg});
                        $scope.messagesList = messages;
                    }
                });
            }
        };

        // Event socket IO pour écouter les propositions d'invitations.
        socket.emit('listenToResponse');
        socket.on('listenToResponse', function(invite){
            //console.log(invite.count);

            if(invite !== null)
            {
                //console.log("invite" + invite.fromUser.username + " " + AuthenticationService.GetCredentials().currentUser.username );

                if (invite.fromUser.username === AuthenticationService.GetCredentials().currentUser.username || invite.ToUser.username === AuthenticationService.GetCredentials().currentUser.username )
                {
                    console.log("response to invite , game coming soom wait " + JSON.stringify(invite.response));

                    if(invite.response === "accepted")
                    {
                        $scope.response = true;
                    }
                    else
                    {
                        $scope.response = false;
                    }
                    $scope.items = [invite.fromUser.username, invite.ToUser.username];
                    $scope.invite = invite;
                    $scope.isOpen ++;


                        /* modalInstance.result.then(function (selectedItem) {
                         $scope.selected = selectedItem;
                         }, function () {
                         $log.info('Modal dismissed at: ' + new Date());
                         });

                         };*/
                    $scope.animationsEnabled = true;
                    if($scope.isOpen == 1)
                    {
                        $modal.open({

                            animation: $scope.animationsEnabled,
                            templateUrl: 'myModalContent.html',
                            controller: 'ModalInstanceCtrl',
                            size: 'sm',
                            opened: true,

                            resolve: {
                                items: function () {
                                    return $scope.items;
                                },
                                response: function() {
                                    return $scope.response;
                                },
                                invite: function(){
                                    return $scope.invite;
                                }


                            }
                        });
                    }

                    $scope.toggleAnimation = function () {
                        $scope.animationsEnabled = !$scope.animationsEnabled;
                    };
                }

                }

        });


    })


.directive('conversation',function( AuthenticationService) {
    return {
        restrict: 'E',
        //scope: true,
        replace: true,
        templateUrl: '/angular/views/chat.html',
       link: function(scope, elem, attrs ) {


        }

    };
})
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, response, invite, $location, AuthenticationService) {

        $scope.items = items;
        $scope.response = response;
        $scope.selected = {
            item: $scope.items[0]
        };
        $scope.invite = invite;

        $scope.ok = function () {
           // var socket = io();
            socket.emit('RemoveInvitation', invite);
            socket.emit('add Player', AuthenticationService.GetCredentials().currentUser);
            $modalInstance.close();
            $location.path('/game');



        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });



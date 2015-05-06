/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 02/05/15
 * Time: 13:46
 * To change this template use File | Settings | File Templates.
 */


angular.module('chat.controller', [
        'authentication.service',
        'socket.service'
    ])
// Controlleur du chat
    .controller("chatCtrl", function($scope, $http, $location, AuthenticationService,mySocket ) {

        // On set l'username dans le local storage pour son utilisation dans le chat
        localStorage.setItem("user",AuthenticationService.GetCredentials().currentUser.username);
    })


.directive('conversation',function( AuthenticationService) {
    return {
        restrict: 'E',
        //scope: true,
        replace: true,
        templateUrl: '/angular/views/chat.html',
       link: function(scope, elem, attrs ) {

            var username = "";
            var completedMessage;
            var messages = [];
            var socket;
            try
            {
                socket = io();
                console.log("socket is ok");

            }
            catch (e)
            {
                e.message();
            }
           socket.emit('login' , AuthenticationService.GetCredentials().currentUser);
           // console.log(localStorage.getItem("user"));
            if(!localStorage.getItem("user"))
            {
                //$('#login_div').show();
                $('#chat').hide();
                $('#login').submit(function(e)
                 {
                 // permet eviter le rechargement de la page
                 e.preventDefault();
                 username = $('#username').val();
                 $('#login_div').hide();
                 $('#chat').show();
                 localStorage.setItem("user", username);
                 });
           }

            else
            {
                username = localStorage.getItem("user");
                console.log("user" + localStorage.getItem("user"));
                $('#login_div').hide();
                $('#chat').show();
                $('#chat_form').submit(function(e)
                {
                    e.preventDefault();
                    completedMessage =   username +  ' - ' + $('#m').val();
                    messages.push(completedMessage);
                    // console.log(completedMessage);
                    if(window.localStorage)
                    {
                        if(localStorage.getItem("messages"))
                        {
                            var temp = localStorage.getItem("messages") ;
                            // temp.push(completedMessage);
                            //localStorage.removeItem("messages");

                            localStorage.setItem("messages", temp);
                        }
                        else
                        {
                            localStorage.setItem("messages", messages);
                        }

                    }
                    console.log("local storage :" + messages);
                    socket.emit('chat message', completedMessage );
                    $('#m').val('');
                    return false;
                });
                if (socket)
                {
                    console.log(socket);
                    if(window.localStorage)
                    {
                        if(!localStorage.getItem("messages"))
                        {
                            console.log("local storage items : " + localStorage.getItem("messages"));

                            localStorage.getItem("messages").forEach(function(item)
                            {

                                $('#messages').append($('<li>').text(item));
                            });
                        }
                    }
                    socket.on('chat message', function(msg)
                    {
                        $('#messages').append($('<li>').text(msg));
                    });
                }
                else
                {

                }
            }

        }

    };
});
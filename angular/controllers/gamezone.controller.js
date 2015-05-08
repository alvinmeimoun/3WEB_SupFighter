angular.module('gamezone.controller', [
    'authentication.service',
    'socket.service'

])


    .controller('gamezoneCtrl', function($scope,$location,$http, AuthenticationService)
    {




    })

    .directive('gamezone' , function(AuthenticationService)
    {
        return {
            restrict: 'E',
            //scope: true,
            replace: true,
            templateUrl: '/angular/views/gamezone.html',
            link: function(scope, elem, attrs ) {
                //var socket = io();
                //console.log('local storage ' + localStorage.getItem("user"));
                var currentUser = AuthenticationService.GetCredentials().currentUser;

                launchGame();
            }
        };

    });
angular.module('gamezone.controller', [
    'authentication.service',
    'socket.service'

])


    .controller('gamezoneCtrl', function($scope,$location,$http)
    {



    })

    .directive('gamezone' , function()
    {
        return {
            restrict: 'E',
            //scope: true,
            replace: true,
            templateUrl: '/angular/views/gamezone.html',
            link: function(scope, elem, attrs ) {

            }
        };

    });
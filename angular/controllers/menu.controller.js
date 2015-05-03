/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 02/05/15
 * Time: 09:16
 * To change this template use File | Settings | File Templates.
 */


angular.module('menu.controller', [
        'authentication.service',
        'toastr',
        'socket.service'
    ])
.directive('menu',function(AuthenticationService) {
    return {
        restrict: 'E',
        //scope: true,
        replace: true,
        templateUrl: '/angular/views/menu.html',
        link: function($scope, elem, attrs  ) {
            $('#test').click(function()
            {
                console.log('');
                console.log('logout');
                var socket = io();

                socket.emit('logout', $scope.nickname);
            })



        }
    };
})

    .controller('menuCtrl', function($scope,$cookieStore, $location, AuthenticationService,toastr, mySocket) {

        /*$scope.message = "Waiting 2000ms for update";*/

        setInterval(function () {
            $scope.$apply(function () {
                var credentials = AuthenticationService.GetCredentials();
                if (typeof credentials === 'undefined' )
                {
                    $scope.nickname = "";
                }
                else /*if (credentials.currentUser)*/{
                    $scope.nickname = credentials.currentUser.username;
                }

            });
        }, 2000);

        $scope.logout = function()
        {


            AuthenticationService.ClearCredentials();

            $location.path('#/');
            toastr.info('Vous avez été déconnecté ! A bientôt ! ');
            setInterval(function () {
                $scope.$apply(function () {
                    var credentials = AuthenticationService.GetCredentials();
                    if (typeof credentials === 'undefined' )
                    {
                        $scope.nickname = "";
                    }
                    else /*if (credentials.currentUser)*/{
                        $scope.nickname = credentials.currentUser.username;
                    }

                });
            }, 2000);
        };
        /*$scope.goToEditProfile = function ()
         {
         $location.path('/profile');
         }*/
    });
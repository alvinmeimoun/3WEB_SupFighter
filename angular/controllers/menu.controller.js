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

            })



        }
    };
})
    // Controlleur gérant notre menu
    .controller('menuCtrl', function($scope,$cookieStore, $location, AuthenticationService,toastr, mySocket) {
        var credentials = AuthenticationService.GetCredentials();
        if (typeof credentials === 'undefined' )
        {
            $scope.nickname = "";
            $scope.disable = true;
        }
        else {
            $scope.disable = false;
            $scope.nickname = credentials.currentUser.username;

        }

        setInterval(function () {
            $scope.$apply(function () {
                var credentials = AuthenticationService.GetCredentials();
                if (typeof credentials === 'undefined' )
                {
                    $scope.nickname = "";
                    $scope.disable = true;
                }
                else{
                    $scope.disable = false;
                    $scope.nickname = credentials.currentUser.username;

                }

            });
        }, 2000);

        $scope.logout = function()
        {


            socket.emit('logout', $scope.nickname);

            socket.emit('users');

            AuthenticationService.ClearCredentials();

            $location.path('#/');
            toastr.info('You have been disconnected, See you ! ');
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
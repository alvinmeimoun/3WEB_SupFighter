/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 02/05/15
 * Time: 09:16
 * To change this template use File | Settings | File Templates.
 */


angular.module('menu.controller', [
        'authentication.service',
        'toastr'
    ])
.directive('menu',function() {
    return {
        restrict: 'E',
        //scope: true,
        replace: true,
        templateUrl: '/angular/views/menu.html'
    };
})

    .controller('menuCtrl', function($scope,$cookieStore, $location, AuthenticationService,toastr) {

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
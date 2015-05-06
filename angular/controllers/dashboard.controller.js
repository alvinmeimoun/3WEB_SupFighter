/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 02/05/15
 * Time: 10:31
 * To change this template use File | Settings | File Templates.
 */

angular.module('dashboard.controller', [
'chat.controller',
        'authentication.service',
        'connectedUsers.controller',
        'listOfInvitations.controller',
        'socket.service',
        'ui.bootstrap'
    ])
// Controlleur de la page Dashboard
    .controller("dashboardCtrl", function($scope, $http, $location , AuthenticationService , $modal, $log) {
        // On vérifie que l'utilisateur est authentifié, sinon on le redirige vers la page d'accueil
        if(typeof(AuthenticationService.GetCredentials()) === "undefined")
        {
            $location.path('/');
        }
        var socket = io();
        var goToGame = false;
      //  socket.emit('sendResponse');
        var count = 0;
        socket.on('sendResponse', function(invite){
           console.log(invite.count);
            if(typeof(invite)  !== "undefined" && invite !== null )
            {
                console.log("invite" + invite.fromUser.username + " " + AuthenticationService.GetCredentials().currentUser.username );
                console.log("invite" + invite.fromUser.username + " " + AuthenticationService.GetCredentials().currentUser.username );

            if (invite.fromUser.username === AuthenticationService.GetCredentials().currentUser.username || invite.ToUser.username === AuthenticationService.GetCredentials().currentUser.username)
            {
                console.log("response to invite , game coming soom wait " + JSON.stringify(invite));
                if(count == 0)
                {

                        $scope.items = ['item1', 'item2', 'item3'];

                        $scope.animationsEnabled = true;
                        var modalInstance = "";
                        /*$scope.open = function (size) {*/
                        /* if(!$modal.isOpen())
                         {*/     // console.log($modal.isOpen);

                        $modal.open({

                            animation: $scope.animationsEnabled,
                            templateUrl: 'myModalContent.html',
                            controller: 'ModalInstanceCtrl',
                            size: 'sm',

                            resolve: {
                                items: function () {
                                    return $scope.items;
                                }
                            }
                        });


                        console.log('test');
                        count = count +1;
                    console.log(count);

                        /* modalInstance.result.then(function (selectedItem) {
                         $scope.selected = selectedItem;
                         }, function () {
                         $log.info('Modal dismissed at: ' + new Date());
                         });

                         };*/

                        $scope.toggleAnimation = function () {
                            $scope.animationsEnabled = !$scope.animationsEnabled;
                        };

                }


            }
            }
          //  }
        });



    })

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

            $scope.items = items;
            $scope.selected = {
                item: $scope.items[0]
            };

            $scope.ok = function () {
                $modalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        });



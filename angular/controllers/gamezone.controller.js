

var serverUrl = 'http://localhost:8000/server';
var response = null;
angular.module('gamezone.controller', [
    'authentication.service',
    'socket.service',
        'ui.bootstrap'

])


    .controller('gamezoneCtrl', function($scope,$location,$http, AuthenticationService , $modal)
    {
        $scope.countOpen = 0;
        socket.on('sendResult', function(sendedResult){
            console.log('sendResult  '+ sendedResult.winnerUser + ' ' + sendedResult.looserUser);

        if (sendedResult.winnerUser === AuthenticationService.GetCredentials().currentUser.username || sendedResult.looserUser === AuthenticationService.GetCredentials().currentUser.username )
        {
            if(sendedResult.winnerUser == AuthenticationService.GetCredentials().currentUser.username)
            {
                $scope.items = [sendedResult.winnerUser, sendedResult.looserUser];
                $scope.animationsEnabled = true;
                $scope.response = true;
                $scope.countOpen++;
                if($scope.countOpen == 1){
                $modal.open({

                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalResultCtrl',
                    size: 'sm',
                    opened: true,

                    resolve: {
                        items: function () {
                            return $scope.items;
                        },
                        response: function() {
                            return $scope.response;
                        }


                    }


                });

               response = sendedResult;


                var urlCompleted = serverUrl + '/updateLadder';
                var c = {username: sendedResult.winnerUser , wins : 1 , losses: 0, timePlayed : ""};
                // Envoi de notre requête post à notre api pour envoyer le score
                $http.post(urlCompleted,c)
                    .success(function(data, status, headers, config) {
                        console.log("success " + data.result);
                       //var invite = { "fromUser" : AuthenticationService.GetCredentials().currentUser };
                        //socket.emit('RemoveInvitation', invite);


                    })
                    .error(function(data, status, headers, config) {
                        // alert("An error occured: " + data.error);
                        console.log("error " + status);
                        //$scope.error = " Authentication wrong ! Please retry later.. ";
                    });
                }

            }
            else if (sendedResult.looserUser == AuthenticationService.GetCredentials().currentUser.username)
            {
                response = sendedResult;
                $scope.items = [sendedResult.winnerUser, sendedResult.looserUser];
                $scope.animationsEnabled = true;
                $scope.response = false;
                $scope.countOpen ++;
                if ($scope.countOpen == 1)
                {
                $modal.open({

                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalResultCtrl',
                    size: 'sm',
                    opened: true,

                    resolve: {
                        items: function () {
                            return $scope.items;
                        },
                        response: function() {
                            return $scope.response;
                        }


                    }


                });

                var urlCompleted2 = serverUrl + '/updateLadder';
                var c2 = {username: sendedResult.looserUser , wins: 0, losses : 1 , timePlayed : ""};
                // Envoi de notre requête post à notre api pour vérifier l'exactitude de notre login mdp
                $http.post(urlCompleted2,c2)
                    .success(function(data, status, headers, config) {
                        console.log("success " + data.result);
                        //var invite = { "ToUser" : AuthenticationService.GetCredentials().currentUser };
                        //socket.emit('RemoveInvitation', invite);
                    })
                    .error(function(data, status, headers, config) {
                        // alert("An error occured: " + data.error);
                        console.log("error " + status);
                        //$scope.error = " Authentication wrong ! Please retry later.. ";
                    });
                }
            }


        }

        });
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

    })

    .controller('ModalResultCtrl', function ($scope, $modalInstance, items, response, $location, AuthenticationService) {

        $scope.items = items;
        $scope.response = response;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {

            $modalInstance.close();
            //socket.emit('updateUserState', AuthenticationService.GetCredentials().currentUser);
            $location.path('/dashboard');



        };

        $scope.cancel = function () {
            $modalInstance.close();
           // socket.emit('updateUserState', AuthenticationService.GetCredentials().currentUser);
            $location.path('/dashboard');
        };
    });
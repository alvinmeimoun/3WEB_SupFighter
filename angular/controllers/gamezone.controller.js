

var serverUrl = 'http://localhost:8000/server';

angular.module('gamezone.controller', [
    'authentication.service',
    'socket.service',
        'ui.bootstrap'

])


    .controller('gamezoneCtrl', function($scope,$location,$http, AuthenticationService , $modal)
    {


        var socket = io();
        socket.on('sendResult', function(sendedResult){
            console.log('sendResult  '+ sendedResult.winnerUser + ' ' + sendedResult.looserUser);
        if (sendedResult.winnerUser === AuthenticationService.GetCredentials().currentUser.username || sendedResult.looserUser === AuthenticationService.GetCredentials().currentUser.username )
        {
            if(sendedResult.winnerUser === AuthenticationService.GetCredentials().currentUser.username)
            {
                $scope.response = true;
                var urlCompleted = serverUrl + '/updateLadder';
                var c = {username: sendedResult.winnerUser , wins : 1, losses : 0 , time : ""};
                // Envoi de notre requête post à notre api pour vérifier l'exactitude de notre login mdp
                $http.post(urlCompleted,c)
                    .success(function(data, status, headers, config) {
                        console.log("success " + data.result);

                    })
                    .error(function(data, status, headers, config) {
                        // alert("An error occured: " + data.error);
                        console.log("error " + status);
                        //$scope.error = " Authentication wrong ! Please retry later.. ";
                    });
            }
            else
            {
                $scope.response = false;
                var urlCompleted2 = serverUrl + '/updateLadder';
                var c2 = {username: sendedResult.looserUser , wins : 0, losses : 1 , time : ""};
                // Envoi de notre requête post à notre api pour vérifier l'exactitude de notre login mdp
                $http.post(urlCompleted2,c2)
                    .success(function(data, status, headers, config) {
                        console.log("success " + data.result);

                    })
                    .error(function(data, status, headers, config) {
                        // alert("An error occured: " + data.error);
                        console.log("error " + status);
                        //$scope.error = " Authentication wrong ! Please retry later.. ";
                    });
            }
        $scope.items = [sendedResult.winnerUser, sendedResult.looserUser];
        $scope.animationsEnabled = true;
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
            $location.path('/dashboard');



        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
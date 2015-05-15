/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 04/05/15
 * Time: 18:51
 * To change this template use File | Settings | File Templates.
 */
var serverUrl = 'http:/localhost:8000/server';

angular.module('ladderBoard.controller', [

        'authentication.service',
        'socket.service'
    ])
// Controlleur de la liste des scores
    .controller("ladderBoardCtrl", function($scope, $http, $location , AuthenticationService ) {

        $http.defaults.headers.post["Content-Type"] = "application/json";

        console.log($http.defaults.headers);

        $scope.Ladder = [];
        $scope.limitedTo = 100;
        $scope.wins_predicate = '';
        $scope.losses_predicate = '';
        $scope.timePlayed_predicate = '';

        $http.post(serverUrl + '/getLadders').success(function(data) {
            $scope.Ladder = data.result;
        });

        $scope.orderProp = '-wins';
    })

    .directive('ladder',function( AuthenticationService) {
        return {
            restrict: 'E',
            //scope: true,
            replace: true,
            templateUrl: '/angular/views/ladderBoard.html',
            link: function(scope, elem, attrs ) {

            }
        };

    });
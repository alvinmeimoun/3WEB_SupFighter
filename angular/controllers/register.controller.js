/**
 * Created with JetBrains PhpStorm.
 * User: Antonin
 * Date: 02/05/15
 * Time: 09:16
 * To change this template use File | Settings | File Templates.
 */
var serverUrl = 'http://localhost:8000/server';

angular.module('register.controller', [

])
// Controlleur du formulaire d'enregistrement d'un utilisateur
.controller("registerCtrl", function($scope, $http) {
    $http.defaults.headers.post["Content-Type"] = "application/json";

    console.log($http.defaults.headers);
    $scope.register = function(c){


        // on va vérifier tout d'abord si l'username n'est pas déjà utilisé
        var urlVerifUsername = serverUrl + '/getUser';
        $http.post(urlVerifUsername,c)
            .success(function(data, status, headers, config) {

                // Si c'est le cas on renvoie une erreur
                $scope.error = " Username is already registered, please use an another";
            })
            .error(function(data, status, headers, config) {
                // sinon nous ajoutons l'utilisateur
                var urlCompleted = serverUrl + '/addUser';
                $http.post(urlCompleted,c)
                    .success(function(data, status, headers, config) {

                        $scope.error = "";
                        $scope.success = " Registration succedeed ! Please login to enter to the game ! ";
                    })
                    .error(function(data, status, headers, config) {

                        $scope.error = "Error when submitting";
                    });
            });
    };
})
.directive('register',function() {
    return {
        restrict: 'E',
        /* scope: true,
         replace: true,*/
        controller: 'registerCtrl',
        templateUrl: '/angular/views/register.html'
    };
})
